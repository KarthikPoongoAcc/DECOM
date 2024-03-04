import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
  } from "@table-library/react-table-library/table";
import { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import downloadraw from "../assets/images/icons/download-file.svg";
import { Button, Form } from "react-bootstrap";
import summarize from "../assets/images/additem.svg";

type Props = {}

const list = [
    {
      id: "1",
      CMDBfileName: "CMDB_NICApplication",
      deadline: new Date(2020, 1, 17),
      type: "In-Progress",
      isComplete: true,
    }
  ];

const ExistingList = (props: Props) => {
    
    const [selected, setSelected] = useState([]);
    const [spinner, setSpinner] = useState(false);  
    const [selectedfile, setSelectedfile] = useState('');
    const [processfiles, setProcessfiles] = useState(false);  
    

    useEffect(() => {
    setSpinner(true);
    fetch("https://webapp-decom-demo.azurewebsites.net/available-cmdbs",{
      method: 'get'
    })
      .then((response) => response.json())
      .then((data) =>{
      setSelected(
          data.list_of_cmdbs.map((x:any, i:any) => {
            return { key: i, text: x, value: x };
          })
        );
        setSpinner(false);
      }
      );
  }, []);

var fileDownload = require('js-file-download');
  const Summarization = () =>{
    const formData = new FormData();
    formData.append("cmdb_folder", selectedfile);
    setSpinner(true);
   fetch('https://webapp-decom-demo.azurewebsites.net/summarize', {
     method: 'post',
     body: formData,
     
   }).then(function(resp) {
    //const filename =  resp.headers.get('Content-Disposition').split('filename=')[1];
    setSpinner(false);
    console.log(resp);
     return resp.blob();
   }).then(function(blob) {
     console.log(blob)
     setSpinner(false);
     fileDownload(blob, "Processed_" + selectedfile + ".xlsx");
   });
  }


  const Getfilename = (e:any) =>{
    setProcessfiles(true);
    setSelectedfile(e.target.textContent);
  }
  function Tablelist(){
    const data = { nodes: list }
    return(<>
        <Table data={data}>
            {(tableList:any) => (
              <>
              <Header>
                <HeaderRow>
                  <HeaderCell>CMDB Name</HeaderCell>                
                  <HeaderCell className="text-center">Download Raw Files</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                   {tableList.map((list:any) => (
                <Row key={list.id} item={list}>
                  <Cell>{selectedfile}</Cell>
                 
                  <Cell className="text-center"><a href=""><img src={downloadraw} width={24} /></a></Cell>
                </Row>
              ))}
              </Body>
              </>
              
            )}
          </Table>
          <div>
          <Button variant="primary" onClick={Summarization} >
        <img src={summarize} width={25} alt="upload" className="btn-icon" />
        Summarization
      </Button>
          </div>
       </>)
  }
  return (
    <div>
        <h2>Existing CMDB</h2>
        <div className='d-flex align-items-center'>
            <label className='w-50'>Select Uploaded File</label> 
            <Dropdown
                    placeholder='Select Uploaded CMDB file'
                    fluid
                    search
                    selection onChange={Getfilename}
                    options={selected}
                    loading={spinner}
                />
        </div>
        <div>{processfiles? <Tablelist /> : ""}</div>
    </div>
  )
}

export default ExistingList