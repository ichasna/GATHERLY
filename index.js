import express from "express";
import cors from "cors";
import authRouter from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

//routing
app.get('/', (req,res) => {
    res.send('berhasil!');
});
app.use('/users', authRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});