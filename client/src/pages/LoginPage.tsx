import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "../context";
import { useService } from "../hooks/useService";
import { UserService } from "../services/user.service";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const userService = useService(UserService);

  async function handleLoginSubmit(ev: any) {
    ev.preventDefault();
    try {
      userService.login(email, password).then((res) => { 
        const user = res.user
        if (!user) {
          alert("Login failed");
          return;
        }
        
        // Save user credentials in local storage
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.user._id);
        localStorage.setItem("user", JSON.stringify(res.user));
        
        dispatch({ type: "setUser", user, ready: true });
        alert('Login successful');
        setRedirect(true);
      });
    } catch (e) {
      alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;