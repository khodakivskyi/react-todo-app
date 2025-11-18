import React, {useState} from "react";
import {type Task} from '../types/Task.ts'

interface AddTaskFormProps {
    onAddTask: (task: Task) => void;
}

export default function AddTaskForm(props: AddTaskFormProps ) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [deadline, setDeadline] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const newTask: Task = {
            id: Date.now().toString(),
            title,
            desc: desc || null,
            deadline: deadline || null,
            isComplete: false,
        }

        props.onAddTask(newTask);

        setTitle("");
        setDesc("");
        setDeadline("");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
                <input
                    type='text'
                    placeholder='Task title'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-control"/>
                <textarea
                    placeholder='Short description'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="input-control min-h-[90px] resize-none"/>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="input-control"/>
            </div>
            <div className="flex items-center justify-between">
                <button type="submit" className="primary-btn">
                    New task
                </button>
                <button
                    type="button"
                    className="ghost-btn"
                    onClick={() => {
                        setTitle("");
                        setDesc("");
                        setDeadline("");
                    }}>Clear</button>
            </div>
        </form>
    )
}