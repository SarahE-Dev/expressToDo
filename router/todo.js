const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid').v4;

let todos = [
    {
        id: uuidv4(),
        todo: "do laundry",
        done: "false"
    },
    {
        id: uuidv4(),
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

router.get('/get-todos-by-done/:done', (req, res)=>{
    const {done} = req.params;
    const doneTodos = todos.filter((elem)=>{
        if(elem.done === done){
            return elem
        }
    })
    if(doneTodos.length){
        res.json(doneTodos)
    }else{
        if(done === 'true'){
            res.json({
                message: 'No todos are finished right now.'
            })
        }
        if(done === 'false'){
            res.json({
                message: "All todos are finished."
            })
        }
        
    }
})

router.post('/create-new-todo', (req, res)=>{
    const {todo} = req.body;
    let newTodo = {
        id: uuidv4(),
        todo: todo,
        done: false
    }
    if(!(todo)){
        res.json({
            message: "You must enter a todo."
        })
    }else{
        todos.push(newTodo);
        res.json(todos)
    }
})

router.put('/update-todo/:id', (req, res)=>{
    const {id} = req.params;
    const {todo} = req.body;
    let todoFound = false;
    if(!(todo)){
        res.json({
            message: 'Please enter updated todo text.'
        })
    }
    for(let item of todos){
        if(item.id === id){
            todoFound = true;
            item.todo = todo
        }
    }
    if(todoFound == true){
        res.json(todos)
    }else{
        res.json({
            message: "There is no todo with that ID."
        })
    }
    
    
})

router.put('/mark-done/:id', (req, res)=>{
    const {id} = req.params;
    let found = false;
    let done;
    let opposite;
    todos.forEach((elem)=>{
        if(elem.id === id){
            found = true;
            if(elem.done === 'true'){
                done = 'done';
                opposite = 'incomplete'
                elem.done = 'false'
            }else if(elem.done === 'false'){
                done = 'incomplete';
                opposite = 'done'
                elem.done = 'true'
            }
        }
    })
    if(found === false){
        res.json({
            message: "There is no item with that ID."
        })
    }else if(found === true){
        
        res.json({
            message: `This item was marked ${done} and is now marked ${opposite}.`,
            array: todos
        })
    }
})

router.delete('/delete-todo', (req, res)=>{
    const {id} = req.body;
    let found = false;
    if(!(id)){
        res.json({
            message: "Please enter an ID in the body."
        })
    }else{
        for(let item of todos){
            if(item.id === id){
                found = true;
            }
        }
    }
    if(found === true){
        let newTodos = todos.filter((elem)=>{
            if(elem.id !== id){
                return elem
            }
        })
        todos = newTodos
        res.json(todos)
    }
    if(found === false){
        res.json({
            message: "There is no todo with that ID to delete."
        })
    }
})






module.exports = router;