import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Route, Switch, Link, useLocation, Redirect } from "react-router-dom";

import AddSensor from "./AddSensor";
import Chart from "./Chart";
import AlertsTable from "./AlertsTable";

const Home = (props) => {
  const [user, setuser] = useState("");
  const [uName, setuName] = useState("");
  const [selectedSensor, setselectedSensor] = useState("");
  const jwt = localStorage.getItem("token");
  let path = props.location.pathname;

  const setSensor = (id) => {
    setselectedSensor(id);
  };
  useEffect(() => {
    if (jwt) {
      setuser(jwtDecode(jwt)._id);
      setuName(jwtDecode(jwt).name);
    } else {
      setuser("");
      //   toast.error(`User not Logged In`);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  return (
    <>
      {jwt ? (
        <div>
          <div className="row ml-5 mt-2">
            <div className="col-1"></div>
            <div className="col-1 font-weight-bold">
              <h6>{uName}</h6>
            </div>
            <div className="col-6">
              <button onClick={logout} className="btn btn-outline-dark ml-5">
                Logout
              </button>
            </div>
          </div>
          <div className="row mt-4 mb-5">
            <div className="col-9">
              <AddSensor />
            </div>
            <div className="col-3">
              {path == "/home" ? (
                <Link to="/home/alerts">
                  <button className="btn btn-outline-danger">Alerts</button>
                </Link>
              ) : (
                <Link to="/home">
                  <button className="btn btn-outline-primary">Charts</button>
                </Link>
              )}
            </div>
          </div>
          <Switch>
            <Route
              exact
              path="/home/alerts"
              render={(props) => (
                <AlertsTable
                  sensor={selectedSensor}
                  user={user}
                  setSensor={setSensor}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/home"
              render={(props) => (
                <Chart
                  sensor={selectedSensor}
                  user={user}
                  setSensor={setSensor}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Home;
