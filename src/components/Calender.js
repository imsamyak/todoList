import "../custom.css"
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import { BiCalendarEdit } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux";
import { setDate, selectDate } from "../slices/date";
import {useState } from "react";
import Edit from "./SetCalender";


export default function Calender({className}) {

    const date = useSelector(state => state.date);
    const dispatch = useDispatch();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [edit, setEdit] = useState(false);

    const prevMonth = () => {
        const month = date.displayMonth;

        if (month > 0) {
            dispatch(setDate({ month: month - 1 }));
        } else {
            const year = date.displayYear
            if (year > 1900) {
                dispatch(setDate({ month: 11, year: year - 1 }))
            }
        }
    }

    const nextMonth = () => {
        const month = date.displayMonth;
        if (month < 11) {
            dispatch(setDate({ month: month + 1 }));
        } else {
            const year = date.displayYear
            if (year < 9999) {
                dispatch(setDate({ month: 0, year: year + 1 }))
            }
        }
    }

    if(edit){
        return <Edit backFn={()=>{setEdit(false)}}/>
    }


    return (

        <div className={className}>

            <div className="row-span-1 w-full p-2 flex justify-between text-white font-bold text-lg items-center">
                <span className="hover:cursor-pointer group">
                    {months[date.displayMonth]}, {date.displayYear}
                    <BiCalendarEdit className=" ml-2 text-white opacity-20 inline-block  group-hover:opacity-55 hover:cursor-pointer"
                        onClick={() => setEdit(true)} />
                </span>

                <span className="text-gray-400 text-2xl">
                    <IoIosArrowUp className="hover:text-white hover:cursor-pointer inline-block"
                        onClick={prevMonth} />
                    <IoIosArrowDown className="hover:text-white hover:cursor-pointer inline-block"
                        onClick={nextMonth} />
                </span>
            </div>

            <div className="w-full row-span-1 grid grid-cols-7 gap-1 p-1">
                <WeekDays className="flex text-white justify-center items-center bg-inherit" />
            </div>

            <div className="grid grid-rows-6 grid-cols-7 row-span-6 gap-1 bg-inherit overflow-hidden p-1 ">
                <Dates />
            </div>
        </div>
    )
}


function WeekDays({ className }) {

    return (
        ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, i) => (
            <div className={className}
                key={`day${i}`}>
                {day}
            </div>
        ))
    )
}


function Dates() {

    const date = useSelector(state => state.date);
    const dispatch = useDispatch();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getDate = createDates(date.displayYear, date.displayMonth);

    return (
        Array.from({ length: 42 }).map(_ => {
            const thisDate = getDate.next();
            const isToday = thisDate.getTime() === today.getTime();
            const isThisMonth = thisDate.getMonth() === date.displayMonth;
            const selected = thisDate.getTime() === date.selected;
            const key = thisDate.getTime();
            return (
                <div className="w-full h-full relative bg-inherit dateContainer ">
                    <div className="absolute w-full h-full text-gray-400 z-10 bg-inherit 
                        text-base border border-transparent box-border"
                        onClick={() => { dispatch(selectDate(key)) }}
                        key={key}
                        style={{
                            color: isToday ? "orange" : isThisMonth ? "white" : null,
                            border: selected ? "3px solid blue" : null
                        }}>
                        {thisDate.getDate()}
                    </div>
                </div>
            )
        })
    )
}


function createDates(year, month) {

    let date;
    const firstDateDay = new Date(year, month, 1).getDay();
    if (firstDateDay === 0) {
        date = new Date(year, month, -6);
    } else {
        date = new Date(year, month, 1 - firstDateDay)
    }

    return {
        next: function () {
            date.setDate(date.getDate() + 1);

            return date;
        }
    }
}