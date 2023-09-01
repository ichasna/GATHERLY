import express from "express";
import supabase from "../supabase.js";

const route = express.Router();

//add task
route.post('/add-task', async(req, res) => {
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

// Add section
route.post('/add-section', async (req, res) => {
    try {
        const eventid = req.session.eventid;
        const sectionname = req.body.sectionname; // Get the section name from the request body

        const { data, error } = await supabase.from('section')
            .insert([{sectionname: sectionname, eventid: eventid}])
            .select(); // Insert the new section into the Section table

        if (error) {
            throw error;
        }

        res.send(`Section "${sectionname}" has been created with ID ${data[0].sectionid}.`);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('An error occurred while creating the section.');
    }
});

//get list of section
route.get('/section', async(req, res) => {
    const eventid = req.session.eventid;
    const sections = await supabase.from('section').select('sectionid, sectionname').eq('eventid', eventid);
    for (const section of sections.data) {
        const tasks = await supabase.from('task').select('*').eq('sectionid', section.sectionid);
        section['tasks'] = tasks.data
    }
    res.send(sections.data);
})

// Delete a task
route.delete('/delete/:taskid', async (req, res) => {
    try {
        const { taskid } = req.params;

        const { data, error } = await supabase.from('Task')
            .delete()
            .eq('taskID', taskid);

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            res.status(404).send('Task not found.');
        } else {
            res.send('Task deleted successfully.');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('An error occurred while deleting the task.');
    }
});

export default route;