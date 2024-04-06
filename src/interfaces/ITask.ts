export interface ITask {
    id: number
    title: string
    difficulty: number
    taskList?: React.Dispatch<React.SetStateAction<ITask[]>>
}