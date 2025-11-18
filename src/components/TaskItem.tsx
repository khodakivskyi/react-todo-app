import {useState, useEffect} from "react";
import {type Task} from '../types/Task.ts'

interface TasksItemProps {
    task: Task;
    onMarkTaskAsCompleted: (id: string ) => void;
}

export default function TasksItem({task, onMarkTaskAsCompleted}: TasksItemProps) {
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

            setTimeLeft(`D:${days} H:${hours} M:${minutes} S:${seconds}`);
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
        <div key={task.id}
            className={`rounded-2xl border p-4 shadow-card ${task.isComplete ? 'border-white/10 bg-white/5 opacity-60' : 'border-white/5 bg-white/10'}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-lg font-medium text-white">{task.title}</h2>
                    {task.desc && <p className="text-sm text-ink-300">{task.desc}</p>}
                    {task.deadline && (
                        <p className="text-xs uppercase tracking-[0.2em] text-ink-400">
                            {timeLeft || '...'}
                        </p>
                    )}
                </div>
                {!task.isComplete && (
                    <button onClick={() => onMarkTaskAsCompleted(task.id)}
                        className="ghost-btn">Mark as complete</button>
                )}
            </div>
        </div>
    )
}