import express from "express";
import supabase from "../supabase.js";

const route = express.Router();

//get list of resource links in that event
route.get('/', async(req, res) => {
    const eventid = req.session.eventid;
    const rlink = await supabase.from('keyresources').select('linkname, link').eq('eventid', eventid);
    res.send(rlink.data);
});

//add resources link
route.post('/addlink', async(req, res) => {
    const eventid = req.session.eventid;
    const linkname = req.body.linkname;
    const link = req.body.link;
    await supabase.from('keyresources').insert([{eventid: eventid, linkname: linkname, link: link}]);
    res.send('Link has been added.');
});

//delete a note
route.delete('/dellink/:id', async(req, res) => {
    const eventid = req.session.eventid;
    const { id } = req.params;
    await supabase.from('keyresources').delete().eq('eventid', eventid).eq('rlinkid', id);
    res.send('link has been deleted.');
});

export default route;