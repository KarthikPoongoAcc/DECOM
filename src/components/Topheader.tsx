import "./Topheader.scss";
import logo from "../assets/images/Accenture.svg";
type Props = {}

const Topheader = (props: Props) => {
  return (
    <div className="header-container">
      
    <header>
      <div className='d-flex top-header'>
          <img src={logo} className="top-header--logo" alt="logo" />
          <div className="logo-text primary-color">
            APR Assistant
          </div>
         
      </div>
    </header>
   {/* <Modal/> */}
    </div>
    
  )
}

export default Topheader