import React, { useState } from 'react';
import './login.css';
import { Google } from 'react-bootstrap-icons';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row
} from 'react-bootstrap';
import { useFireContext } from '../../firebaseSetUp/context/FireBaseContext';


export default function Login() {
    const { SignIn, SignInWithGoogle } = useFireContext();
    const [user, setUser] = useState({ Email: '', Password: '' });

    const handleInput = (event) => {
        const { id, value } = event.target;
        setUser({ ...user, [id]: value });
    };
    const handleSignIn = async () => {
        await SignIn(user.Email, user.Password);

    }
    const handleSignInWithGoogle = async () => {
        await SignInWithGoogle();
    }

    return (
        <Container className='d-flex  align-items-center justify-content-center mt-5'>
            <Row className='d-flex loginContainer align-self-center'>
                <Col>
                    <Card>
                        <Card.Title className='text-center mb-3  mt-5'>
                            <h3>Log in </h3>
                        </Card.Title>
                        <Form className=' p-3 '>
                            <Form.Group className="mb-3" >
                                <Form.Control type="email" placeholder="Email address" id='Email' onChange={handleInput} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="password" placeholder="Password" id='Password' onChange={handleInput} />
                            </Form.Group>
                            <Form.Group className='d-grid gap-2'>
                                <Button variant="primary" onClick={handleSignIn}>Sign in</Button>
                            </Form.Group>
                            <Form.Group className='d-grid gap-2 mt-2'>
                                <Button variant="outline-dark" onClick={() => handleSignInWithGoogle()}><Google className='me-1 mb-1' ></Google>Sign in with google </Button>
                            </Form.Group>
                            <Form.Group className='mt-3'>
                                <p>Don't have an account? <a href='/signup'>Sign up</a></p>
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container >
    )
}
