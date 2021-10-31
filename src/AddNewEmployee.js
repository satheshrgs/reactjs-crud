import React, { useState } from "react";
import axios from "axios";

const AddNewEmployee = (props) => {
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submit clicked", employee);
    axios
      .post("https://satheshrgs-dummyapi.herokuapp.com/employees", employee)
      .then((res) => {
        console.log(res.data.id);
        window.alert("Employee Created Successfully");
        // Method 1 - Clear Data in the input elements and retain in same page
        // setEmployee({ name: '', age: ''});

        // Method 2 - Navigate to all employees listing page
        props.history.push("/");

        // Method 3 - Navigate to edit page of that employee
        // props.history.push(`/editEmployee/${res.data.id}`);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="fw-bold fs-2 text-center">Add new Employee</div>
      <hr />
      <button
        className="btn btn-secondary mb-2"
        onClick={() => props.history.push("/")}
      >
        Back to All Employees Page
      </button>
      <div className="form-group pb-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={employee.name}
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
          value={employee.age}
          onChange={handleInputChange}
          name="age"
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-success">
        Create New Employee
      </button>
    </>
  );
};

export default AddNewEmployee;
