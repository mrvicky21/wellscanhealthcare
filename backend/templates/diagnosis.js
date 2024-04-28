import React, { Component } from 'react';
import { Divider, Segment } from 'semantic-ui-react';
import Layout from '../components/Layout';
import axios from 'axios';

const cors = require('cors')

class Diagnosis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            imageData: null,
            loading: false,
            error: null
        };
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({ imageData: file });
        };
        reader.readAsDataURL(file);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.imageData) {
            this.setState({ error: "Please select an image." });
            return;
        }
        this.setState({ loading: true, error: null });

        const formData = new FormData();
        formData.append('file', this.state.imageData);

        axios.post('http://localhost:5000//predict', formData)
            .then(response => {
                console.log(response.data);
                this.setState({ result: response.data, loading: false });
                
            })
            .catch(error => {
                
                console.error('Error fetching result:', error);
                this.setState({ error: "An error occurred while processing the image.", loading: false });
            });
    }

    render() {
        const { result, loading, error } = this.state;

        return (
            <Layout>
                <Segment padded>
                    <h1>Brain Tumor Analysis</h1>
                </Segment>
                <Segment>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data" action="/predict" method = 'post'>
                    <input type="file" name="file" accept=".png, .jpg, .jpeg" onChange={this.handleFileChange} />
                        <button type="submit" disabled={loading}>Predict</button>
                    </form>
                    
                
                    <Divider clearing />
                    <h1>Brain Tumor Result</h1>
                    
                    {error && (<p style={{ color: 'red' }}>{error}</p>)}

                    {loading && <p>Loading...</p>}
                    {result && (
                        <React.Fragment>
                            <p>Prediction: {result.prediction}</p>
                            <img src={result.original_img} alt="Original Image" />
                            <img src={result.segmented_img} alt="Segmented Image" />
                        </React.Fragment>
                    )}
                    
                </Segment>
            </Layout>
        );
    }
}

export default Diagnosis;
