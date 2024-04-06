interface Props {
    children: React.ReactNode
}

//DESTRUCTURING NO PROPS CHILDREN
const Modal = ({children}: Props) => {

    const closeModal = () => {
        //GET ELEMENT MODAL
        const modal = document.querySelector("#modal")
        // ADD CLASS HIDDEN = DISPLAY NONE
        modal!.classList.add("hidden")
    }
    
  return (
    <div id="modal" className="hidden">
        <div className="absolute w-full h-full bg-black/30" onClick={closeModal}>
        </div>
        <div className="absolute top-[10%] left-0 right-0 mx-auto w-[500px] bg-white h-[400px] flex flex-col justify-center items-center z-10">
            <h3 className="text-2xl">Editar tarefa</h3>
            <div className="w-[90%]">
                {children}
            </div>
        </div>        
    </div>
  )
}

export default Modal