import { useState } from "react";
import { useNavigate } from "react-router";
import {
    loginAPICall,
    saveLoggedInUser,
    storeToken,
} from "../service/AuthService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLoginForm(e) {
        e.preventDefault();
        try {
            const response = await loginAPICall(username, password);
            const token = "Bearer " + response.data.accessToken;
            const role = response.data.role;

            storeToken(token);
            saveLoggedInUser(username, role);
            navigate("/list");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="formUI">
            <h2 className="fs-4 text-center mb-4"> Login Form </h2>
            <div className="card-body">
                <form>
                    <div className="row mb-3">
                        <label className="col-md-3 control-label"> Username</label>
                        <div className="col-md-9">
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-md-3 control-label"> Password </label>
                        <div className="col-md-9">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                    </div>

                    <div className="form-group mt-3 text-center">
                        <button
                            className="btn btn-primary"
                            onClick={(e) => handleLoginForm(e)}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
