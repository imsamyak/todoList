import { useState } from "react";
import { MdFileDownloadDone, MdWatchLater } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"
import { toggleStatus } from "../slices/tasks";
import { useDispatch } from "react-redux";
import TaskPopUp from "./TaskPopUp";
import {IoTrashBinSharp} from 'react-icons/io5'
import { removeTask } from "../slices/tasks";


export default function Task({ task }) {

    const [drop, setDrop] = useState(false);
    const [updating,setUpdating] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="rounded-lg bg-zinc-700 w-full overflow-hidden shrink-0 grow-0">

            <div className="font-semibold text-white text-lg w-full p-2
                            bg-zinc-900 h-12 flex items-center justify-between"
                key={task.id}>

                <span className="flex gap-1 items-center">
                    {
                        task.completed
                            ? <MdFileDownloadDone className="text-green-500" />
                            : <MdWatchLater />
                    }
                    {task.title}
                </span>

                <RiArrowDropDownLine className="text-3xl font-bold transition-transform 
                duration-500 hover:cursor-pointer"
                    style={{ transform: drop ? "rotate(-180deg)" : null }}
                    onClick={() => { setDrop(!drop) }} />
            </div>

            <div className="h-0 transition-all duration-500 px-2 text-white flex flex-col gap-2"
                style={{ ...(drop && { height: "200px", padding: "8px 8px" }) }}>

                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold py-1">
                        {new Date(task.createdOn).toDateString()}
                    </p>

                    <span className="flex gap-2">
                    <FaEdit className="text-lg hover:cursor-pointer " onClick={()=>setUpdating(true)}/>
                    <IoTrashBinSharp className="text-lg hover:cursor-pointer text-red-400" onClick={()=>dispatch(removeTask(task.id))}/>
                    </span>
                </div>

                <p className="text-lg grow">{task.description}</p>

                {
                    !task.completed?
                    <p className="">Deadline: {new Date(task.doBefore).toDateString()}</p>
                    :null
                }

                <div className="flex justify-between items-center">
                    {
                        task.completed ?
                            <p className="px-2 py-px bg-green-500 bg-opacity-35">Completed</p> :
                            <p className="px-2 py-px bg-red-500 bg-opacity-35">Pending</p>
                    }

                    <div className="w-8 h-3 bg-neutral-600 rounded-full relative hover:cursor-pointer"
                        onClick={()=>{dispatch(toggleStatus(task.id))}}>
                        <span className="absolute w-5 h-5 bg-blue-500 rounded-full left-0 
                                top-1/2 -translate-y-1/2 transition-all duration-300"
                            style={{ ...(!task.completed && { left: "auto", right: "0", backgroundColor: "rgb(38 38 38)" }) }}></span>
                    </div>

                </div>
            </div>
            
            {
                updating?
                <TaskPopUp task={task} closePopup={()=>setUpdating(false)}/>
                : null
            }
            

        </div>

    )
}