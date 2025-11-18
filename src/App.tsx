import './App.css'
import {useState} from "react";
import AddTaskForm from './components/AddTaskForm.tsx'
import {type Task} from './types/Task.ts'
import TasksList from "./components/TasksList.tsx";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function addTask(task: Task) {
        setTasks((prevTasks) => [...prevTasks, task]);
    }

    return (
        <>
            <AddTaskForm onAddTask={addTask}/>
            <TasksList tasks={tasks} setTasks={setTasks} isComplete={false}/>
            <TasksList tasks={tasks} setTasks={setTasks} isComplete={true}/>
        </>
    )
}

export default App
