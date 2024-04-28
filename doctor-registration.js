import React, { Component } from "react";
import { Divider, Form, Input, Button, Segment, Message, Select} from "semantic-ui-react";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";

const genderOptions = [
  { key: "m", text: "Male", value: "Male" },
  { key: "f", text: "Female", value: "Female" },
  { key: "o", text: "Other", value: "Other" },
];

const qualificationOptions = [
  { key: "h", text: "Higher Certificate/SPM", value: "Higher Certificate/SPM" },
  { key: "d", text: "Diploma", value: "Diploma" },
  { key: "b", text: "Bachelor's Degree", value: "Bachelor's Degree" },
  { key: "m", text: "Master's Degree", value: "Master's Degree" },
  { key: "dd", text: "Doctoral Degree", value: "Doctoral Degree" },
];

class DoctorRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ic: "",
      name: "",
      phone: "",
      gender: "",
      dob: "",
      qualification: "",
      major: "",
      loading: false,
      errorMessage: "",
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
      qualification,
      major,
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
        qualification,
        major,
        loading,
        errorMessage,
      });
      console.log("User registered:", response.data);
      // Reset form after successful registration
      this.setState({
        ic: "",
        name: "",
        phone: "",
        gender: "",
        dob: "",
        qualification: "",
        major: "",
        loading: "",
        errorMessage: "",
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
      qualification,
      major,
      loading,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <Segment padded>
          <h1>Register New Doctor</h1>
        </Segment>
        <Segment>
          <h2 style={{ marginTop: "20px", marginBottom: "30px" }}>
            General Information
          </h2>
          <Divider clearing />
          <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>IC</label>
                <Input
                  placeholder="Eg. 001234010234"
                  value={ic}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Full Name</label>
                <Input
                  placeholder="Eg. John Smith"
                  value={name}
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Phone</label>
                <Input
                  placeholder="Eg. 0123456789"
                  value={phone}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Form.Group widths="equal">
              <Form.Field
                label="Gender"
                control={Select}
                options={genderOptions}
                onChange={this.handleChange}
              />

              <Form.Field>
                <label>Date of Birth</label>
                <Input
                  placeholder="Eg. 01/01/1997"
                  value={dob}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Registration No.</label>
                <Input
                  placeholder="187962820629"
                  value={name}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Date of Registration</label>
                <Input
                  placeholder="Eg. 01/01/1997"
                  value={dob}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Registration Certificate</label>
                <Input type="File" />
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
                onChange={this.handleChange}
              />

              <Form.Field>
                <label>Major</label>
                <Input
                  placeholder="Eg. Biology"
                  value={major}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>
              Create
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default DoctorRegistration;
