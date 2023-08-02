import express from "express";
import supabase from "../supabase.js";

const route = express.Router();

//add members to event
route.post('/addmember/:eventid', async(req,res) => {
    try {
        const all_username = req.body.username;
        for (let i = 0 ; i<all_username.length ; i++) {
            //console.log(all_username[i]);
            const foundName = await supabase.from('users').select('userid').eq('username', all_username[i]);
            if (foundName.data[0] == null) {
                res.send("Cannot find user with that username. Invite new members failed.");
            }
            else {
                const memberID = foundName.data[0].userid;
                const { eventid } = req.params;
                await supabase.from('members').insert([{eventid: eventid, userid: memberID}]).select();
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
route.get('/', async(req,res) => {
    try {
        const eventid = req.session.eventid
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
route.delete('/delmember/:id', async(req,res) => {
    try {
        const eventid = req.session.eventid;
        const { id } = req.params;
        await supabase.from('members').delete().eq('eventid', eventid).eq('userid', id);
        res.send("delete member successed.")
    } catch (error) {
        console.error(error.message);
    }
});

export default route;