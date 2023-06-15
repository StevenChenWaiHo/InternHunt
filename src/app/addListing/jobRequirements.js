'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form, ButtonGroup } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function JobRequirementsList({ id, listing, setListing }) {

  useEffect(() => {
    fetch('/api/listingEdit' + id)
      .then((response) => response.json())
      .then((data) => setListing(data));
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    fetch('/api/requirements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postID: listing.id
      }),
    })
      .then((response) => response.json())
      .then((newRequirement) => {
        setListing((prevListing) => ({
          ...prevListing,
          requirements: [...prevListing.requirements, newRequirement]
        }));
      });
  }

  return (
    <Form>
      <Card className="my-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Requirements</p>
        <Button onClick={handleAdd}>Add</Button>
        </Card.Header>
          {listing.requirements.sort((a, b) => a.id - b.id).map((requirement) =>
            <JobRequirementsItem key={requirement.id} listingid={listing.id}
            id={requirement.id} requirement={requirement} setListing={setListing} />)}
      </Card>
    </Form>
  )
}

export default JobRequirementsList;

function JobRequirementsItem({ listingid, id, requirement, setListing }) {
  const reqRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/requirements', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postid: listingid,
        id: id,
        requirementText: reqRef.current.value
      }),
    });
  }

  const handleRemove = (event) => {
    event.preventDefault();
    fetch('/api/requirementRemoval', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postid: listingid,
        id: id
      }),
    })
      .then((response) => response.clone())
      .then(() => {
        setListing((prevListing) => ({
          ...prevListing,
          requirements: prevListing.requirements.filter((requirement) => requirement.id !== id)
        }));
      });
  }

  return (
    <Form.Group className="mb-3" controlId="formJobReq">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Control as="textarea" rows={1}
          placeholder="Enter your Requirements" defaultValue={requirement.requirementText}
          ref={reqRef} />
          <ButtonGroup>
            <Button onClick={handleSubmit}>Save</Button>
            <Button variant="danger" onClick={handleRemove}>Remove</Button>
          </ButtonGroup>
      </div>
    </Form.Group>
  )
}