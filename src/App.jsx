import {useState} from "react";

function App() {
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


    return <div className="app">

        <div className="task-container">
            <h1>Task List with Priority</h1>
            <button onClick={() => toggleSection('taskList')}
                    className={`close-button ${openSection.taskList ? 'open' : ''}`}>+
            </button>
            {openSection.taskList && <TaskForm/>}

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
            {openSection.tasks && <TaskList/>}
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

function TaskForm() {
    return (
        <form action="" className="task-form">
            <input type="text" placeholder="task title" required/>
            <select>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input type="datetime-local" required/>
            <button type="submit">Add task</button>
        </form>
    )
}

function TaskList() {
    return (
        <ul className="task-list">
            <TaskItem/>
        </ul>
    );
}

function CompletedTaskList() {
    return (
        <ul className="completed-task-list">
            <TaskItem/>
        </ul>
    );
}

function TaskItem() {
    return (
        <li className="task-item ">
            <div className="task-info">
                <div>
                    Title <strong>Medium</strong>
                </div>
                <div className="task-deadline">
                    Due: {new Date().toLocaleString()}
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
