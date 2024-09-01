import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styling/UserPage.scss";
import LoadingScreen from "../components/LoadingScreen";

const UserPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
    const [warningUsername, setWarningUsername] = useState<boolean>(false);
    const [warningPassword, setWarningPassword] = useState<boolean>(false);
    const { setAuthToken, setLoading } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        setWarningUsername(false);
        setWarningPassword(false);

        if (username && password) {
            e.preventDefault();
            setLoadingScreen(true);

            axios
                .post("http://localhost/api/token/", { username, password })
                .then((response) => {
                    setAuthToken(response.data.token);
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    navigate("/");
                    setLoading(true);
                })
                .catch((error) => {
                    if (error.message) {
                        console.error(error)
                    }
                })
                .finally(() => {
                    setLoadingScreen(false);
                });
        } else if (!username && !password) {
            setWarningUsername(true);
            setWarningPassword(true);
        } else if (!username) {
            setWarningUsername(true);
        } else if (!password) {
            setWarningPassword(true);
        }
    };

    return (
        <div>
            {loadingScreen ? (
                <LoadingScreen />
            ) : (
                <div className="UserPage__container display__flex">
                    <form className="UserPage__signin">
                        <div className="UserPage__signin-up">
                            <div className="UserPage__signin-username">
                                {warningUsername ? (
                                    <p style={{ color: "red" }}>
                                        Enter you username
                                    </p>
                                ) : (
                                    <p>Enter you username </p>
                                )}
                                {warningUsername ? (
                                    <input
                                        type="text"
                                        required
                                        placeholder="Username or email address"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={{ border: "1px solid red" }}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        required
                                        placeholder="Username or email address"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                )}
                            </div>
                            <div className="UserPage__signin-password">
                                {warningPassword ? (
                                    <p style={{ color: "red" }}>Enter your password</p>
                                ) : (
                                    <p>Enter your password</p>
                                )}

                                {warningPassword ? (
                                    <input
                                        type="password"
                                        required
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ border: "1px solid red" }}
                                    />
                                ) : (
                                    <input
                                        type="password"
                                        required
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="UserPage__login-button">
                            <button type="submit" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserPage;
