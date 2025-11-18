export type Task = {
    id: string;
    title: string;
    desc: string | null;
    deadline: string | null;
    isComplete: boolean;
}