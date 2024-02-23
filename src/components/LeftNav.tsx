import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import FileUpload from './FileUpload';

import { Outlet, Link } from "react-router-dom";
import logo from "../assets/images/logobg.png";
import "./LeftNav.scss";

import dashboard from "../assets/images/dashboard.svg";
import genrate from "../assets/images/doc-on-doc.svg";
import recom from "../assets/images/document-filter.svg";
import enrich from "../assets/images/document-add.svg";
import summarize from "../assets/images/additem.svg";
import settings from "../assets/images/document-settings.svg";
type Props = {
  
}

const LeftNav = (props: Props) => {
  const [showLogin, setShowLogin] = useState(false);
  return (

    <div className='d-flex left'>
      <div>
     <div className="logo border-top">
        <img src={logo} alt="logo" width={40}/>
        <div className="logo-text primary-color">
            APR Assistant
          </div>
     </div>
      <Nav fill variant="tabs" defaultActiveKey="/" className='scale-up-ver-center' >
        <Nav.Item>
        <Nav.Link eventKey="/" as={Link} to="/" ><img src={dashboard} width={30} alt="dashboard" />Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item  >
        <Nav.Link eventKey="/summarization" as={Link} to="/summarization" ><img src={summarize} width={30} alt="dashboard" />Summarization</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/enhance" as={Link} to="/enhance" ><img src={enrich} width={30} alt="dashboard" />Enrich</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/recommend" as={Link} to="/recommend"><img src={recom} width={30} alt="dashboard" />Recommend</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/docgeneration" as={Link} to="/docgeneration" >
        <img src={genrate} width={30} alt="dashboard" />Document Generation 
        </Nav.Link>
      </Nav.Item>
    </Nav>
    <Outlet />
    </div>
    <div className='border-top'>
      <Nav fill variant="tabs" className='scale-up-ver-center' >
        <Nav.Item>
        <Nav.Link onClick={() => setShowLogin(true)}><img src={settings} width={30} alt="dashboard" />File Management</Nav.Link>
      </Nav.Item>
      </Nav>      
      <FileUpload show={showLogin} close={() => setShowLogin(false)} />
    </div>
    
  </div>
  )
}
export default LeftNav