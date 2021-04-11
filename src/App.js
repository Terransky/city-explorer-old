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
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      let cityOne = cityData.data[0];
      this.setState({
        cityData: cityOne
      });
    } catch (err) {
      this.setState({error: `${err.message}: ${err.response.data.error}`});
    }
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
        { this.state.error ? <h3>{this.state.error}</h3> : ''} {/* ternary for error message*/}
        { this.state.cityData.lat !== undefined ? <Jumbotron>
          <h3>{this.state.cityData.display_name}</h3>
          <h5>{this.state.cityData.lat}, {this.state.cityData.lon}</h5>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt={`Map of ${this.state.cityData.display_name}`}/>
        </Jumbotron> : ''} {/* ternary that hides jumbotron so long as cityData.lat is falsey*/}
      </div>
    );
  }
}

export default App;
