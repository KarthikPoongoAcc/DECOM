import { useState } from "react";
import "./Welcome.scss";
import FileStatus from "./FileStatus";
// import FileUpload from "./FileUpload";
type Props = {}
const Welcome = (props: Props) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    <div className='container-block'>
      <div className='container-block-bg white'>
        <div className='welcome-text'>
            <h1>Welcome to <span className='primary-color'>The APR Assistant</span></h1>
            <p>The GenAI-enabled APR Assistant serves as a consolidated platform, offering innovative and transformative possibilities for re-envisioning the decommissioning process to align with the requirements of the clients.</p>
                {/* <div className="linkWrap">
              <button className="link style-7" onClick={() => setShowLogin(true)}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text" >Upload files</span>
              </button>
            </div> */}
            {/* <FileUpload show={showLogin} close={() => setShowLogin(false)} /> */}
        </div>
      </div>
    </div>
    <FileStatus />
    </>

  )
}
export default Welcome