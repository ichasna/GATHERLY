import express from "express";
import pool from "/Users/syarifah/Documents/GATHERLY/db.js"; //ini hrs diubah

const route = express.Router();

//create event
route.post('/', async(req, res) => {
    try {
        const username = req.session.username;
        const eventName = req.body.eventName;
        const foundName = await pool.query("SELECT eventName FROM events WHERE eventName = $1", [eventName]);
        //res.send(foundName.rows[0]);

        if (foundName.rows[0] != null) {
            res.send("Event name already exist.");
        }
        else {
            const eventDesc = req.body.eventDesc;
            await pool.query("INSERT INTO events (username, eventName, eventDesc) VALUES ($1, $2, $3)", [username, eventName, eventDesc]);
            res.send(`Event ${eventName} has been created.`);
            //harusnya nambahin code untuk redirect ke dashboard event
        }
    } catch (error) {
        console.error(error.message);
    }
});

//list of event
route.get('/', async(req,res) => {
    try {
        const username = req.session.username;
        const events = await pool.query("SELECT eventName FROM events WHERE username = $1", [username]);
        res.send(events.rows);
    } catch (error) {
        console.error(error.message);
    }
});

export default route;