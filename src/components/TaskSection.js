import { useDispatch, useSelector } from "react-redux"
import { MdSearch } from "react-icons/md"
import { RiArrowDropDownLine } from "react-icons/ri"
import { useEffect, useRef, useState } from "react";
import { PiListPlusBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { selectDate } from "../slices/date";
import {IoMdArrowDropdown} from "react-icons/io";
import Task from "./Task";
import TaskPopUp from "./TaskPopUp";

export default function TaskSection() {

    const tasks = useSelector(state => state.tasks);
    const selectedDate = useSelector(state => state.date.selected);

    const dispatch = useDispatch();
    const [statusDrop, setStatusDrop] = useState(false);
    const [addingTask,setAddingTask] = useState(false);
    const [search,setSearch] = useState("");

    const [displayStatus,setDisplayStatus] = useState('All');
   
    const handleStatuDropDown = () => {
        setStatusDrop(!statusDrop);
    }

    useEffect(()=>{
        setDisplayStatus("All");
    },[tasks])

    useEffect(()=>{
        setSearch("");
    },[displayStatus])

    let displayTasks = tasks.filter(task=>{
        switch(displayStatus){
            case 'Pending' : return !task.completed;
            case 'Completed': return task.completed;
            default: return true;
        }
    })

    if(search){
        const regex = new RegExp(search,'i');
        displayTasks = displayTasks.filter(task=>{
            return regex.test(task.title); 
        })
    }

    if(selectedDate){
        displayTasks = displayTasks.filter(task=> new Date(task.doBefore).getTime()>=selectedDate);
    }

    
    return (
        <div className="flex flex-col w-full h-full gap-2">

            <div className="h-12 w-full flex justify-between items-center pr-2 box-border">

                <span className="text-base font-bold text-white flex items-end gap-1 py-1 px-2 
                    rounded-full bg-gray-400 bg-opacity-0 hover:bg-opacity-30 
                    hover:cursor-pointer"
                    onClick={()=>setAddingTask(true)}>
                    <PiListPlusBold className="text-2xl inline-block" />
                    New Task
                </span>

                <span className="flex gap-2">

                    <button className="font-semibold text-white bg-zinc-400 bg-opacity-25 relative">
                        <span className=" pl-2 w-full h-full"
                            onClick={handleStatuDropDown}>
                            Status
                            <RiArrowDropDownLine className="inline-block text-2xl transition-transform duration-500"
                                style={{ transform: statusDrop ? "rotate(-180deg)" : null }} />
                        </span>

                        <ul className="absolute top-100 my-1 bg-white bg-opacity-45 text-black text-left left-0"
                            style={{ display: statusDrop ? "block" : "none" }}>
                            <li className="hover:bg-white px-1 py-px" onClick={()=>setDisplayStatus('All')}>All</li>
                            <li className="hover:bg-white px-1 py-px" onClick={()=>setDisplayStatus('Pending')}>Pending</li>
                            <li className="hover:bg-white px-1 py-px" onClick={()=>setDisplayStatus('Completed')}>Completed</li>
                        </ul>
                    </button>

                    <div className="w-44 flex gap-1 border rounded-[40vh] text-white items-center px-2 py-1">
                        <input className="w-full bg-transparent px-1 text-sm focus:outline-none"
                            placeholder="Search" value={search}
                            onInput={(e)=>setSearch(e.target.value)} />
                        <MdSearch className="text-xl hover:cursor-pointer" />
                    </div>

                </span>
            </div>

            {
                selectedDate
                    ? <span className="bg-gray-200 bg-opacity-55 w-fit px-1 mx-1 flex 
                    items-center gap-2 font-semibold">
                        {new Date(selectedDate).toDateString()}
                        <RxCross2 className="inline-block text-lg font-bold hover:cursor-pointer"
                            onClick={() => { dispatch(selectDate()) }} />
                    </span>
                    : null
            }

            <div className="w-full h-full overflow-y-scroll flex flex-col gap-1 customScroll pr-2">
                {
                    displayTasks.length?
                    displayTasks.map(task => (
                        <Task task={task}/>
                    ))
                    : <p className="p-4 font-bold text-white text-xl text-center">No Task Found</p>
                }
            </div>
            
            {
                addingTask?
                <TaskPopUp closePopup={()=>setAddingTask(false)}/>
                :null
            }
        </div>
    )
}