import { createSlice } from "@reduxjs/toolkit";


let id = 1

const initialState = Array.from({length:25}).map((_,i)=>{
    const task = {
        id: `id_${id++}`,
        title: `Sample task_${i}`,
        description: 'sample description'.repeat(5),
        doBefore: new Date(new Date().getTime() + 1 + Math.random()*1000*60*60*24*10).toDateString(),
        createdOn: new Date().getTime(),
        completed: Math.random()<0.5
    }
      

    return task;
});



const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask(state,action){
            if(!action.payload) return;
            
            const {title, description, doBefore} = action.payload;

            if(!title) return;

            state.unshift({
                id: `id_${new Date().getTime()}`,
                title,
                description,
                doBefore,
                createdOn: new Date().toISOString(),
                completed: false
            })
        },

        removeTask(state,action){
            if(!action.payload) return;
            let taskIndex = state.findIndex(task=>task.id===action.payload);

            if(taskIndex>-1) state.splice(taskIndex,1);
        },

        updateTask(state,action){
            if(!action.payload) return
            const {id, title, description, doBefore} = action.payload;

            if(!id) return;

            return state.map(task=>{
                if(task.id===id){
                    return {
                        ...task,
                        ...(title && {title}),
                        ...(description && {description}),
                        ...(doBefore && {doBefore}),
                    }
                }

                return task;
            })

        },

        toggleStatus(state,action){
            if(!action.payload) return;

            return state.map(task=>{
                if(task.id===action.payload){
                    return {
                        ...task,
                        completed: !task.completed
                    }
                }

                return task;
            })
        },


    }
})



export default taskSlice.reducer;
export const {addTask, removeTask, toggleStatus, updateTask} = taskSlice.actions;