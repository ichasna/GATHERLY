import express from "express";
import bcrypt from "bcrypt";
import pool from "/Users/syarifah/Documents/GATHERLY/db.js"; //ini hrs diubah

const route = express.Router();

//create user (register)
route.post('/register', async(req, res) => {
    try {
        const username = req.body.username;
        const foundName = await pool.query("SELECT username FROM users WHERE username = $1", [username]);
        //res.send(foundName.rows[0]);

        if (foundName.rows[0] != null) {
            res.send("Username already taken.");
        }
        else {
            const password = req.body.password;
            const salt = await bcrypt.genSalt();
            const finalPass = await bcrypt.hash(password, salt);
            await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, finalPass]);
            res.send("Register successed.");
            //tambahin code untuk lgsg redirect ke login page
        }
    } catch (error) {
        console.error(error.message);
    }
});

//login
route.post('/', async(req, res) => {
    try {
        const username = req.body.username;
        const foundName = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        //res.send(foundName.rows[0].password);

        if(foundName.rows[0] == null) {
            res.send("Cannot find user.")
        }
        else {
            const valid = await bcrypt.compare(req.body.password, foundName.rows[0].password)
            if(valid == true) {
                //save user account to session
                req.session.username = foundName.rows[0].username; //hrs diubah menjadi user id
                res.send("Login successful.")
            }
            else{
                res.send("Password incorrect.")
            }
        }
    } catch (error) {
        console.error(error.message);
    }
});

//logout
route.get('/logout', (req, res) => {
    req.session.username = "";
    res.send("You have been logged out.");
})

export default route;