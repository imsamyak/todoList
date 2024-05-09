import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../slices/tasks";

export default function TaskPopUp({task, closePopup}) {

    const dispatch = useDispatch();

    const [title,setTitle] = useState(task?task.title:"");
    const [description,setDescription] = useState(task?task.description:"");
    const [doBefore, setDoBefore] = useState(
        task? new Date(task.doBefore).toISOString().split('T')[0]: ""
    );

    const popup = useRef(null);

    const handleExit = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!title){
            alert("Title can't be empty");
            return;
        }
        else if(!doBefore){
            alert("Deadline can't be empty");
            return;
        }

        if(task){
            const newTask = {
                id: task.id,
                title,
                description,
                doBefore: new Date(doBefore).getTime()
            } 

            dispatch(updateTask(newTask));
        }else{
            const newTask = {
                title,
                description,
                doBefore: new Date(doBefore).getTime()
            }

            dispatch(addTask(newTask));
        }   

        closePopup()
    }


    return (
        <div className="w-full h-full absolute left-0 top-0 z-20" onClick={handleExit}>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[90%] h-[80%] max-w-2xl max-h-96 text-white p-2
            bg-zinc-900 popShadow z-30" ref={popup}>

                <p className="text-lg text-center py-1 font-bold">
                    {
                        task?"Update Task":"New Task"
                    }
                </p>

                <form className="flex flex-col gap-4">
                    <label>
                        Title
                        <input type="text" className="block bg-transparent border border-gray-400 focus:outline-none w-full p-1 px-2"
                            onInput = {(e)=>{setTitle(e.target.value || "")}}
                            value={title} />
                    </label>

                    <label>
                        Description
                        <textarea rows="7" className="block bg-transparent border border-gray-400 focus:outline-none w-full p-1 px-2" 
                            onInput={(e)=>{setDescription(e.target.value || "")}}
                            value={description}/>
                    </label>

                    <div className="flex justify-between">
                        <label>
                            Deadline:
                            <input type="date" className="inline-block bg-transparent border border-gray-400 focus:outline-none w-22 ml-2 px-2" 
                            onInput={(e)=>{setDoBefore(e.target.value || null)}}
                            value={doBefore}/>
                        </label>

                        <span className="flex gap-2">
                            <button className="px-2 py-1 bg-gray-800 hover:bg-opacity-85" onClick={closePopup}>Cancel</button>
                            <input type="submit" value="Save" className="px-2 py-1 bg-green-800 hover:cursor-pointer hover:bg-opacity-90" onClick={handleSubmit}/>
                        </span>
                    </div>

                </form>
            </div>

        </div>
    )
}