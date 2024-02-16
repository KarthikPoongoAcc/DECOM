import "./Topheader.scss";
import logo from "../assets/images/Accenture.svg";
import Modal from "./ModalPopup";

type Props = {}

const Topheader = (props: Props) => {
  return (
    <div>
      
    <header>
      <div className='d-flex top-header'>
          <img src={logo} className="top-header--logo" alt="logo" />
          <div className="logo-text primary-color">
            Gen AI - DECOM
          </div>
         
      </div>
    </header>
   {/* <Modal/> */}
    </div>
    
  )
}

export default Topheader