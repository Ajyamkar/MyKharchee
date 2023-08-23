import React from "react";
import { Outlet } from "react-router-dom";
import "./Profile.scss";

const Profile = () => {
  return (
    <>
      <div>
        <h1>Profile</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Profile;
