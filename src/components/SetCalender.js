import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../slices/date";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function SetCalender({ backFn }) {
    const date = useSelector(state => state.date);
    const dispatch = useDispatch();

    const setMonthHandler = i=>{
        dispatch(setDate({month: i}));
    }

    const setYearHandler = i=>{
        dispatch(setDate({year: i}));
    }

    

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full p-2 bg-neutral-700 flex text-white justify-between items-center">
                <IoMdArrowRoundBack className=" text-lg hover:cursor-pointer " onClick={backFn} />
                <p className="text-base font-bold">{months[date.displayMonth]}, {date.displayYear}</p>
            </div>

            <div className="h-full w-full grid grid-cols-5 bg-zinc-900 gap-px">
                <SetMonth month={date.displayMonth} handler={setMonthHandler}/>
                <SetYear year={date.displayYear} handler={setYearHandler}/>
            </div>

        </div>
    )
}


function SetMonth({month,handler}) {

    return (
        <div className=" col-span-3 grid grid-cols-3 grid-rows-4 gap-2 p-1 bg-zinc-800">
            {
                months.map((name, i) => (
                    <div className="font-semibold text-base flex justify-center items-center text-white 
                                hover:bg-zinc-700 hover:cursor-pointer transition-colors duration-75 
                                delay-75"
                        style={{ backgroundColor: i === month ? "rgb(24 24 27)" : null }}
                        onClick={()=>{handler(i)}}>
                        {name}
                    </div>
                ))
            }
        </div>
    )
}

function SetYear({ year, handler }) {

    const displayYear = Array.from({length:5}).map((_,i)=>{
        return year - 2 + i;
    });

    return (
        <div className="col-span-2 bg-zinc-800 h-full flex items-center flex-col justify-center">

            <GoTriangleUp className="font-bold text-3xl text-gray-400 hover:cursor-pointer" onClick={()=>handler(year-1)}/>

            <div className="w-full h-4/5">
                {
                    displayYear.map(yr => (
                        <div className="w-full h-1/5 flex justify-center items-center text-white font-semibold hover:cursor-pointer text-sm"
                            style={{...(yr===year && {fontSize:"20px",fontWeight:"bold"})}}
                            onClick={()=>{
                                if(yr!==year) handler(yr);
                            }}>
                            {yr}
                        </div>
                    ))
                }
            </div>

            <GoTriangleDown className="font-bold text-3xl text-gray-400 hover:cursor-pointer" onClick={()=>handler(year+1)}/>

        </div>
    )
}