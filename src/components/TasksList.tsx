import {type Task} from '../types/Task.ts'
import TaskItem from "./TaskItem.tsx";

interface TaskListProps {
    tasks: Task[];
    isComplete: boolean;
    setTasks: (tasks: Task[]) => void;
}

export default function TasksList({tasks, isComplete, setTasks}: TaskListProps) {
    function markTaskAsCompleted(id: string) {
        setTasks(tasks.map(task => task.id === id ? { ...task, isComplete: true } : task));
    }

    const visibleTasks = tasks.filter((task) => task.isComplete === isComplete);

    return (
        <div className="space-y-3">
            {visibleTasks.length === 0 && (
                <p className="text-sm text-ink-400">no items</p>
            )}
            {visibleTasks.map((task) => (
                <TaskItem key={task.id} task={task} onMarkTaskAsCompleted={markTaskAsCompleted}/>
            ))}
        </div>
    )
}