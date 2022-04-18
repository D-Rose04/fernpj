import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Container, Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import UploadSection from './components/Upload/UploadSection';
import { useFireContext } from './firebaseSetUp/context/FireBaseContext';
import { DoorOpenFill, Upload } from 'react-bootstrap-icons';

export default function App() {
  const { currUser, SignOut } = useFireContext();
  const handleLogOut = () => {
    SignOut();
    window.location.reload();
  }
  return (
    <div >
      <Navbar expand="lg" variant="light" bg="light" >
        <Container className='justify-content-between'>
          <Navbar.Brand href="/">DHROSE</Navbar.Brand>
          <Nav.Item className='d-inline-flex '>
            {currUser && currUser.uid ? 
              <div style={{ display: 'flex' }}>
                <p style={{ margin: '10px' }}>{currUser.displayName}</p>
                <DropdownButton id="dropdown-item-button" className='mt-1' variant='light' title=''>
                  <Dropdown.Item as="button" className='d-flex justify-content-between' onClick={() => handleLogOut()} >Log out <DoorOpenFill className='mt-1' ></DoorOpenFill> </Dropdown.Item>
                </DropdownButton>
              </div> :
              <Nav.Link href="/login" className='btn btn-primary btn-sm text-light'>Log in</Nav.Link>
            }
            <Nav.Link href="/upload" className='btn btn-success btn-sm text-light ms-2'>Upload <Upload className='ms-2 mb-1'></Upload></Nav.Link>
          </Nav.Item>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={currUser && currUser.uid ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={currUser && currUser.uid ? <Navigate to='/' /> : <Signup />} />
          <Route path='/upload' element={<UploadSection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

