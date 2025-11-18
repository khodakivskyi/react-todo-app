import {type Task} from '../types/Task.ts'
import TaskItem from "./TaskItem.tsx";

interface TaskListProps {
   tasks: Task[];
}

export default function TasksList(props: TaskListProps) {
    return (
        <div>
            {props.tasks.map((task) => (
                <TaskItem key={task.id} task={task}/>
            ))}
        </div>
    )
}