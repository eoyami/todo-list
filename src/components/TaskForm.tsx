import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { ITask } from "../interfaces/ITask"

// TYPE DA PROPS DO COMPONENTE
type Props = {
    btnText: string
    taskList: ITask[]
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
    task?:ITask | null
    handleUpdate?(id: number, title: string, difficulty: number): void
}

//COMPONENTE
const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [difficulty, setDifficulty] = useState<number>(1)


    //USE EFFECT PARA CONTROLE DE LOOPING E ATUALIZAR A TASK QUANDO ABRIR MODAL
    useEffect(() => {
      if(task){
        setId(task.id)
        setTitle(task.title)
        setDifficulty(task.difficulty)
      }

      //DEPENDENCIA DA TASK ABERTA NO MODAL
    }, [task])
  


    // FUNÇÃO PARA ADICIONAR TASK NOVA
    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
      // EVITA RELOAD
      e.preventDefault()
      if(handleUpdate){
        handleUpdate(id, title, difficulty)
      } else {
        // GERA UM ID NOVO BASEADO NO TAMANHO DO ARRAY
        const id = Math.floor(taskList.length)
        // ADICIONA UM NOVA TASK COM OS ID, TITLE E DIFFICULTY DO FORM
        const newTask: ITask = {id, title, difficulty}
        // ADICIONA UMA NOVA TASK NO ARRAY TASKLIST USANDO SPREAD OPERATOR
        setTaskList!([...taskList, newTask])
        //RESETA OS TITLE E DIFFICULTY
        setTitle("")
        setDifficulty(1)
      }
      }

      //SETA TITLE E DIFFICULTY BASEADO NO EVENTO ON CHANGE
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        //SE FOR O INPUT DO TITLE, SETA O TITULO
        if(e.target.name === "title"){
          setTitle(e.target.value)
          //SE FOR O INPUT DO DIFFICULTY, SETA O DIFFICULTY
        } else if(e.target.name === "difficulty"){
          setDifficulty(parseInt(e.target.value))
          //SE DER ERRO, MOSTRA ERRO
        } else {
          throw new Error()
        }
      }
  return (
    <form onSubmit={addTaskHandler} className="w-full">
        <div className="flex flex-col">
            <label className="text-xl" htmlFor="title">Título</label>
            <input className="p-1 border-2 border-blue-400/100" id="title" name="title" type="text" required placeholder="Coloque um título aqui!" onChange={handleChange} value={title} />
        </div>
        <div className="flex flex-col">
            <label className="text-xl" htmlFor="difficulty">Dificuldade:</label>
            <input className="p-1 border-2 border-blue-400/100" id="difficulty" name="difficulty" type="number" required placeholder="Coloque uma dificuldade aqui!" min="1" max="10" onChange={handleChange} value={difficulty} />
        </div>
        <button type="submit" className=" w-full mt-6 p-1 border-2 border-blue-400/100">{btnText}</button>
    </form>
  )
}

export default TaskForm