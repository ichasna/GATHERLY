import express from "express";
import cors from "cors";
import session from "express-session";
import authRouter from "./routes/users.js";
import eventRouter from "./routes/events.js";
import membRouter from "./routes/members.js";
import noteRouter from "./routes/notes.js";
import rlinkRouter from "./routes/rlink.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(
    session({
      secret: "some secret key",
      resave: false,
      saveUninitialized: false,
    })
);

//routing
app.get('/', (req,res) => {
    res.send('berhasil!');
});
app.use('/users', authRouter);
app.use('/events', eventRouter);
app.use('/members', membRouter);
app.use('/notes', noteRouter);
app.use('/rlink', rlinkRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});