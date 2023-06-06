'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, Button, ListGroup, Container, Navbar, Card, ListGroupItem } from "react-bootstrap";
import { Component, useEffect, useState } from "react";

function recruiterDashboard() {

const [post, setPost] = useState({name: "", applications: [], totalPlaces: 0, status: ""});

useEffect(() => {
  fetch('/api/post')
    .then((response) => response.json())
    .then((data) => setPost(data));
}, []);


  return (
    <main className="recruiterDashboard">
      {/* Navigation Title Bar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Container className="d-flex justify-content-start">
            <Navbar.Brand>My Company</Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Container>
          <Button>Search</Button>
        </Container>
      </Navbar>
      
      {/* Job Listings List */}
      <Container  style={{height: "80vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button>Sort</Button>
            <h4>My Listings</h4>
            <Button>New Post</Button>
          </Card.Header>

        <ApplicantList listings={[1, 2, 3]}></ApplicantList>
          
        </Card>
      </Container>
    </main>
    
  );
}

export default recruiterDashboard;

class ApplicantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: props.listings
    };
  }

  render() {
    return (
      <ListGroup>
        {this.state.listings.map((listing) => <ListingItem key={listing.title}></ListingItem>)}
      </ListGroup>
    )
  }
}

const handleClick = () => {
  window.location.href = "./recruiterInternship";
}

class ListingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "IT Intern",
      status: "Applications Open",
      places_filled: "3",
      total_places: "50"
    };
  }

  render() {
    return (
      <ListGroupItem>
        <Container className="d-flex justify-content-between" style={{cursor: "pointer"}} onClick={handleClick}>
          <p className="text-muted">{this.state.status}</p>
          <p className="text-center">{this.state.title}</p>
          <p className="text-warning">
            {this.state.places_filled}/{this.state.total_places} Applications
          </p>
        </Container>
      </ListGroupItem>
    )
  }
}

{/* <ListGroupItem>
<Container className="d-flex justify-content-between" style={{cursor: "pointer"}} onClick={handleClick}>
  <p className="text-success">Applications Open</p>
  <p className="text-center">Softare Engineer Intern</p>
  <p className="text-warning">30/35 Applications</p>
</Container>
</ListGroupItem> */}