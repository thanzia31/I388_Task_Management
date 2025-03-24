
        
        let tasks = [];

        
        document.addEventListener('DOMContentLoaded', () => {
            const storedTasks = JSON.parse(localStorage.getItem('tasks'));
            if (storedTasks) {
                tasks = storedTasks;
            }
        });

        
        function addTask() {
            const taskName = document.getElementById('taskName').value.trim();
            const taskDescription = document.getElementById('taskDescription').value.trim();

            if (!taskName) {
                alert('Task name cannot be empty!');
                return;
            }

            const newTask = {
                name: taskName,
                description: taskDescription,
                status: 'pending' 
            };
            tasks.push(newTask);
            saveTasks();
            clearInputFields();
            renderTasks();
        }

        
        function renderTasks(filter = 'all') {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; 
        
            tasks.forEach((task, index) => {
                if (filter === 'all' || task.status === filter) {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <h4>Task Name: <strong>${task.name}</strong></h4>
                        <h4>Task Description: ${task.description}</h4>
                        <h4>Status: ${task.status}</h4><br>
                        <button class="edit" onclick="editTask(${index})">Edit</button>
                        <button class="delete" onclick="deleteTask(${index})">Delete</button>
                        <button class="toggle ${task.status}" onclick="toggleStatus(${index})">
                            ${task.status === 'pending' ? 'Mark as Completed' : 'Mark as Pending'}
                        </button>
                    `;
                    taskList.appendChild(li);
                }
            });
        }

        
        function editTask(index) {
            const task = tasks[index];
            const newName = prompt('Edit task name:', task.name);
            const newDescription = prompt('Edit task description:', task.description);

            if (newName !== null && newDescription !== null) {
                task.name = newName.trim();
                task.description = newDescription.trim();
                saveTasks();
                renderTasks();
            }
        }

        
        function deleteTask(index) {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }
        }

        
        function toggleStatus(index) {
            const task = tasks[index];
            task.status = task.status === 'pending' ? 'completed' : 'pending';
            saveTasks();
            renderTasks();
        }

        
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        
        function clearInputFields() {
            document.getElementById('taskName').value = '';
            document.getElementById('taskDescription').value = '';
        }

        function filterTasks() {
            const filter = document.getElementById('filter').value;
            renderTasks(filter);
        }
        
        function viewTasks() {
            renderTasks(); 
            if (document.querySelector('.container:nth-child(2)').style.display == 'block')
            {
                document.querySelector('.container:nth-child(2)').style.display = 'none';
                document.getElementById('view').innerHTML = "View Task List";

            } 
            else
            {
                document.querySelector('.container:nth-child(2)').style.display = 'block';
                document.getElementById('view').innerHTML = "Hide Task List";
            }
        }