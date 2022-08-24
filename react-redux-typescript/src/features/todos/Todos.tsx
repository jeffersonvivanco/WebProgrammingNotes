import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {add, selectTodos} from "./todosSlice";

export function Todos() {
    const listOfTodos = useAppSelector(selectTodos);
    const dispatch = useAppDispatch();
    const [newTodo, setNewTodo] = useState('');
    const addTodo = () => {
        console.log('Add', newTodo);
        dispatch(add(newTodo));
        setNewTodo('');
    }
    return (
        <>
            <h1>Todos</h1>
            <input name="newTodo" value={newTodo} onChange={(event) => setNewTodo(event.target.value)}/>
            <button onClick={() => addTodo()}>Add</button>
            <ul>
                {listOfTodos.map((todo, index) => <li key={index}>{todo}</li>)}
            </ul>
        </>
    )
}
