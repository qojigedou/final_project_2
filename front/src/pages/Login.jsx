import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();
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
        body: JSON.stringify({ userName: username, password }),
      }
    );
    if (response.status == 200) {
      const responseData = await response.json();
      const user = responseData;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  });

  return (
    <div className="w-full h-[100vh]">
      <form className="flex flex-col w-full sm:w-3/5 md:w-2/5 bg-gray-300 gap-3 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-lg">
        <Link to="/" scroll={false}>
          <h1 className="text-8xl text-center font-secondary">NoteTube</h1>
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
        {isError && <p className="text-red-400">Wrong credentials</p>}
        <p className="text-center">
          Dont have an account?{" "}
          <Link className="underline" to="/register">
            Register now
          </Link>
        </p>
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
