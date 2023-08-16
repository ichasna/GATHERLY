import express from "express";
import supabase from "../supabase.js";

const route = express.Router();

//add task
route.post('/add', async(req, res) => {
    try {
        const sectionID = req.body.sectionID;
        const taskName = req.body.taskName;
        const taskDueDate = req.body.taskDueDate;
        const taskPriority = req.body.taskPriority;
        const taskPIC = req.body.taskPIC;
        const taskDesc = req.body.taskDesc;

        await supabase.from('task')
        .insert([{sectionID: sectionID, taskName: taskName, taskDueDate: taskDueDate, taskPriority: taskPriority, taskPIC: taskPIC, taskDesc: taskDesc}])
        .select();
        res.send(`Task ${taskName} has been created.`);
        
    } catch (error) {
        console.error(error.message);
    }
});

//edit task
route.put('/edit/:taskid', async(req, res) => {
    try {
        const { taskid } = req.params;
        const taskName = req.body.taskName;
        const taskDueDate = req.body.taskDueDate;
        const taskPriority = req.body.taskPriority;
        const taskPIC = req.body.taskPIC;
        const taskDesc = req.body.taskDesc;

        await supabase.from('task')
        .update({taskName: taskName, taskDueDate: taskDueDate, taskPriority: taskPriority, taskPIC: taskPIC, taskDesc: taskDesc})
        .eq('taskID', taskid)
        .select();
        res.send('success.');

    } catch (error) {
        console.error(error.message);
    }
});

export default route;