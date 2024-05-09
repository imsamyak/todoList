import Calender from "./Calender";
import {IoCloseSharp} from "react-icons/io5"

export default function SideSection() {

    return (
        <div className="w-full h-full">
            <div className='w-full p-1 bg-zinc-700 rounded-md h-fit aspect-square'>
                <Calender className="bg-zinc-800 w-full h-full grid grid-rows-8" />
            </div>
        </div>
    )
}