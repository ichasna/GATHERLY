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
route.delete('/delevent/:id', async(req,res) => {
    try {
        const { id } = req.params;
        await supabase.from('events').delete().eq('eventid', id);
        res.send("delete event successed.")
    } catch (error) {
        console.error(error.message);
    }
});

//get in to a event
//butuh atau ngga?
route.get('/:id', async(req,res) => {
    try {
        const { id } = req.params;
        req.session.eventid = id;
        //console.log(id);
        res.send('berhasil');
    } catch (error) {
        console.error(error.message);
    }
});

export default route;