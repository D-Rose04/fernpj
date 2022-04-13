import React from 'react';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row
} from 'react-bootstrap';

export default function Login() {
    
    return (
        <Container className='d-flex justify-content-center mt-5'>
            <Row className='loginContainer d-flex  align-self-center'>
                <Col>
                    <Card>
                        <Card.Title className='text-center mb-3  mt-5'>
                            <h3>Log in</h3>
                        </Card.Title>
                        <Form className=' p-3 '>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Control type="email" placeholder="Email address" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className='d-grid gap-2'>
                                <Button variant="primary">Sign in</Button>
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container >
    )
}
