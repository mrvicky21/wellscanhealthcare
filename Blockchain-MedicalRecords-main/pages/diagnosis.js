import React, { Component } from 'react';
import { Divider, Segment } from 'semantic-ui-react';
import Layout from '../components/Layout';
import axios from 'axios';

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

        axios.post('http://localhost:5000/predict', formData)
            .then(response => {
                
                // Construct full URLs for the images
                const { original_img, segmented_img } = response.data;
                const fullOriginalImgUrl = 'http://localhost:5000' + original_img;
                const fullSegmentedImgUrl = 'http://localhost:5000' + segmented_img;
                // Update state with full URLs
                this.setState({ result: { ...response.data, original_img: fullOriginalImgUrl, segmented_img: fullSegmentedImgUrl }, loading: false });
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
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data" action="/predict" method='post'>
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
