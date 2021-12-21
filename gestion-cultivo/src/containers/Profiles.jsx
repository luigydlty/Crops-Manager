import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import Profile from "../componets/Profile";

const Profiles = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Header />
        <Sidebar />
        <main
          className="col-lg-10 mt-lg-5  p-lg-0"
          style={{ marginLeft: "16.7%" }}
        >
          <div className="m-lg-3 mt-lg-3 ">
            <div className="card">
              <div className="card-body">
                <Profile />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profiles;
