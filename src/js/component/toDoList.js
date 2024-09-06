async function getAllToDos (){
    try{
        const response = await fetch('https://playground.4geeks.com/todo/users/adrian_pina', {
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error('fail the fetch todos');
        const data= await response.json();
        return data.todos;
        
    } catch (error){
        console.error("Error fetching todos:", error);
        return [];
    }
}

async function createToDos (todo){
    try{
        const response = await fetch('https://playground.4geeks.com/todo/todos/adrian_pina', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label: todo.label,
                is_done: todo.done 
            })
        });
        if (!response.ok) throw new Error('fail to create todos');
        const data= await response.json();
        return data;
        
    } catch (error){
        console.error("Error creating todos:", error);
        return null;
    }
}

async function updateToDos (todo, todoId){
    try{
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label: todo.label,
                is_done: todo.done 
            })
        });
        if (!response.ok) throw new Error('fail to update todos');
        const data= await response.json();
        return data;
        
    } catch (error){
        console.error("Error updating todos:", error);
        return null;
    }
}

async function deleteToDos (todoId){
    try{
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
        
        });
        if (!response.ok) throw new Error('fail to delete todos');
       
        return response.ok;
        
    } catch (error){
        console.error("Error deleting todos:", error);
        return false;
    }
}

export {getAllToDos, deleteToDos, createToDos, updateToDos}