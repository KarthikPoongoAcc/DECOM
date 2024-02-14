import React from 'react';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import "./ModalPopup.scss";
import xls from "../assets/images/icons/xls.png";
import visio from "../assets/images/icons/microsoft-visio-icon.png";
import uploadbtn from "../assets/images/icons/upload.png";
import LeftNav from './LeftNav';

type Props = {}

const ModalPopup = (props: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };
  const now = 60;
  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    // 👇 Create new FormData object and append files
    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    console.time('Loading time')
    // 👇 Uploading the files using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) =>{ console.log(data);  console.timeEnd('Loading time')})
      .catch((err) => console.error(err));
      
  };

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];


  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
         <div className="nav-bar">
    {isOpen && <LeftNav/>}
    <div className='file-bar'>
    <button onClick={toggle} className='scale-up-ver-center'>Toggle show</button>
      <div className='files'>
        <div className='file-bar--icons'>
         <img src={xls} className='file-bar--icon' title='FileName.xls'/>
         <span className='file-bar--count'>2</span>
        </div>
        <div className='file-bar--icons'>
         <img src={visio} className='file-bar--icon' title='FileName.visio'/>
       
        </div>
      </div>
      <div className='upload'>
      <Button variant="primary" className='uploadbtn' onClick={handleShow}>
      <img src={uploadbtn} className='uploadbtn--icon'></img>
          Upload Documents
        </Button>
        </div>
    </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFileMultiple" className="mb-3 file-area">
            <Form.Label>Upload multiple files. </Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
            <div className="file-dummy">
              {/* <div className="success">Great, your files are selected. Keep on.</div> */}
              <div className="default">Click box to upload</div>
          </div>
          
          <ul>
            {files.map((file, i) => (
              <li key={i}>
                {file.name} - {file.type}
              </li>
            ))}
          </ul>
          
          </Form.Group>
          <button onClick={handleUploadClick}>Upload</button>
          <ProgressBar striped variant="success" now={now} label={`${now}%`} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleClose}>
           Validate
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
   
  );
}

export default ModalPopup

