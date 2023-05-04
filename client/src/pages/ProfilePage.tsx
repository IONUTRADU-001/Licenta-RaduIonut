import React from 'react';
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import { useContext, useDispatch } from "../context";
import { useService } from "../hooks/useService";
import { UserService } from "../services/user.service";


const ProfilePage: React.FC = () => {
  const [redirect, setRedirect] = useState<string>("");
  const { user, ready } = useContext();
  const dispatch = useDispatch();
  const userService = useService(UserService);  
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await userService.logout();
    dispatch({ type: 'setUser', user: null, ready: false });
    setRedirect('/');
  }

  if (!ready) {
    return <>Loading...</>;
  }

  if (ready && !user && !redirect) {
    <Navigate to={'/login'} />
  }

  if (redirect) {
    <Navigate to={redirect} />
  }

  return (
    <>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </>
  );
}

export default ProfilePage;