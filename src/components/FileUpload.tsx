import React from 'react';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const FileUpload = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [fileList, setFileList] = useState<FileList | null>(null);
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFileList(e.target.files);
    };
  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

    const handleUploadClick = () => {
        if (!fileList) {
          return;
        }
    
        // 👇 Create new FormData object and append files
        // const data = new FormData();
        // files.forEach((file, i) => {
        //   data.append(`file-${i}`, file, file.name);
        // });
    
        const data = new FormData();
        files.forEach((file, i) => {
              data.append(`file-${i}`, file, file.name);
            });
        console.time('Loading time')
        // 👇 Uploading the files using the fetch API to the server
        fetch('https://webapp-decom-demo.azurewebsites.net/upload', {
         
          method: 'PUT',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',                 
            'Accept': '*/*',
           'host': "http://localhost:3000/",
            "Access-Control-Origin": "*"
          }
          
        })
          .then((res) => res.json())
          .then((data) =>{ console.log(data);  console.timeEnd('Loading time')})
          .catch((err) => console.error(err));
          
      };
  return (
    <div>
        <Modal show={show} onHide={handleShow} centered>
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
          {/* <ProgressBar striped variant="success" now={now} label={`${now}%`} /> */}
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
  )
}

export default FileUpload