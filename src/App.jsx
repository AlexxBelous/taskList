import {useState} from "react";

function App() {
    const [tasks, setTasks] = useState([])
    const [openSection, setOpenSection] = useState({
        taskList: false,
        tasks: true,
        completedTasks: true
    });

    function toggleSection(section) {
        setOpenSection((prev) => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    function addTask(task) {
        setTasks([...tasks, {...task, completed: false, id: Date.now()}])
    }

    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);


    return <div className="app">

        <div className="task-container">
            <h1>Task List with Priority</h1>
            <button onClick={() => toggleSection('taskList')}
                    className={`close-button ${openSection.taskList ? 'open' : ''}`}>+
            </button>
            {openSection.taskList && <TaskForm addTask={addTask}/>}

        </div>

        <div className="completed-task-container">
            <h2>Tasks</h2>
            <button onClick={() => toggleSection('tasks')}
                    className={`close-button ${openSection.tasks ? 'open' : ''}`}>+
            </button>
            <div className="sort-controls">
                <button className="sort-button">By Date</button>
                <button className="sort-button">By Priority</button>
            </div>
            {openSection.tasks && <TaskList activeTasks={activeTasks}/>}
        </div>

        <div className="completed-task-container">
            <h2>Completed Tasks</h2>
            <button onClick={() => toggleSection('completedTasks')}
                    className={`close-button ${openSection.completedTasks ? 'open' : ''}`}>+
            </button>
            {openSection.completedTasks && <CompletedTaskList/>}
        </div>
        <Footer/>

    </div>;
}

function TaskForm({addTask}) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Low');
    const [deadLine, setDeadLine] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (title.trim() && deadLine) {
            addTask({title, priority, deadLine});
            setTitle('');
            setPriority('Low');
            setDeadLine('')
        }
    }

    return (
        <form action="" className="task-form" onSubmit={handleSubmit}>
            <input
                value={title}
                type="text"
                placeholder="task title"
                required
                onChange={(e) => setTitle(e.target.value)}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input
                value={deadLine}
                type="datetime-local"
                required
                onChange={(e) => setDeadLine(e.target.value)}
            />
            <button type="submit">Add task</button>
        </form>
    )
}

function TaskList({activeTasks}) {
    return (
        <ul className="task-list">
            {activeTasks.map((task) => (
                <TaskItem task={task} key={task.id}/>
            ))}

        </ul>
    );
}

function CompletedTaskList() {
    return (
        <ul className="completed-task-list">
            {/*<TaskItem/>*/}
        </ul>
    );
}

function TaskItem({task}) {
    const {title, priority, deadLine} = task;
    return (
        <li className={`task-item ${priority.toLowerCase()}`}>
            <div className="task-info">
                <div>
                    {title} <strong>{priority}</strong>
                </div>
                <div className="task-deadline">
                    Due: {new Date(deadLine).toLocaleString()}
                </div>
            </div>
            <div className="task-buttons">
                <button className="complete-button">Completed</button>
                <button className="delete-button">Delete</button>
            </div>
        </li>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <p>
                Technologies and React concepts used: React, JSX, props, useState, component composition, conditional
                rendering array methods (map, filter), event handling.
            </p>
        </footer>
    );
}

export default App;
