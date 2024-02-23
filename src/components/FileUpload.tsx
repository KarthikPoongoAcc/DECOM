import axios from "axios";
import { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import info from "../assets/images/icons/info.png";
import uploadimg from "../assets/images/icons/upload-arrow-icon.svg";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import "./FileUpload.scss";
import excel from "../assets/images/icons/xls.png";
import { useNavigate } from "react-router-dom";

const renderTooltip = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
   CMDB filename starts with "CMDB_PROJECT_NAME.xlsx"
  </Tooltip>
);

const renderTooltip2 = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
   Filename starts with "CMDB_PROJECT_NAME.xlsx"
  </Tooltip>
);
const data:any = [];
const FileUpload = (props: any) => { 
  const navigate = useNavigate();
  const [showupload, setShowshowupload] = useState(true);
  const [showmultipleupload, setShowmultipleupload] = useState(true);
  // eslint-disable-next-line
  const [showResults, setShowResults] = useState(false);

  const [fileList, setFileList] = useState<FileList | null>(null);

  const [ofileList, setOFileList] = useState<FileList | null>(null);

  const [spinner, setSpinner] = useState(false);   

  const [errormsg, setErrormsg] = useState("");

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  const ofiles = ofileList ? [...ofileList] : [];
  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  // const selectedFile = e.target.files[0];
 
    
    let filename = (e.target.value).split('\\');
    let filen = filename[2].split('_');
    let fileext = filename[2].split('.');
    console.log(filen[0]);
    setFileList(e.target.files);
    
   data.push(e.target.files);
    if(e.target.files){
      console.log(fileext[1]);
      if(filen[0]=="CMDB"){
        if(fileext[1]=="xlsx" || fileext[1]=="csv" || fileext[1]=="xls"){
        setShowshowupload(false);
        setShowResults(true);
        }
        else{
          setErrormsg("File extension is not matching the criteria.");
        }
      }
      else{
        setErrormsg("File name is not matching the criteria.");
      }
    }
    
   
    //const type =(e.target.accept).split(",");
    
   
  };

  
  const ohandleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const selectedFile = e.target.files[0];
   
    setShowmultipleupload(false);
      console.log((e.target.accept).split(","));
      setOFileList(e.target.files);
      console.log(e.target.files);
      // for (let i = 0; i < e.target.files?.length; i++) {
        
      // }
     data.push(e.target.files);
      if(e.target.files){
        setShowResults(true);
      }
      console.log(showResults);
     
      //const type =(e.target.accept).split(",");
      
      
    };
  const UploadCMDB = (event: any) => {
    // get the selected file from the input     
    event.preventDefault();       
    // Checking if the file has been selected
    if (!fileList) {        
      return;
    }
    setSpinner(true);
    const file = fileList[0];  
      
    console.log(data);
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("cmdbs", file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .put("https://webapp-decom-demo.azurewebsites.net/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-rapidapi-host": "webapp-decom-demo.azurewebsites.net",
          "x-rapidapi-key": "TestKey",
        },
      })
      .then((response) => {
    // handle the response
        console.log(response);
        setSpinner(false);
        navigate('/summarization');
        props.close = true;
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  function CMDBUpload() {      
    return(
    <Form.Group controlId="formFileMultiple" className="mb-3 file-area">
    <Form.Label>Upload CMDB file.   
      <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
      ><span><img src={info} width={16} alt="info" className="mx-2"/></span>
      </OverlayTrigger> 
      <span className="mandatory">*</span>
    </Form.Label>
    <Form.Control className="cmdb" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleFileChange} />
    <p className="error"> {errormsg}</p>
  </Form.Group>
    )
  }

  function Filelist() {   
  
    return(
      <div className='d-flex list-files'>
      <div>CMDB File:</div>
    <ul className="list-group">
    {files.map((file, i) => (
      <li key={i} className='list-group-item'>
        <img src={excel} width={25} alt="file"/>  {file.name};       
        
      </li>
    ))} 
  </ul>
  
  </div>
    )
  }

  function Filelist2() {   
    console.log(data);
    return(
      <div className='d-flex list-files'>
      <div>Supporting Files:</div>
    <ul className="list-group">
    {ofiles.map((file, i) => (
      <li key={i} className='list-group-item'>
        <img src={excel} width={25} alt="file"/>  {file.name};       
        
      </li>
    ))} 
  </ul>
  </div>
    )
  }

  function UploadOther() {      
    return(
    <Form.Group controlId="formFileMultiple" className="mb-3 file-area">
    <Form.Label>Upload Other Supporting Files.  
      <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip2}
      ><span><img src={info} width={16} alt="info" className="mx-2"/></span>
      </OverlayTrigger> 
    </Form.Label>
    <Form.Control type="file" onChange={ohandleFileChange} multiple />
    <div className="file-dummy">
      <div className="default">Upload supporting files </div>
    </div> 
  </Form.Group>
    )
  }
  
 

  return (
    <div>
        <Modal show={props.show} centered  size="lg" onHide ={props.close}>
        <Modal.Header closeButton >
          <Modal.Title>File Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex '>
            { showupload ? <CMDBUpload /> : <Filelist /> }           
          </div>
          { !showupload ?
            <div className='d-flex border-top pt-3'>         
            { showmultipleupload ? <UploadOther /> : <Filelist2 /> }
            </div> : ""
          }
          
          {/* <ProgressBar striped variant="success" now={now} label={`${now}%`} /> */}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={props.close}>
            Close
          </Button>      */}
          <Button variant="primary" onClick={UploadCMDB} >
           <img src={uploadimg} width={25} alt="upload" className="btn-icon"/>Upload
          </Button>
          
        </Modal.Footer>
        {spinner && (
        <div className="spinner">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        )}
      </Modal>
      
    </div>
  ); 
}

export default FileUpload