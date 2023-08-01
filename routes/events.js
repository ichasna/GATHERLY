import express from "express";
import supabase from "../supabase.js";

const route = express.Router();

//create event
route.post('/create', async(req, res) => {
    try {
        const userid = req.session.userid;
        const eventName = req.body.eventName;
        const foundName = await supabase.from('events').select('eventname').eq('eventname', eventName);
        //res.send(foundName.data[0]);

        if (foundName.data[0] != null) {
            res.send("Event name already exist.");
        }
        else {
            const eventDesc = req.body.eventDesc;
            await supabase.from('events').insert([{userid: userid, eventname: eventName, eventdescription: eventDesc}]).select();
            res.send(`Event ${eventName} has been created.`);
            //harusnya nambahin code untuk redirect ke dashboard event
        }
    } catch (error) {
        console.error(error.message);
    }
});

//get list of event
route.get('/', async(req,res) => {
    try {
        const userid = req.session.userid;
        const events = await supabase.from('events').select('eventname').eq('userid', userid);
        res.send(events.data);
    } catch (error) {
        console.error(error.message);
    }
});

//delete a event
route.post('/delevent', async(req,res) => {
    try {
        const eventid = req.body.eventid;
        await supabase.from('events').delete().eq('eventid', eventid);
        res.send("delete event successed.")
    } catch (error) {
        console.error(error.message);
    }
});

//get in to a event (belom kelar)
//butuh atau ngga?
route.get('/:id', async(req,res) => {
    try {
        const { eventid } = req.params;
        req.session.eventid = eventid;
        res.send(req.session.eventid);
    } catch (error) {
        console.error(error.message);
    }
});

//add members to event
route.post('/addmember', async(req,res) => {
    try {
        const all_username = req.body.username;
        for (let i = 0 ; i<all_username.length ; i++) {
            //console.log(all_username[i]);
            const foundName = await supabase.from('users').select('userid').eq('username', all_username[i]);
            if (foundName.data[0] == null) {
                res.send("Cannot find user with that username.");
            }
            else {
                const memberID = foundName.data[0].userid;
                const eventID = req.body.eventid;
                await supabase.from('members').insert([{eventid: eventID, userid: memberID}]).select();
                //res.send(`User ${username} has been added to members.`);
                console.log(`User ${all_username[i]} has been added to members.`);
            }
        }
        res.send("Invite new members successed.")
    } catch (error) {
        console.error(error.message);
    }
});

//get list of members (belom kelar)
route.post('/listmember', async(req,res) => {
    try {
        const eventid = req.body.eventid;
        const members = await supabase
        .from('users')
        .select('username')
        .in('userid', supabase.from('members').select('userid').eq('eventid', eventid).then(data => data.map(item => item.userID)));
        res.send(members.data);
    } catch (error) {
        console.error(error.message);
    }
});

//delete member
route.post('/delmember', async(req,res) => {
    try {
        const eventid = req.body.eventid;
        const memberid = req.body.userid;
        await supabase.from('members').delete().eq('eventid', eventid).eq('userid', memberid);
        res.send("delete member successed.")
    } catch (error) {
        console.error(error.message);
    }
});

export default route;