const express = require('express');
const router = express.Router();

let todos = [
    {
        id: "haf24jd",
        todo: "do laundry",
        done: "false"
    },
    {
        id: "jp2nkl2",
        todo: "wash dishes",
        done: "true"
    }
]

router.get('/get-all-todos', (req, res)=>{
    res.json(todos)
})

router.get('/get-todo-by-id/:id', (req, res)=>{
    const {id} = req.params;
    const foundTodo = todos.filter((elem)=>{
        if(elem.id === id){
            return elem
        }
    })
    if(foundTodo){
        res.json(foundTodo)
    }else{
        res.json({
            message: 'The Todo ID you are looking for does not exist, please check ID.'
        })
    }
})






module.exports = router;