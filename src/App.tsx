import {useMemo, useState} from "react";
import AddTaskForm from './components/AddTaskForm.tsx'
import {type Task} from './types/Task.ts'
import TasksList from "./components/TasksList.tsx";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const activeTasks = tasks.filter(task => !task.isComplete);
    const doneTasks = tasks.filter(task => task.isComplete);

    const nextDeadline = useMemo(() => {
        return activeTasks
            .filter(task => task.deadline)
            .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())[0];
    }, [activeTasks]);

    function addTask(task: Task) {
        setTasks((prevTasks) => [...prevTasks, task]);
    }

    return (
        <div className="min-h-screen py-14">
            <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
                <header className="card">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-ink-400">board</p>
                            <h1 className="text-3xl font-semibold text-white">Minimal tasks</h1>
                        </div>
                        <div className="hidden text-right text-sm text-ink-400 sm:block">
                            <p>keep it clean</p>
                        </div>
                    </div>
                    <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                            <dt className="text-xs uppercase tracking-[0.3em] text-ink-400">active</dt>
                            <dd className="text-3xl font-semibold text-white">{activeTasks.length}</dd>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                            <dt className="text-xs uppercase tracking-[0.3em] text-ink-400">done</dt>
                            <dd className="text-3xl font-semibold text-white">{doneTasks.length}</dd>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                            <dt className="text-xs uppercase tracking-[0.3em] text-ink-400">next due</dt>
                            <dd className="text-lg font-medium text-white">
                                {nextDeadline?.deadline
                                    ? new Intl.DateTimeFormat('en-GB', {day: '2-digit', month: 'short'})
                                        .format(new Date(nextDeadline.deadline)): 'none'}
                            </dd>
                        </div>
                    </dl>
                </header>

                <section className="card">
                    <AddTaskForm onAddTask={addTask}/>
                </section>

                <section className="grid gap-6 lg:grid-cols-2">
                    <div className="card space-y-4">
                        <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-ink-400">
                            <span>in progress</span>
                            <span>{activeTasks.length}</span>
                        </div>
                        <TasksList tasks={tasks} setTasks={setTasks} isComplete={false}/>
                    </div>
                    <div className="card space-y-4">
                        <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-ink-400">
                            <span>completed</span>
                            <span>{doneTasks.length}</span>
                        </div>
                        <TasksList tasks={tasks} setTasks={setTasks} isComplete={true}/>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
