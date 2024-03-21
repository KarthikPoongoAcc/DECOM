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
import { useTree, CellTree } from '@table-library/react-table-library/tree';

type Props = {
  id: any;
  idchange?: (newType: any) => void;
};
const list = [
    {
      id: "1",
      CMDBfileName: "CMDB_NICApplication",
      deadline: new Date(2020, 1, 17),
      type: "In-Progress",
      isComplete: true,
    }
  ];

const ExistingList = ({ id, idchange }:Props) => {
 

    const [selected, setSelected] = useState([]);
    const [spinner, setSpinner] = useState(false);  
    const [selectedfile, setSelectedfile] = useState('');
    const [processfiles, setProcessfiles] = useState(false);  
    
    const [selected1, setSelected1] = useState([]);
    const [uploadlist, setUploadedList] = useState<any[]>([]);
    const [seleteduploadlist, setSeltedUploadedList] = useState({ nodes: [] });
    const [selectedid, setSelectedID] = useState("");


    useEffect(() => {
      id="hello";
      console.log(id);
    setSpinner(true);
    fetch("https://webapp-decom-demo.azurewebsites.net/download-cmdb", {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        // setSelected1(
        //   data.list_of_cmdbs.map((x: any, i: any) => {
        //     return { key: i, text: x, value: x };
        //   })
        // );
         let completeddata : any = [];
        setUploadedList(data);
        for(let i=0; i<data.length; i++){
          if(data[i].summary_status === "Completed"){
            completeddata.push(data[i]);
          }
        }
        console.log(data);
        console.log(completeddata);
        setSelected1(
          completeddata.map((x: any, i: any) => {
              return { key: i, text: x.cmdb_file_name, value: x.cmdb_file_name };           
          })
        );
        setSpinner(false);
      });
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


  const Getfilename = (e: any) => {
    setProcessfiles(true);
    console.log(uploadlist);
    console.log(uploadlist);
   // value = selectedfile;
    //let dataselected = {nodes: []};
    uploadlist.forEach((file, i) => {
      
      if(file.cmdb_file_name === e.target.textContent ){
        console.log(file.cmdb_file_name)
        setSeltedUploadedList(file);
        setSelectedID(file.id);
        idchange?.(e.target.value);
        id = file.id;
      }
    });
    
    console.log(e.target.textContent)
    setSelectedfile(e.target.textContent);

  };
  function Tablelist() {
    console.log(seleteduploadlist);
    const tree = useTree(seleteduploadlist, {
      state: {
        ids: ['6', '7', '5'],
      },
      onChange: onTreeChange,
    },
    
     {
      treeIcon: {
        size: "10px",
      },
    });
    function onTreeChange(action:any, state:any) {
      console.log(action, state);
    }
    const data = { nodes: [seleteduploadlist] };
    console.log(data);
    return (
      
      <>
        <Table data={data} tree={tree}  >
          {(tableList: any) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>CMDB Name</HeaderCell>
                  <HeaderCell className="text-center">
                    Download Raw Files
                  </HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((list: any) => (
                  <Row key={list.id} item={list}>
                    { list.cmdb_id !== undefined ? 
                      <Cell >{list.file_name}</Cell > : 
                     <>{list.supporting_files_count !== 0 ?
                        <CellTree item={list}>{list.cmdb_file_name}</CellTree > :
                        <Cell item={list}>{list.cmdb_file_name}</Cell >
                      }</> 
                     
                    }
                   
                
                    {list.cmdb_file_url !== undefined ? 
                  <Cell className="text-center"> <a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.cmdb_file_url } title="download" target='_blank'><img src={downloadraw} width={24} alt="download"/></a></Cell>
                  :
                  <Cell className="text-center"> <a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.url } title="download" target='_blank'><img src={downloadraw} width={24} alt="download"/></a></Cell>

                  }
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        <div>
          <Button variant="primary" onClick={Summarization}>
            <img src={summarize} width={25} alt="upload" className="btn-icon" />
            Begin Enrich
          </Button>
        </div>
      </>
    );
  }
  return (
    <div>
        <h2>Summarized CMDB</h2>
        <div className='d-flex align-items-center'>
            <label className='w-50'>Select Uploaded File</label> 
           <Dropdown
              placeholder="Select Uploaded CMDB file"
              fluid
              search
              selection
              onChange ={Getfilename}
              options={selected1}
              loading={spinner}
              value={selectedfile}
            />
        </div>
        <div>{processfiles? <Tablelist /> : ""}</div>
    </div>
  )
}

export default ExistingList