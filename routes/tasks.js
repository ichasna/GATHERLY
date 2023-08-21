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

// Add section
route.post('/add-section', async (req, res) => {
    try {
        const sectionName = req.body.sectionName; // Get the section name from the request body

        const { data, error } = await supabase.from('Section')
            .insert([{ sectionName: sectionName }])
            .select(); // Insert the new section into the Section table

        if (error) {
            throw error;
        }

        res.send(`Section "${sectionName}" has been created with ID ${data[0].SectionID}.`);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('An error occurred while creating the section.');
    }
});

// View list of tasks
route.get('/tasks', async (req, res) => {
    try {
        const { data, error } = await supabase.from('Task')
            .select('taskID, taskName, taskDueDate, taskPriority, taskPIC, taskDesc'); // Select the required fields

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('An error occurred while fetching the tasks.');
    }
});

// Delete a task
route.delete('/delete-task/:taskid', async (req, res) => {
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