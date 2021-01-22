import React, { Component } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import RocketLaunchDetails from './components/RocketLaunchDetails';
import querystring from 'querystring';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

const API_BASE_URL = 'https://api.spaceXdata.com/v3/launches?limit=100&';
const developed_by = 'Sagar Arora';
class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      isLoaded:false,
      filters:{
        limit:150,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      }
    }
  }

  fetchUpdatedBaseURL(filters= {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

    fetchAPIData(filters) {
    const URL = this.fetchUpdatedBaseURL(filters);
    this.setState({ isLoaded:false, filters });
    fetch(URL)
    .then(res=>res.json())
      .then(data=>{
      this.setState({
        isLoaded:true, 
        data
      });
    });
  }

  componentDidMount() {
    this.fetchAPIData(this.state.filters);
  }

  updateFilters(name, value) {
    if(this.state.filters[name]===value){
      value = undefined;
    }
    
    const filters = {
      ...this.state.filters,
      [name]: value
    };
    
    this.fetchAPIData(filters);
  }

  render() {
    const LAUNCH_YEARS = new Array(16).fill(0).map((_, index) => 2006 + index);
    const { isLoaded, data } = this.state;

    if(isLoaded) {
      return (
        <div className="App">
          <h1 className="App-header">SpaceX Launch Programs</h1>
          <Container fluid>
            
            <Row>
              <Col xs={12} sm={12} md={6} lg={3}>
              <Card className="App-filter-card">
                <Card.Body>

                <Card.Title className="App-filter-header">
                  Filters
                </Card.Title>
                <Card.Text className="App-filter-heading-launch-year">
                  Launch Year
                  <hr className="App-filter-hr" />
                </Card.Text>

                <Row>
                  <div className="App-filter-button-container">
                    {LAUNCH_YEARS.map((launch_year)=>{
                      return (
                        <Button className="App-filter-button" variant={
                          this.state.filters.launch_year===launch_year.toString() ? "success" : "outline-success"
                          } value={ launch_year } 
                          onClick={(event)=>
                            this.updateFilters(
                              'launch_year',
                              event.target.value
                            )
                          }
                        >
                          { launch_year }
                        </Button>
                      );
                    })}
                  </div>
                </Row>

                <Card.Text className="App-filter-heading">
                    Successful Launch
                    <hr className="App-filter-hr" />
                </Card.Text>

                <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(event) =>
                          this.updateFilters(
                            "launch_success",
                            event.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(event) =>
                          this.updateFilters(
                            "launch_success",
                            event.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>

                    <Card.Text className="App-filter-heading">
                      Successful Landing
                      <hr className="App-filter-hr" />
                    </Card.Text>
                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(event) =>
                          this.updateFilters("land_success", event.target.value)
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(event) =>
                          this.updateFilters("land_success", event.target.value)
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>
                </Card.Body>
              </Card>

              </Col>
              <Col xs={12} sm={12} md={6} lg={9} >
              <Row>
                {data.map((data)=>{
                  return(
                    <Col md={12} lg={4}>
                      <RocketLaunchDetails data={ data } />
                    </Col>
                  );
                })}
              </Row>

              </Col>
            </Row>
            <div className="App-developed-by">
              Developed By: { developed_by }
            </div>
          </Container>
        </div>
      )
    }
    else{
      return <div className="App-loader-container">
        <div className="App-loader-box">
          <img src={ logo } alt="loading..." />
        </div>
      </div>
    }
  }
}

export default App;
