
//  Fortune Generator


const fortunes = [
    "True wisdom comes not from knowledge, but from understanding.",
    "A journey of a thousand miles begins with a single step.",
    "Your hard work will soon pay off in unexpected ways.",
    "An exciting opportunity is just around the corner.",
    "Patience is a virtue that will lead you to success.",
    "Believe in yourself, and others will believe in you.",
    "The best way to predict the future is to create it.",
    "A smile is your passport into the hearts of others.",
    "Embrace change; it is the path to growth.",
    "Good things come to those who wait, but better things come to those who act."
];

// Elements
const fortuneTextEl = document.getElementById('fortune-text');
const fortuneBoxEl = document.getElementById('fortune-box');

const btnFontColor = document.getElementById('btn-font-color');
const btnBgColor = document.getElementById('btn-bg-color');
const btnBorderColor = document.getElementById('btn-border-color');
const btnFontStyle = document.getElementById('btn-font-style');

// Helper to get random item from array
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// 1. Random Selection on Load
window.addEventListener('DOMContentLoaded', () => {
    fortuneTextEl.textContent = getRandomItem(fortunes);
});

// Predefined Themes for Buttons
const themes = [
    {   // Theme 1: Green/Blue
        fontColor: '#2c3e50',
        bgColor: '#a2d149',
        borderColor: '#558b2f',
        fontFamily: '"Courier New", monospace',
        fontSize: '1.25rem'
    },
    {   // Theme 2: Yellow/Red
        fontColor: '#c0392b',
        bgColor: '#f1c40f',
        borderColor: '#2ecc71',
        fontFamily: '"Inter", sans-serif',
        fontSize: '1.4rem'
    },
    {   // Theme 3: Blue/White
        fontColor: '#ffffff',
        bgColor: '#3498db',
        borderColor: '#2980b9',
        fontFamily: '"Georgia", serif',
        fontSize: '1.3rem'
    },
    {   // Theme 4: Orange/Brown
        fontColor: '#4a2311',
        bgColor: '#e67e22',
        borderColor: '#d35400',
        fontFamily: '"Comic Sans MS", cursive',
        fontSize: '1.35rem'
    }
];

function applyTheme(theme) {
    fortuneTextEl.style.color = theme.fontColor;
    fortuneBoxEl.style.backgroundColor = theme.bgColor;
    fortuneBoxEl.style.borderColor = theme.borderColor;
    fortuneTextEl.style.fontFamily = theme.fontFamily;
    fortuneTextEl.style.fontSize = theme.fontSize;
}

// Event Listeners for Styling Buttons
btnFontColor.addEventListener('click', () => applyTheme(themes[0]));
btnBgColor.addEventListener('click', () => applyTheme(themes[1]));
btnBorderColor.addEventListener('click', () => applyTheme(themes[2]));
btnFontStyle.addEventListener('click', () => applyTheme(themes[3]));



// Stopwatch 

const stopwatchDisplay = document.getElementById('stopwatch-display');
const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnReset = document.getElementById('btn-reset');

let timerInterval = null;
let currentSeconds = 0;

function updateDisplay() {
    stopwatchDisplay.textContent = currentSeconds + 's';
}

btnStart.addEventListener('click', () => {
    if (timerInterval) return; // Already running
    if (currentSeconds >= 30) return; // Reached max

    // Count in steps of 3 seconds, updating the number every 1 real second
    // per the requirement to fast-forward the count.
    timerInterval = setInterval(() => {
        currentSeconds += 3;
        if (currentSeconds >= 30) {
            currentSeconds = 30; // Cap at 30
            clearInterval(timerInterval);
            timerInterval = null;
        }
        updateDisplay();
    }, 1000);
});

btnStop.addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

btnReset.addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    currentSeconds = 0;
    updateDisplay();
});



//To-Do List 


const todoInput = document.getElementById('todo-input');
const btnAddTask = document.getElementById('btn-add-task');
const todoList = document.getElementById('todo-list');

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];

function saveTasks() {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        // Task Text
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.padding = '5px 10px';
        deleteBtn.style.fontSize = '0.9rem';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

function addTask() {
    const text = todoInput.value.trim();
    if (text === '') return;

    tasks.push({
        text: text,
        completed: false
    });

    todoInput.value = '';
    saveTasks();
    renderTasks();
}

btnAddTask.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();
