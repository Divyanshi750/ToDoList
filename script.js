document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const themeToggle = document.getElementById('themeToggle');
  
   
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const loadTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        li.textContent = task.text;
        li.addEventListener('click', () => toggleTaskCompletion(index));
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteTask(index);
        });
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    };
  
    
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
   
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        loadTasks();
      }
    });
  
    
    const toggleTaskCompletion = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      loadTasks();
    };
  
   
    const deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      loadTasks();
    };
  
   
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      document.body.classList.toggle('light-theme');
    });
  
   
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  
  
    const updateThemeInLocalStorage = () => {
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    };
  
 
    document.body.addEventListener('classChange', updateThemeInLocalStorage);
  
   
    loadTasks();
  });
  