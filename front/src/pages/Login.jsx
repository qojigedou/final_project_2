import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlerLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8080/api/notetube/user/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
  };

  return (
    <div className="w-full h-[100vh]">
      <form className="flex flex-col w-2/5 bg-gray-300 gap-3 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-lg">
        <Link to="/" scroll={false}>
          <h1 className="text-9xl">NoteTube</h1>
        </Link>

        <label htmlFor="username">username</label>
        <input
          className="p-2"
          type="text"
          name="username"
          id="username"
          placeholder="e.g. user1234"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2"
          type="password"
          name="password"
          id="password"
          placeholder="your very secure password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="p-4 bg-gray-100"
          onClick={handlerLogin}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
export default Login;
