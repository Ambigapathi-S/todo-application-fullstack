import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
    completeTodo,
    deleteTodo,
    getAllTodos,
    incompleteTodo
} from "../service/TodoService";
import { isAdminUser } from "../service/AuthService";

const List = () => {
    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    const isAdmin = isAdminUser();

    useEffect(() => {
        listTodos();
    }, []);

    const listTodos = async () => {
        try {
            const response = await getAllTodos();
            setTodos(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    function addTodo() {
        navigate("/add");
    }

    function updateTodo(id) {
        navigate(`/update/${id}`);
    }

    const removeTodo = async (id) => {
        try {
            const response = await deleteTodo(id);
            listTodos();
        } catch (error) {
            console.error(error);
        }
    };

    const markCompleteTodo = async (id) => {
        try {
            const response = await completeTodo(id);
            listTodos();
        } catch (error) {
            console.error(error);
        }
    };

    const markInCompleteTodo = async (id) => {
        try {
            const response = await incompleteTodo(id);
            listTodos();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-between p-3">
                <h2 className="fs-4 fw-bold text-center mb-0">List of Todos</h2>
                {isAdmin && (
                    <button className="btn btn-primary mb-2" onClick={addTodo}>
                        Add Todo
                    </button>
                )}
            </div>
            <div>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Todo Title</th>
                            <th>Todo Description</th>
                            <th>Todo Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? "YES" : "NO"}</td>
                                <td>
                                    {isAdmin && (
                                        <button
                                            className="btn btn-info"
                                            onClick={() => updateTodo(todo.id)}
                                        >
                                            Update
                                        </button>
                                    )}
                                    {isAdmin && (
                                        <button
                                            className="btn btn-danger"
                                            style={{ marginLeft: "10px" }}
                                            onClick={() => removeTodo(todo.id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-success"
                                        style={{ marginLeft: "10px" }}
                                        onClick={() => markCompleteTodo(todo.id)}
                                    >
                                        Complete
                                    </button>
                                    <button
                                        className="btn btn-warning"
                                        style={{ marginLeft: "10px" }}
                                        onClick={() => markInCompleteTodo(todo.id)}
                                    >
                                        In Complete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;
