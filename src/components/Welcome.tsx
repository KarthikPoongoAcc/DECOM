import React from 'react'
import "./Welcome.scss";
import modal from "./ModalPopup";
type Props = {}

const Welcome = (props: Props) => {
  return (
    <div className='welcome-text'>
        <h1>Welcome to the <span className='primary-color'>Gen AI - DECOM</span></h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div className="linkWrap">
          <button className="link style-7">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Upload files</span>
          </button>
        </div>
    </div>
  )
}
export default Welcome