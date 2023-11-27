let todoArray = [];


fetch("http://localhost:3000/api/todo/get-all-todos", {
})
    .then(res => res.json())
    .then(data=>{
        console.log(data);
        let counter = 0;
        data.todos.forEach((elem)=>{
            console.log(elem);
            counter++
            let html = `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold text-lg-center" style="color: blueviolet;">${elem.todo.toUpperCase()}</div>
              <button id="${elem.id}" type="button" class="btn btn-sm badge" style="padding-bottom: 16px; background-color: deeppink;">Delete</button>
            </div>
            <input id="checkbox${counter}" class="form-check" type="checkbox" value="" id="flexCheckDefault">
          </li>`
          $('#todoList').append(html)
          todoArray.push(elem)
          
        })
        let buttons = document.querySelectorAll('button');
          buttons.forEach((elem)=>{
            elem.addEventListener('click', ()=>{
                console.log('test');
                const options = {
                    method: "DELETE",
                    body: `{"id": "${elem.id}"}`
                }
                fetch('http://localhost:3000/api/todo/delete-todo', options)
                    .then(res => res.json())
                    .then(data=>{
                        console.log(data);
                    })
            })
          })
})


