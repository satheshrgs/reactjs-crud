import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = props => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = () => {
    setIsLoading(true);
    axios
      .get("http://satheshrgs-dummyapi.herokuapp.com/employees")
      .then((res) => {
        setEmployeeData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsLoadingError(true);
        console.log(error);
      });
  };

  const deleteEmployee = (id) => {
    console.log("Employee Id to be deleted", id);
    axios
      .delete(`http://satheshrgs-dummyapi.herokuapp.com/employees/${id}`)
      .then((res) => {
        // Method 1
        getEmployeeData();
        // Method 2, instead we can also do slice the employee data from state and re-render
        // const updateEmployeeData = employeeData.filter(employee => employee.id !== id);
        // setEmployeeData(updateEmployeeData);
      })
      .catch((error) => {
        console.log("Error", error);
        window.alert("Something went wrong !!!");
        // toast message
      });
  };

  const editEmployee = id => {
    // "/editEmployee"+id
    props.history.push(`/editEmployee/${id}`);
  }

  return (
    <>
      <div className="text-center fs-2 fw-bold">Employee List</div>
      {isLoading && <div>Loading... Please wait</div>}
      {isLoadingError && <div>Loading Failure</div>}
      {!isLoading && !isLoadingError && (
        <div>
          <hr />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Employee Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.age}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => editEmployee(employee.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employeeData.length === 0 && <div>No Record Found</div>}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default EmployeeList;
