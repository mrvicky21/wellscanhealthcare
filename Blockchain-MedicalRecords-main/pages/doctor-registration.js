import React from "react";
import { useEffect, useState } from "react";
import {
  Divider,
  Form,
  Input,
  Button,
  Segment,
  Message,
  Select,
} from "semantic-ui-react";
import Layout from "../components/Layout";
function DoctorRegistration() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const genderOptions = [
    { key: "m", text: "Male", value: "Male" },
    { key: "f", text: "Female", value: "Female" },
    { key: "o", text: "Other", value: "Other" },
  ];

  const qualificationOptions = [
    {
      key: "h",
      text: "Higher Certificate/SPM",
      value: "Higher Certificate/SPM",
    },
    { key: "d", text: "Diploma", value: "Diploma" },
    { key: "b", text: "Bachelor's Degree", value: "Bachelor's Degree" },
    { key: "m", text: "Master's Degree", value: "Master's Degree" },
    { key: "dd", text: "Doctoral Degree", value: "Doctoral Degree" },
  ];

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/demo", {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Layout>
      <Segment>
        <h1>Register as New Doctor</h1>
      </Segment>
      <Segment>
        <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>
          General Information
        </h2>

        <Divider clearing />

        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>IC</label>
              <Input
                placeholder="Eg. 001234010234"
                name="ic"
                onChange={handleForm}
              />
            </Form.Field>
            <Form.Field>
              <label>Full Name</label>
              <Input
                placeholder="Eg. John Smith"
                name="name"
                onChange={handleForm}
              />
            </Form.Field>
            <Form.Field>
              <label>Aadhar Number</label>
              <Input
                placeholder="Eg. 976859761258"
                name="aadhar"
                onChange={handleForm}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Phone</label>
              <Input
                placeholder="Eg. 0123456789"
                name="phone"
                onChange={handleForm}
              />
            </Form.Field>
            <Form.Field>
              <label>Email Address</label>
              <Input
                placeholder="Eg. abc@gmail.com"
                name="email"
                onChange={handleForm}
              />
            </Form.Field>
          </Form.Group>
                      <Form.Group widths="equal">
              <Form.Field
                label="Gender"
                control={Select}
                options={genderOptions}
                name="gender"
                onChange={handleForm}
              />

              <Form.Field>
                <label>Date of Birth</label>
                <Input
                  placeholder="Eg. 01/01/1997"
                  name="dob"
                  onChange={handleForm}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Registration No.</label>
                <Input
                  placeholder="187962820629"
                  name="RegistrationNo"
                  onChange={handleForm}
                />
              </Form.Field>
              <Form.Field>
                <label>Date of Registration</label>
                <Input
                  placeholder="Eg. 01/01/1997"
                  name="DateofRegistration"
                  onChange={handleForm}
                />
              </Form.Field>
              <Form.Field>
                <label>Registration Certificate</label>
                <Input type="File" 
                 name="registrationcerti"
                 onChange={handleForm}
                />
              </Form.Field>
            </Form.Group>
            
            <br />
            <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>
              Education Information
            </h2>
            <Divider clearing />
            <Form.Group widths="equal">
              <Form.Field
                label="Highest Qualification"
                control={Select}
                options={qualificationOptions}
                name="qualification"
                onChange={handleForm}
              />
              <Form.Field>
                <label>Major</label>
                <Input
                  placeholder="Eg. Biology"
                  name="major"
                  onChange={handleForm}
                />
              </Form.Field>
            </Form.Group>
          <br />

          <input type="submit"></input>
        </Form>

        {/* <form onSubmit={handleSubmit}>
          <span>username</span>
          <input type="text" name="username" onChange={handleForm}></input>
          <span>password</span>
          <input type="text" name="password" onChange={handleForm}></input>
          <input type="submit"></input>
        </form> */}

        <div>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.ic},{user.name}
              </li>
            ))}
          </ul>
        </div>
      </Segment>
    </Layout>
  );
}

export default DoctorRegistration;
