import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select} from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Router } from '../routes';

const options = [
    { key: 'm', text: 'Male', value: 'Male' },
    { key: 'f', text: 'Female', value: 'Female' },
    { key: 'o', text: 'Other', value: 'Other' },
]

const allergyOptions = [
    { key: 'f', text: 'Food', value: 'Food' },
    { key: 'm', text: 'Medical', value: 'Medical' },
    { key: 'e', text: 'Environmental', value: 'Environmental' },
    { key: 'o', text: 'Others', value: 'Others' },
]

class PAtientRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        height: '',
        weight: '',
        houseaddr: '',
        bloodgroup: '',
        allergies: '',
        medication: '',
        emergencyName: '',
        emergencyContact: '',
        loading: false,
        errorMessage: ''
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
        ic,
        name,
        phone,
        gender,
        dob,
        height,
        weight,
        houseaddr,
        bloodgroup,
        allergies,
        medication,
        emergencyName,
        emergencyContact,
        loading,
        errorMessage,
    } = this.state;
    try {
      const response = await axios.post("/api/users", {
        ic,
        name,
        phone,
        gender,
        dob,
        height,
        weight,
        houseaddr,
        bloodgroup,
        allergies,
        medication,
        emergencyName,
        emergencyContact,
        loading,
        errorMessage,
      });
      console.log("User registered:", response.data);
      // Reset form after successful registration
      this.setState({
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        height: '',
        weight: '',
        houseaddr: '',
        bloodgroup: '',
        allergies: '',
        medication: '',
        emergencyName: '',
        emergencyContact: '',
        loading: false,
        errorMessage: ''
      });
    } catch (error) {
      console.error("Registration failed:", error?.response?.data);
    }
  };

    render() {
        const {
            ic,
            name,
            phone,
            gender,
            dob,
            height,
            weight,
            houseaddr,
            bloodgroup,
            allergies,
            medication,
            emergencyName,
            emergencyContact,
            loading,
            errorMessage,
          } = this.state;
        return (
            <Layout>
                <Segment padded><h1>Create New Record</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '10px', marginBottom: '30px'}}>General Information</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>IC</label>
                            <Input
                                placeholder = 'Eg. 001234010234'                
                                value= {this.state.ic}
                                onChange= {event => 
                                    this.setState({ ic: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Full Name</label>
                            <Input
                                placeholder = 'Eg. John Smith'                        
                                value= {this.state.name}
                                onChange= {event => 
                                    this.setState({ name: event.target.value })}                           
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Aadhar Number</label>
                            <Input
                                placeholder = 'Eg. 711789435876'                        
                                value= {this.state.aadhar}
                                onChange= {event => 
                                    this.setState({ aadhar: event.target.value })}                           
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone</label>
                            <Input
                                placeholder = 'Eg. 0123456789'
                                value= {this.state.phone}
                                onChange= {event => 
                                    this.setState({ phone: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>              
                    <Form.Group widths='equal'>
                        <Form.Field 
                                label='Gender' 
                                control={Select} 
                                options={options} 
                                onChange={this.handleGender}
                        />

                        <Form.Field>
                            <label>Date of Birth</label>
                            <Input 
                                placeholder = 'Eg. 01/01/1997'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Height</label>
                            <Input 
                                placeholder = 'Eg. 183'
                                label={{ basic: true, content: 'cm' }}
                                labelPosition='right'
                                value= {this.state.height}
                                onChange= {event => 
                                    this.setState({ height: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Weight</label>
                            <Input 
                                placeholder = 'Eg. 65'
                                label={{ basic: true, content: 'kg' }}
                                labelPosition='right'
                                value= {this.state.weight}
                                onChange= {event => 
                                    this.setState({ weight: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                   
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='House Address'
                                placeholder = 'Eg. 1234, Jalan Seksyen 1/3, 31900 Kampar, Perak'
                                value= {this.state.houseaddr}
                                onChange= {event => 
                                    this.setState({ houseaddr: event.target.value })}  
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Email Address</label>
                            <Input
                                placeholder = 'Eg. abc@gmail.com'                
                                value= {this.state.email}
                                onChange= {event => 
                                    this.setState({ email: event.target.value })}                           
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
                                value= {this.state.bloodgroup}
                                onChange= {event => 
                                    this.setState({ bloodgroup: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field 
                                label='Allergies' 
                                control={Select} 
                                options={allergyOptions} 
                                onChange={this.handleAllergies}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='Current Medications'
                                placeholder = 'Eg. Antidepressants'
                                value= {this.state.medication}
                                onChange= {event => 
                                    this.setState({ medication: event.target.value })}  
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
                                value= {this.state.insurance}
                                onChange= {event => 
                                    this.setState({ insurance: event.target.value })}  
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
                                value= {this.state.emergencyName}
                                onChange= {event => 
                                    this.setState({ emergencyName: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Emergency Contact Phone</label>
                            <Input 
                                placeholder = 'Eg. 0124995002'
                                value= {this.state.emergencyContact}
                                onChange= {event => 
                                    this.setState({ emergencyContact: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
                </Segment>
            </Layout>
        );
    }
}

export default PAtientRegistration;