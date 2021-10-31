import React, { useEffect, useState } from "react";
import axios from "axios";

const EditEmployee = (props) => {
  const empId = props.match.params.empId;
  

  const [employeeData, setEmployeeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://satheshrgs-dummyapi.herokuapp.com/employees/${empId}`)
      .then((res) => {
        setEmployeeData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsLoadingError(true);
        console.log(error);
      });
  }, [empId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleUpdate = () => {
    axios.put(`http://satheshrgs-dummyapi.herokuapp.com/employees/${empId}`, employeeData).then(res => {
      window.alert("Employee Edited Successfully");
      props.history.push("/");
    }).catch(error=> {
      console.log(error);
    })
  };

  return (
    <>
      <div className="text-center fs-2 fw-bold">
        Edit Employee - {empId}
      </div>
      <button
        className="btn btn-secondary mb-2"
        onClick={() => props.history.push("/")}
      >
        Back to All Employees Page
      </button>
      {isLoading && <div>Loading... Please wait</div>}
      {isLoadingError && <div>Employee Not found</div>}

      {!isLoading && !isLoadingError && (
        <>
          <div className="form-group pb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={employeeData.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group pb-2">
            <label htmlFor="name">Age</label>
            <input
              type="text"
              className="form-control"
              id="age"
              value={employeeData.age}
              onChange={handleInputChange}
              name="age"
            />
          </div>
          <button onClick={handleUpdate} className="btn btn-success">
            Edit Employee
          </button>
        </>
      )}
    </>
  );
};

export default EditEmployee;
