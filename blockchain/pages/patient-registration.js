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
function PatientRegistration() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const genderOptions = [
    { key: "m", text: "Male", value: "Male" },
    { key: "f", text: "Female", value: "Female" },
    { key: "o", text: "Other", value: "Other" },
  ];
  const allergyOptions = [
    { key: 'f', text: 'Food', value: 'Food' },
    { key: 'm', text: 'Medical', value: 'Medical' },
    { key: 'e', text: 'Environmental', value: 'Environmental' },
    { key: 'o', text: 'Others', value: 'Others' },
]

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/patient", {
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
    const response = await fetch("http://localhost:8080/patient", {
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
        <h1>Register as New Patient</h1>
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
          </Form.Group>
          <Form.Field>
                            <label>Aadhar Number</label>
                            <Input
                                placeholder = 'Eg. 711789435876'                        
                                name="aadhar"
                                onChange={handleForm}                           
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone</label>
                            <Input
                                placeholder = 'Eg. 0123456789'
                                name="phone"
                                onChange= {handleForm}  
                            />
                        </Form.Field>
                    <br/>              
                    <Form.Group widths='equal'>
                        <Form.Field 
                                label='Gender' 
                                control={Select} 
                                options={genderOptions} 
                                onChange={handleForm}
                        />

                        <Form.Field>
                            <label>Date of Birth</label>
                            <Input 
                                placeholder = 'Eg. 01/01/1997'
                                name="dob"
                                onChange= {handleForm}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Height</label>
                            <Input 
                                placeholder = 'Eg. 183'
                                label={{ basic: true, content: 'cm' }}
                                labelPosition='right'
                                name="height"
                                onChange= {handleForm}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Weight</label>
                            <Input 
                                placeholder = 'Eg. 65'
                                label={{ basic: true, content: 'kg' }}
                                labelPosition='right'
                                name="weight"
                                onChange= {handleForm}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                   
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='House Address'
                                placeholder = 'Eg. 1234, Jalan Seksyen 1/3, 31900 Kampar, Perak'
                                name="houseaddress"
                                onChange= {handleForm}  
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Email Address</label>
                            <Input
                                placeholder = 'Eg. abc@gmail.com'                
                                name="email"
                                onChange= {handleForm}                           
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Medical History</h2>
                    <Divider clearing />                    
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Blood Group</label>
                            <Input 
                                placeholder = 'Eg. A-'
                                name="bloodgroup"
                                onChange= {handleForm}  
                            />
                        </Form.Field>

                        <Form.Field 
                                label='Allergies' 
                                control={Select} 
                                options={allergyOptions} 
                                onChange={handleForm}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='Current Medications'
                                placeholder = 'Eg. Antidepressants'
                                name="medications"
                                onChange= {handleForm}  
                        />
                    </Form.Group>

                    <Form.Field>
                            <label>Reports</label>
                            <Input type = 'File'/>
                        </Form.Field>
                        <br/>
                        <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Insurance Policy, If any</h2>
                    <Divider clearing />                    
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Insurance Number</label>
                            <Input 
                                placeholder = 'Eg. 33054845120515'
                                name="insurance"
                                onChange= {handleForm}  
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Insurance Certificate</label>
                            <Input type = 'File'/>
                        </Form.Field>
                        </Form.Group>
                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Emergency Contact</h2>
                    <Divider clearing />
                    <Form.Group widths='equal'>
                       <Form.Field>
                            <label>Emergency Contact Name</label>
                            <Input 
                                placeholder = 'Eg. Taylor Smith'
                                name="emergencyname"
                                onChange= {handleForm}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Emergency Contact Phone</label>
                            <Input 
                                placeholder = 'Eg. 0124995002'
                                name="emergencycontact"
                                onChange= {handleForm}  
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

export default PatientRegistration;
