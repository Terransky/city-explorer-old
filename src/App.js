import React from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cityData: {}
    };
  }
  handleFormSubmit = async(event) => {
    event.preventDefault();
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
    let cityOne = cityData.data[0];
    this.setState({
      cityData: cityOne
    });
  }
  render() {
    return (
      <div>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId='city'>
            <Form.Label>City name</Form.Label>
            <Form.Control value={this.state.city} onInput={event => this.setState({city: event.target.value})}></Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit'>Search</Button>
        </Form>
        { this.state.cityData.lat !== undefined ? <Jumbotron>
          <h3>{this.state.cityData.display_name}</h3>
          <h5>{this.state.cityData.lat}, {this.state.cityData.lon}</h5>
        </Jumbotron> : ''} {/* ternary that hides jumbotron so long as cityData.lat is falsey*/}
      </div>
    );
  }
}

export default App;
