import React from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row
} from 'react-bootstrap';

export default function Signup() {
  return (
    <Container className='d-flex justify-content-center mt-5'>
      <Row className='loginContainer d-flex  align-self-center'>
        <Col>
          <Card>
            <Card.Title className='text-center mb-3  mt-5'>
              <h3>Sign up</h3>
            </Card.Title>
            <Form className=' p-3 '>
              <Form.Group className="mb-3" controlId="">
                <Form.Control type="text" placeholder="Name" id='Name'/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Control type="text" placeholder="Last name" id='LastName' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Control type="email" placeholder="Email address" id='EmailAddress' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Control type="password" placeholder="Password" id='Password'/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Control type="password" placeholder="Confirm password" id='ConfirmPassword' />
              </Form.Group>
              <Form.Group className='d-grid gap-2'>
                <Button variant="success">Sign up</Button>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container >
  );
}
