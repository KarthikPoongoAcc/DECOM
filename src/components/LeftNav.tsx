import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import FileUpload from './FileUpload';

import { Outlet, Link } from "react-router-dom";

type Props = {
  
}

const LeftNav = (props: Props) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className='d-flex left'>
     
      <Nav fill variant="tabs" defaultActiveKey="/" className='scale-up-ver-center' >
        <Nav.Item>
        <Nav.Link eventKey="/" as={Link} to="/" >Available Options</Nav.Link>
      </Nav.Item>
      <Nav.Item  >
        <Nav.Link eventKey="/summarization" as={Link} to="/summarization" >Summarization</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/enhance" as={Link} to="/enhance" >Enhance</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/recommend" as={Link} to="/recommend">Recommend</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/docgeneration" as={Link} to="/docgeneration" >
        Document Generation 
        </Nav.Link>
      </Nav.Item>
    </Nav>
    <Outlet />
    <div className='border-top'>
      <Nav fill variant="tabs" className='scale-up-ver-center' >
        <Nav.Item>
        <Nav.Link onClick={() => setShowLogin(true)}>File Management</Nav.Link>
      </Nav.Item>
      </Nav>      
      <FileUpload show={showLogin} close={() => setShowLogin(false)} />
    </div>
    
  </div>
  )
}
export default LeftNav