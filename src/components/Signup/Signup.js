import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseSetUp/config/config-firebase';
import { useFireContext } from '../../firebaseSetUp/context/FireBaseContext';
import { Google } from 'react-bootstrap-icons';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row
} from 'react-bootstrap';

export default function Signup() {
  const usersCol = collection(db, 'Users');
  const { SignUp, SignInWithGoogle, updateUserName } = useFireContext();
  const [userInfo, setUserInfo] = useState({
    User: '',
    Name: '',
    LastName: '',
    EmailAddress: '',
    Password: '',
    ConfirmPassword: ''
  });

  // Handle inputs to change user info 
  const handleInput = (event) => {
    const { id, value } = event.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  const Register = async () => {
    try {
      if (userInfo.Password !== userInfo.ConfirmPassword) return;

      // Create a new account for regitered user 
      const data = await SignUp(
        userInfo.EmailAddress,
        userInfo.Password
      );

      const data2 = await updateUserName(`${userInfo.Name}`);
      
      // Add user details to fireStore DB
      // const newUser = await addDoc(usersCol, {
      //   Name: userInfo.Name,
      //   LastName: userInfo.LastName,
      //   User: userInfo.User,
      //   EmailAddress: userInfo.EmailAddress
      // });

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container className='d-flex justify-content-center mt-5'>
      <Row className='loginContainer d-flex  align-self-center'>
        <Col>
          <Card>
            <Card.Title className='text-center mb-3  mt-5'>
              <h3>Sign up</h3>
            </Card.Title>
            <Form className=' p-3 '>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="User" id='User' onChange={handleInput} required autoComplete='username' />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Name" id='Name' onChange={handleInput} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Last name" id='LastName' onChange={handleInput} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email address" id='EmailAddress' onChange={handleInput} required autoComplete='email' />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" id='Password' onChange={handleInput} required autoComplete='new-password' />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Confirm password" id='ConfirmPassword' onChange={handleInput} required autoComplete='new-password' />
              </Form.Group>
              <Form.Group className='d-grid gap-2'>
                <Button variant="success" onClick={() => Register()}>Sign up</Button>
              </Form.Group>
              <Form.Group className='d-grid gap-2 mt-2'>
                <Button variant="outline-dark" onClick={SignInWithGoogle}><Google className='me-1 mb-1' ></Google>Sign up with google </Button>
              </Form.Group>
              <Card.Text>
                {userInfo.Password !== userInfo.ConfirmPassword ? 'Password do not match' : ''}
              </Card.Text>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container >
  );
}
