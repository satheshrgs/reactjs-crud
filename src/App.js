import EmployeeList from "./EmployeeList";
import AddNewEmployee from "./AddNewEmployee";
import EditEmployee from "./EditEmployee";
import NotFoundPage from './notFoundRoute';
import React from "react";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              All Employees
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addNewEmployee"} className="nav-link">
              Add New Employee
            </Link>
          </li>
        </div>
      </nav>
      <Switch>
        <Route exact path={["/", "/allEmployees"]} component={EmployeeList} />
        <Route exact path="/addNewEmployee" component={AddNewEmployee} />
        <Route exact path="/editEmployee/:empId" component={EditEmployee} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
