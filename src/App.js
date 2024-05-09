import './App.css';
import TaskSection from "./components/TaskSection"
import SideSection from './components/SideSection';
import {IoCloseSharp} from "react-icons/io5";
import { useState } from 'react';
import {CiMenuKebab} from "react-icons/ci";

function App() {

  const [openSideSection, setOpenSideSection] = useState(false);

  const toggleSideSection = ()=>{
    setOpenSideSection(prev=>!prev);
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>

      <div className='w-full max-w-4xl sm:h-[80vh] h-full bg-zinc-800 flex flex-col relative'>

        <div className="sm:hidden text-3xl font-bold text-white pt-3 px-2 gap-1 flex items-center">
          <CiMenuKebab className='hover:cursor-pointer' onClick={toggleSideSection}/>
          <h1>Task Manager</h1>
        </div>

        <div className='w-full h-full flex overflow-y-auto box-border'>

          <div className='w-full max-w-80 min-w-60 absolute sm:w-6/12 bg-zinc-800 top-0
            p-2 shadow-md shadow-white rounded-r-xl border-4 border-l-0 border-zinc-900
            transition-all duration-150 box-border flex flex-col h-full -left-full
            sm:static sm:border-0 sm:shadow-none sm:rounded-none'
            style={{left: openSideSection?null:'0'}}>

            <h1 className='font-bold text-3xl p-2 text-white sm:block hidden'>Task Manager</h1>
            
            <div className="flex justify-end text-3xl text-white font-extrabold sm:hidden p-2">
              <IoCloseSharp onClick={toggleSideSection} className='hover:cursor-pointer'/>
            </div>

            <SideSection />
          </div>

          <div className='w-full h-full p-2'>
            <TaskSection/>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;

