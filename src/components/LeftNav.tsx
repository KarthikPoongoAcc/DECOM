import Nav from 'react-bootstrap/Nav';

type Props = {}

const LeftNav = (props: Props) => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link eventKey="link-3">Summarization</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-1">Enhance</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-2">Recommend</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="disabled" >
      Doc Generation 
      </Nav.Link>
    </Nav.Item>
  </Nav>
  )
}
export default LeftNav