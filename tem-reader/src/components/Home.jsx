import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Route, Switch, Link, useLocation } from "react-router-dom";

import AddSensor from "./AddSensor";
import Chart from "./Chart";

const Home = () => {
  const [user, setuser] = useState("");
  const [selectedSensor, setselectedSensor] = useState("");

  const setSensor = (id) => {
    setselectedSensor(id);
  };
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      setuser(jwtDecode(jwt)._id);
    } else {
      setuser("");
      //   toast.error(`User not Logged In`);
    }
  }, []);

  return (
    <>
      <div className="row mt-5 mb-5">
        <div className="col-9">
          <AddSensor />
        </div>
      </div>
      <Switch>
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
    </>
  );
};

export default Home;
