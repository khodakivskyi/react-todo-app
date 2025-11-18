import {type Task} from '../types/Task.ts'
import TaskItem from "./TaskItem.tsx";

interface TaskListProps {
    tasks: Task[];
    isComplete: boolean;
    setTasks: (tasks: Task[]) => void;
}

export default function TasksList({tasks, isComplete, setTasks}: TaskListProps) {
    const title = isComplete ? 'Tasks to complete' : 'Completed tasks'

    function markTaskAsCompleted(id: string) {
        setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: true } : task));
    }

    return (
        <div>
            <h1>{title}</h1>
            <div>
                {tasks
                    .filter((task) => task.isComplete === isComplete)
                    .map((task) => (
                    <TaskItem key={task.id} task={task} onMarkTaskAsCompleted={markTaskAsCompleted}/>
                ))}
            </div>
        </div>
    )
}