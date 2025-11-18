import {useState, useEffect} from "react";
import {type Task} from '../types/Task.ts'

interface TasksItemProps {
    task: Task;
}

export default function TasksItem({task}: TasksItemProps) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!task.deadline) return;

        function updateTimer() {
            if (!task.deadline) return;
            const now = Date.now();
            const deadline = new Date(task.deadline).getTime();
            const diff = deadline - now;

            if (diff <= 0) {
                setTimeLeft("Deadline passed");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${days}:${hours}:${minutes}:${seconds}`);
        }

        updateTimer();

        const interval = setInterval(() => {
            updateTimer()
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [task.deadline]);

    return (
        <div key={task.id}>
            <h1>{task.title}</h1>
            {task.desc && <p>{task.desc}</p>}
            {task.deadline && <p>Time to end: {timeLeft}</p>}
        </div>
    )
}