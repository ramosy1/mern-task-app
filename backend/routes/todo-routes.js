const express = require('express');
const TodoModel = require('../models/Todo_model');
const isVerified = require('../middleware/isVerified');

const router = express.Router();

router.get('/todos', isVerified, async (req,res) => {
    try {
        const getTodo = await TodoModel.find({});
            res.status(200).json(getTodo);
    }catch(error) {
        console.error(error);
    }
});

router.post('/todos/new', isVerified, async (req,res) => {
    try {
        const newTodo = new TodoModel({
            text: req.body.text
        });
        const saveTodo = await newTodo.save();
            res.status(200).json(saveTodo);
    }catch(error) {
        console.error(error);
    }
});

router.put('/todos/update/:id', isVerified, async (req,res) => {
    try {
        const updateTodo = await TodoModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
            updateTodo.save();
            res.status(200).json(updateTodo);
    }catch(error) {
        console.error(error);
    }
});

router.delete('/todos/delete/:id', isVerified, async (req,res) => {
    try {
        const deleteTodo = await TodoModel.findByIdAndDelete(req.params.id);
            res.status(204).json(deleteTodo);
    }catch(error) {
        console.error(error);
    }
});

module.exports = router;