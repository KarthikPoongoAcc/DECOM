import "./Summarization.scss";
import xls from "../assets/images/icons/xls.png";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { Dropdown } from 'semantic-ui-react'
 import DonutChart from './DonutChart.js';
 import uploadimg from "../assets/images/icons/download-arrow-icon.svg";


type Props = {}
const obj:any = [];
const Summarization = (props: Props) => {
  const [downloadfile, setdownloadfile] = useState(false);
  const [selected, setSelected] = useState([]);
  const [fileName, setFilename] = useState('');
  const [blob, setblob] = useState();

  useEffect(() => {
    fetch("https://webapp-decom-demo.azurewebsites.net/available-cmdbs",{
      method: 'get'
    })
      .then((response) => response.json())
      .then((data) =>
      setSelected(
          data.list_of_cmdbs.map((x:any, i:any) => {
            return { key: i, text: x, value: x };
          })
        )
      );
  }, []);



var download = require('js-file-download');

const SelectCMDb= (e:any) =>{
  console.log(e.target.textContent)
  setFilename(e.target.textContent);
 setdownloadfile(true);
  return(e.target.textContent)
}

const Downloadsummary = () =>{
  const formData = new FormData();
  formData.append("cmdb_folder", fileName);
 fetch('https://webapp-decom-demo.azurewebsites.net/summarize', {
   method: 'post',
   body: formData,
   
 }).then(function(resp) {
  // const filename =  resp.headers.get('Content-Disposition').split('filename=')[1];
 
  console.log(resp);
   return resp.blob();
 }).then(function(blob) {
   console.log(blob)
   
   return download(blob, "Processed_" + fileName + ".xlsx");
 });
}
const donutData = [
 {name: "<5", value: 80},
 {name: "5-9", value: 20},
];

function Datalist(){
  return(
    <><div className="d-flex selector">

{/* {selected && ( */}
<Dropdown
placeholder="Select CMDB"
search
selection
options={selected}
onChange ={SelectCMDb}
/> 
{/* )} */}
  <div>
  {/* <Button type="submit" onClick={StartSummrise}>Summarize</Button> */}
  </div>
  
</div></>
  )
}
function Download(){
  return(<> <div>
    <h4>{fileName} Summarized Data</h4>
  </div>
  <div className="text-center">
  <DonutChart data={donutData}  /> 
  </div>
  <div className="text-end">
  <Button variant="primary" onClick={Downloadsummary} >
     <img src={uploadimg} width={25} alt="upload" className="btn-icon"/>Download
    </Button>
  </div></>)
}
  return (
    <div className='container-block'>
      <div className='container-block-bg'>
       <h1>Summarization</h1>
        <div className="desc">
          <ul>
            <li>Distill essential details from client documents into concise summaries.</li>
            <li>Provide streamlined representations of information for easier understanding and accessibility.</li>
            <li>Facilitate efficient decision-making and resource management.</li>
          </ul>
          </div>
          <Datalist/>
          { downloadfile && <Download /> }
        
       
      </div>
    
        {/* <iframe width={1000} height={500} src="https://docs.google.com/spreadsheets/d/1NXxpCGF9WRw7qtpE2tQtkguVu5yMPQImouGnibyQFl0/edit?usp=sharing"></iframe> */}
    </div>
  )
}

export default Summarization