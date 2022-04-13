import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

export default function App() {
  return (
    <div >
      <Navbar expand="lg" variant="light" bg="light" >
        <Container className='justify-content-between'>
          <Navbar.Brand href="/">DHROSE</Navbar.Brand>
          <div>
            <Nav.Item className='d-inline-flex'>
              <Nav.Link href="/login" className='btn btn-primary btn-sm text-light'>Log in</Nav.Link>
            </Nav.Item>
            <Nav.Item className='d-inline-flex'>
              <Nav.Link href='/signup' className='btn'>Sign up</Nav.Link>
            </Nav.Item>
          </div>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

