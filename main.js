function makeList(){
document.querySelector('ol').innerHTML = '';
fetch("http://localhost:3000/api/todo/get-all-todos", {
})
    .then(res => res.json())
    .then(data=>{
        console.log(data);
        let counter = 0;
        data.todos.forEach((elem)=>{
            console.log(elem);
            counter++
            let doneBox;
            if(elem.done === 'true'){
                doneBox = 'checked'
            }
            let html = `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold text-lg-center" style="color: blueviolet;">${elem.todo.toUpperCase()}</div>
              <button id="${elem.id}" type="button" class="btn btn-sm badge buttons" style="padding-bottom: 16px; background-color: deeppink;">Delete</button>
            </div>
            <input ${doneBox} class="form-check checks" type="checkbox" value="${elem.id}" id="flexCheckDefault">
          </li>`
          $('#todoList').append(html)
          
        })
        let buttons = document.querySelectorAll('button');
          buttons.forEach((elem)=>{
            elem.addEventListener('click', (e)=>{
                
                console.log(e.target.id);
                deleteFunc(e.target.id)
                
            })
          })
        let checkboxes = document.querySelectorAll('.checks');
        checkboxes.forEach((checkbox)=>{
            checkbox.addEventListener('change', (e)=>{
                console.log(e.target.value);
                markDone(e.target.value);

            })
        })
        document.querySelector('#addItem').addEventListener('click', ()=>{
            
            addTodo()
        })
})
}

makeList()

function deleteFunc(id){
    const options = {
        method: "DELETE"
    }
    fetch(`http://localhost:3000/api/todo/delete-todo/${id}`, options)
                    .then(res => res.json())
                    .then(data=>{
                        console.log(data);
                        document.querySelector('ol').innerHTML = '';
                        makeList()
                    })
}

function markDone(id){
    const options = {
        method: 'PUT'
    }
    fetch(`http://localhost:3000/api/todo/mark-done/${id}`, options)
                    .then(res => res.json())
                    .then(data=>{
                        console.log(data);
                        
                        makeList()
                    })
}

function addTodo(){
    let textBox = document.getElementById('newItem').value;
    const options = {
        method: 'POST',
        body: JSON.stringify({
            todo: textBox

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
    }
    fetch(`http://localhost:3000/api/todo/create-new-todo`, options)
                    .then(res => res.json())
                    .then(data=>{
                        console.log(data);
                        document.getElementById('newItem').value = ''
                    })
}




