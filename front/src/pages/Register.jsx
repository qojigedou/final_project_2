import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();
  const handlerRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8080/api/notetube/user/register",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password, email }),
      }
    );
    if (response.status == 201) {
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
  const checkEmail = () => {
    return (
      email.length > 0 &&
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    );
  };
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
        {isError && username.length < 3 && (
          <p className="text-red-400">given username is too short</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          className="p-2"
          type="email"
          name="email"
          id="email"
          placeholder="your not very secret email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isError && !checkEmail() && (
          <p className="text-red-400">wrong email</p>
        )}
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
        {isError && password.length < 7 && (
          <p className="text-red-400">given password is too short</p>
        )}
        <button
          type="submit"
          className="p-4 bg-gray-100"
          onClick={handlerRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
