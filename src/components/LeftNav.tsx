import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';

import { Outlet, Link } from "react-router-dom";
import logo from "../assets/images/logobg.png";
import "./LeftNav.scss";

import dashboard from "../assets/images/dashboard.svg";
import genrate from "../assets/images/doc-on-doc.svg";
import recom from "../assets/images/document-filter.svg";
import enrich from "../assets/images/document-add.svg";
import summarize from "../assets/images/additem.svg";
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
        Portfolio Rationalization Assistant
          </div>
     </div>
      <Nav fill variant="tabs" className='scale-up-ver-center' defaultActiveKey={window.location.pathname}>
        <Nav.Item>
        <Nav.Link eventKey="/" as={Link} to="/"><img src={dashboard} width={30} alt="Status" />Status</Nav.Link>
      </Nav.Item>
      <Nav.Item  >
        <Nav.Link eventKey="/summarization" as={Link} to="/summarization"><img src={summarize} width={30} alt="Summarize" />Summarize</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/enrich" as={Link} to="/enrich"><img src={enrich} width={30} alt="Enrich" />Enrich</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/recommend" as={Link} to="/recommend"><img src={recom} width={30} alt="Recommend" />Recommend</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/docgeneration" as={Link} to="/docgeneration" >
        <img src={genrate} width={30} alt="docgeneration" />Document Generation 
        </Nav.Link>
      </Nav.Item>
      
          {/* <a href={"https://ttid-demo.accenture.com/decom/"} target='_blank' className="nav-link" rel='noreferrer'>
            <img src={genrate} width={30} alt="Document Generation " />Document Generation 
          </a> */}

     
    </Nav>
    <Outlet />
    </div>
    {/* <div className='border-top'>
      <Nav fill variant="tabs" className='scale-up-ver-center' >
        <Nav.Item>
        <Nav.Link onClick={() => setShowLogin(true)}><img src={settings} width={30} alt="Status" />File Management</Nav.Link>
      </Nav.Item>
      </Nav>      
      <FileUpload show={showLogin} close={() => setShowLogin(false)} />
    </div> */}
    
  </div>
  )
}
export default LeftNav