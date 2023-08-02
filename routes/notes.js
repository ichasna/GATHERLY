import express from "express";
import supabase from "../supabase.js";

const route = express.Router();

//get list of notes in that event
route.get('/', async(req, res) => {
    const eventid = req.session.eventid;
    const notes = await supabase.from('notes').select('notes').eq('eventid', eventid);
    res.send(notes.data);
});

//add notes
route.post('/addnotes', async(req, res) => {
    const eventid = req.session.eventid;
    const note = req.body.note;
    await supabase.from('notes').insert([{eventid: eventid, notes: note}]);
    res.send('Note has been added.');
});

//delete a note
route.delete('/delnotes/:id', async(req, res) => {
    const eventid = req.session.eventid;
    const { id } = req.params;
    await supabase.from('notes').delete().eq('eventid', eventid).eq('noteid', id);
    res.send('note has been deleted.');
});

export default route;