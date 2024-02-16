import Nav from 'react-bootstrap/Nav';
import FileUpload from './FileUpload';
import { useState } from 'react';

type Props = {}

const LeftNav = (props: Props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <div className='d-flex left'>
      <FileUpload />
      <Nav fill variant="tabs" defaultActiveKey="home" className='scale-up-ver-center' >
        <Nav.Item>
        <Nav.Link eventKey="home">Gen AI - DECOM</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Summarization</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3">Enhance</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-4">Recommend</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" >
        Document Generation 
        </Nav.Link>
      </Nav.Item>
    </Nav>
    <div className='border-top'>
      <Nav fill variant="tabs" className='scale-up-ver-center' >
        <Nav.Item>
        <Nav.Link  onClick={handleShow}>File Explorer</Nav.Link>
      </Nav.Item>
      </Nav>      
    </div>
    
  </div>
  )
}
export default LeftNav