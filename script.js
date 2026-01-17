$(document).ready(function(){

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos(){
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos(filter="all"){
        $("#todo-list").empty();
        todos.forEach(function(todo, index){
            if(filter === "completed" && !todo.completed) return;
            if(filter === "pending" && todo.completed) return;

            let li = $(`<li class="list-group-item ${todo.priority}">
                        <span class="todo-text">${todo.text}</span>
                        <div>
                            <button class="complete-btn btn btn-success btn-sm">✔</button>
                            <button class="delete-btn">×</button>
                        </div>
                    </li>`);
            if(todo.completed) li.addClass('completed');
            li.data('index', index);
            $("#todo-list").append(li);
        });
    }

    renderTodos();

    // Add todo
    $("#add-btn").click(function(){
        let todoText = $("#todo-input").val().trim();
        let priority = $("#priority").val();
        if(todoText !== ""){
            todos.push({text: todoText, priority: priority, completed: false});
            saveTodos();
            renderTodos();
            $("#todo-input").val('');
        }
    });

    // Delete todo
    $(document).on('click', '.delete-btn', function(){
        let index = $(this).closest('li').data('index');
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    });

    // Complete todo
    $(document).on('click', '.complete-btn', function(){
        let index = $(this).closest('li').data('index');
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    });

    // Add todo on Enter
    $("#todo-input").keypress(function(e){
        if(e.which === 13) $("#add-btn").click();
    });

    // Drag & Drop
    $("#todo-list").sortable({
        update: function(event, ui){
            let newOrder = [];
            $("#todo-list li").each(function(){
                let idx = $(this).data('index');
                newOrder.push(todos[idx]);
            });
            todos = newOrder;
            saveTodos();
            renderTodos();
        }
    });

    // Filter buttons
    $(".filter-btn").click(function(){
        let filter = $(this).data('filter');
        renderTodos(filter);
    });

    // Dark Mode Toggle
    $("#toggle-theme").click(function(){
        $("body").toggleClass("dark-mode");
    });

});
