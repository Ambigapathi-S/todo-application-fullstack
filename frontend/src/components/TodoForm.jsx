import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getTodo, saveTodo, updateTodo } from "../service/TodoService";

const TodoComponent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const pageTitle = () => {
    return id ? (
      <h2 className="text-center">Update Todo</h2>
    ) : (
      <h2 className="text-center">Add Todo</h2>
    );
  };

  const saveOrUpdateTodo = async (e) => {
    e.preventDefault();

    const todo = { title, description, completed };
    console.log(todo);

    try {
      if (id) {
        await updateTodo(id, todo);
        navigate("/list");
      } else {
        const response = await saveTodo(todo);
        console.log(response.data);
        navigate("/list");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getTodo(id);
          console.log(response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="formUI">
      <h2 className="fs-4 text-center mb-4">{pageTitle()}</h2>
      <div className="card-body">
        <form>
          <div className="form-group mt-3">
            <lable className="form-label">Todo Title:</lable>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Todo Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <lable className="form-label">Todo Description:</lable>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Todo Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <lable className="form-label">Todo Completed:</lable>
            <select
              className="form-control"
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="form-group mt-3 text-center">
            <button
              className="btn btn-success"
              onClick={(e) => saveOrUpdateTodo(e)}
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TodoComponent;
