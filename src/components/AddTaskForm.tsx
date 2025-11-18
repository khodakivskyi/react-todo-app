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
        <form onSubmit={handleSubmit}>
            <input type='text'
                   placeholder='Task title'
                   required value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <input type='text'
                   placeholder='Task description'
                   value={desc}
                   onChange={(e) => setDesc(e.target.value)}/>
            <input type="date"
                placeholder='Task deadline'
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}/>
            <button type="submit">Add task to do</button>
        </form>
    )
}