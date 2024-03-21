import { useTree, CellTree } from '@table-library/react-table-library/tree';
import { useEffect, useState,useCallback } from 'react';
import downloadprocessed from "../assets/images/icons/file-download-alt.svg";
import downloadraw from "../assets/images/icons/download-file.svg";
import reload from "../assets/images/icons/reload.svg";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,useCustom
} from "@table-library/react-table-library/table";

import "./FileStatus.scss";
import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {}

const FileStatus = (props: Props) => {
  const [data, setData] = useState({ nodes: [] }); 
  const [spinner, setSpinner] = useState(true);
  const [nodata, setNoData] = useState(""); 
    // const fetchTitle = async (params:any) => {
    
    //      fetch("https://webapp-decom-demo.azurewebsites.net/download-cmdb", {
    //   method: "get",
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //    console.log(data);
    //    //if(data.length === 0 || data.length === undefined){
    //     setNoData("Files are not available");
    //    //}
    //     setData({ nodes:  data});
    //     setSpinner(false);
    //     //setSpinner(false);
    //   }).catch((error) => {   
    //     setSpinner(false);    
    //     console.log(error);
    //   });
    
    // }
    // useEffect(() => { 
    
    //   fetchTitle({});
    // },[fetchTitle]);
 
    useEffect(() => {
      setSpinner(true);
      fetch("https://webapp-decom-demo.azurewebsites.net/download-cmdb", {
        method: "get",
      })
      .then((response) => response.json())
      .then((data) => {
       console.log(data);
       //if(data.length === 0 || data.length === undefined){
        setNoData("Files are not available");
       //}
        setData({ nodes:  data});
        setSpinner(false);
        //setSpinner(false);
      }).catch((error) => {   
        setSpinner(false);    
        console.log(error);
     
        });
      }, []);
  
      const status = () =>{
        setSpinner(true);
      fetch("https://webapp-decom-demo.azurewebsites.net/download-cmdb", {
        method: "get",
      })
      .then((response) => response.json())
      .then((data) => {
       console.log(data);
       //if(data.length === 0 || data.length === undefined){
        setNoData("Files are not available");
       //}
        setData({ nodes:  data});
        setSpinner(false);
        //setSpinner(false);
      }).catch((error) => {   
        setSpinner(false);    
        console.log(error);
     
        });
      }
  // features

  const [search, setSearch] = useState("");

  const handleSearch = (event:any) => {
    setSearch(event.target.value);
  };

  const data1 = {
    nodes: data.nodes.filter((item:any) =>
      item.cmdb_file_name.toLowerCase().includes(search.toLowerCase())
    ),
  };

  useCustom("search", data1, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action:any, state:any) {
    console.log(action, state);
  }

  const tree = useTree(data1, {
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
  const tooltip = (
    <Tooltip id="tooltip">
      <strong>Reload the status table</strong>
    </Tooltip>
  );
  return (
    // <></>
    <div>
        <div className='container-block'>
            <div className='container-block-bg white position-relative'>
              
            
            {/* <CompactTable columns={COLUMNS} data={data} tree={tree} sort={sort}/> */}
            {(data1.nodes.length === 0 ||  data1.nodes.length === null ) ? <h4 className='m-4 text-center'>{nodata}</h4>
            :
            <>
            <div className='d-flex justify-content-end'>
            <label htmlFor="search" className='searchfield'>
              Search by CMDB File Name:&nbsp;
              <input id="search" type="text" value={search} onChange={handleSearch} placeholder='Search' />
            </label>
            <span className='borderstrip'></span>
            <OverlayTrigger placement="top" overlay={tooltip}>
            <button className='btn' onClick={status}><img src={reload} width={24} alt="Reload the status table"/></button>
    </OverlayTrigger>
          
            </div>
      <br /> 
      <Table data={data1} tree={tree}>
            {(tableList:any) => (
              <>
              <Header>
                <HeaderRow>
                  <HeaderCell>CMDB Name</HeaderCell>
                  <HeaderCell>Uploaded Date</HeaderCell>
                  <HeaderCell className="text-center">CMDB Status</HeaderCell>
                  <HeaderCell className="text-center">File Download</HeaderCell>
                  {/* <HeaderCell className="text-center">Download Raw Files</HeaderCell>
                  <HeaderCell className="text-center">Summarization Status</HeaderCell>                  
                  <HeaderCell className="text-center">Download Processed Files</HeaderCell>
                  <HeaderCell className="text-center">Enrich Status</HeaderCell>                  
                  <HeaderCell className="text-center">Download Enrich Files</HeaderCell>
                  <HeaderCell className="text-center">Recommend Status</HeaderCell>                  
                  <HeaderCell className="text-center">Download Recommend Files</HeaderCell> */}
                </HeaderRow>
              </Header>
              <Body>
                   {tableList.map((list:any) => (
                  
                <Row key={list.id} item={list}>
                  
                  { list.cmdb_id !== undefined ? 
                      <Cell >{list.file_name}</Cell > : 
                     <>{list.supporting_files_count !== 0 ?
                        <CellTree item={list}>{list.cmdb_file_name}</CellTree > :
                        <Cell item={list}>{list.cmdb_file_name}</Cell >
                      }</> 
                     
                    }
                  <Cell>{moment(list.uploaded_time).format('DD/MMM/YYYY')}</Cell>


                  {list.summary_status === undefined && <Cell className="text-center"></Cell>}
                  {list.summary_status === "Not Yet Initiated" && <Cell className="text-center green"><span>Uploaded</span></Cell>}
                  {list.summary_status === "Processing" && <Cell className="text-center orange"><span>Summarize Initiated <span><span className="dot-one"> .</span>
                     <span className="dot-two"> .</span>
                     <span className="dot-three"> .</span></span></span></Cell>}
                  {list.summary_status === "Error" && <Cell className="text-center red"><span>Error on Summarize</span></Cell>}

                  {list.summary_status === "Completed" ? 
                 
                   
                    (list.enrich_status === "Not Yet Initiated" || list.enrich_status === null) ?
                     <Cell className="text-center green"><span>Summarize Complete</span></Cell> :
                    list.enrich_status === "Processing" ?
                     <Cell className="text-center orange"><span>Enrich Initiated <span><span className="dot-one"> .</span>
                     <span className="dot-two"> .</span>
                     <span className="dot-three"> .</span></span></span></Cell> :
                    list.enrich_status === "Error" ?
                     <Cell className="text-center red"><span>Error on Enrich</span></Cell> :
                   list.enrich_status === "Completed" ?
                    
                   (list.apr_status === "Not Yet Initiated" || list.apr_status === null) ?
                   <Cell className="text-center green"><span>Enrich Complete</span></Cell> :
                  list.apr_status === "Processing" ?
                   <Cell className="text-center orange"><span>Recommend Initiated <span><span className="dot-one"> .</span>
                   <span className="dot-two"> .</span>
                   <span className="dot-three"> .</span></span></span></Cell> :
                  list.apr_status === "Error" ?
                   <Cell className="text-center red"><span>Error on Recommend</span></Cell> :
                 list.apr_status === "Completed" ?
                  <Cell className="text-center green"><span>Recommend Complete</span></Cell> :
                 "" : 
                   "" : ""
                  }
                  

                  
                  
                  {list.summary_status === undefined && <Cell className="text-center"><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.url } title={"Download raw: " + list.file_name} target='_blank'><img src={downloadraw} width={24} alt="Download "/></a></Cell>}
                  {(list.summary_status === "Not Yet Initiated" || list.summary_status === "Processing" ) && <Cell className="text-center"><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.cmdb_file_url } title={"Download raw: " + list.cmdb_file_name} target='_blank'><img src={downloadraw} width={24} alt="Download "/></a></Cell>}
                
                  {list.summary_status === "Error" && <Cell className="text-center"><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.cmdb_file_url } title={"Download raw: " + list.cmdb_file_name} target='_blank'><img src={downloadraw} width={24} alt="Download "/></a></Cell>}

                  {list.summary_status === "Completed" ? 
                 
                   
                    (list.enrich_status === "Not Yet Initiated" || list.enrich_status === null || list.enrich_status === "Processing") ?
                     <Cell className="text-center"><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.processed_cmdb_file_url } title={"Download Summarized: " + list.cmdb_file_name} target='_blank'><img src={downloadraw} width={24} alt="Download "/></a></Cell> :
                   
                    list.enrich_status === "Error" ?
                     <Cell className="text-center"><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.processed_cmdb_file_url } title={"Download raw: " + list.cmdb_file_name} target='_blank'><img src={downloadraw} width={24} alt="Download "/></a></Cell> :
                   list.enrich_status === "Completed" ?
                    
                   (list.apr_status === "Not Yet Initiated" || list.apr_status === null ||  list.apr_status === "Processing" ) ?
                   <Cell className="text-center"><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.enriched_cmdb_file_url } title={"Download Enriched: " + list.cmdb_file_name} target='_blank'><img src={downloadraw} width={24} alt="Download "/></a></Cell> :
                  
                  list.apr_status === "Error" ?
                   <Cell className="text-center"><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.enriched_cmdb_file_url } title={"Download raw: " + list.cmdb_file_name} target='_blank'><img src={downloadraw} width={24} alt="Download "/></a></Cell> :
                 list.apr_status === "Completed" ?
                  <Cell className="text-center"><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.apr_cmdb_file_url } title={"Download Recommended: " + list.cmdb_file_name} target='_blank'><img src={downloadraw} width={24} alt="Download "/></a></Cell> :
                 "" : 
                   "" : ""
                  }

                  {/* {list.cmdb_file_url !== undefined ? 
                  <Cell className="text-center"> <a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.cmdb_file_url } title="download" target='_blank'><img src={downloadraw} width={24} alt="download"/></a></Cell>
                  :
                  <Cell className="text-center"> <a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.url } title="download" target='_blank'><img src={downloadraw} width={24} alt="download"/></a></Cell>

                  }

                  <Cell className="text-center">
                    <span className={list.summary_status === "Processing" ? "orange" :(list.summary_status === "Completed" ? "green" : "red") } >{list.summary_status}
                      <span className={list.summary_status !== "Processing"? "d-none" : ""}>
                        <span className="dot-one"> .</span>
                        <span className="dot-two"> .</span>
                        <span className="dot-three"> .</span>
                      </span>
                    </span>
                    
                  </Cell>   
                  <Cell className={ list.summary_status !=="Completed" ? "text-center disabled" : "text-center" }><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.processed_cmdb_file_url }  className={list.cmdb_id !== undefined ?"d-none" : "" } ><span className='d-none'>{list.cmdb_file_url}</span><img src={downloadprocessed} width={24} /></a></Cell>

                  
                  <Cell className="text-center">
                    <span className={list.enrich_status === "Processing" ? "orange" :(list.enrich_status === "Completed" ? "green" : "red") } >{list.enrich_status}
                      <span className={list.enrich_status !== "Processing"? "d-none" : ""}>
                        <span className="dot-one"> .</span>
                        <span className="dot-two"> .</span>
                        <span className="dot-three"> .</span>
                      </span>
                    </span>
                    
                  </Cell>

                  <Cell className={ list.enrich_status !=="Completed" ? "text-center disabled" : "text-center" }><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.enriched_cmdb_file_url }  className={list.cmdb_id !== undefined ?"d-none" : "" } ><span className='d-none'>{list.cmdb_file_url}</span><img src={downloadprocessed} width={24} /></a></Cell>
                  
                   <Cell className="text-center">
                    <span className={list.apr_status === "Processing" ? "orange" :(list.apr_status === "Completed" ? "green" : "red") } >{list.apr_status}
                      <span className={list.apr_status !== "Processing"? "d-none" : ""}>
                        <span className="dot-one"> .</span>
                        <span className="dot-two"> .</span>
                        <span className="dot-three"> .</span>
                      </span>
                    </span>
                    
                  </Cell>
                  
                  <Cell className={ list.apr_status !=="Completed" ? "text-center disabled" : "text-center" }><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.apr_cmdb_file_url }  className={list.cmdb_id !== undefined ?"d-none" : "" } ><span className='d-none'>{list.cmdb_file_url}</span><img src={downloadprocessed} width={24} /></a></Cell>
                  
                  
                   */}

                </Row>
              ))}
              </Body>
              </>
              
            )}
            </Table>
      {/* <Table data={data1} tree={tree}>
            {(tableList:any) => (
              <>
              <Header>
                <HeaderRow>
                  <HeaderCell>CMDB Name</HeaderCell>
                  <HeaderCell>Uploaded Date</HeaderCell>
                  <HeaderCell className="text-center">Download Raw Files</HeaderCell>
                  <HeaderCell className="text-center">Summarization Status</HeaderCell>                  
                  <HeaderCell className="text-center">Download Processed Files</HeaderCell>
                  <HeaderCell className="text-center">Enrich Status</HeaderCell>                  
                  <HeaderCell className="text-center">Download Enrich Files</HeaderCell>
                  <HeaderCell className="text-center">Recommend Status</HeaderCell>                  
                  <HeaderCell className="text-center">Download Recommend Files</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                   {tableList.map((list:any) => (
                  
                <Row key={list.id} item={list}>
                  
                  { list.cmdb_id !== undefined ? 
                      <Cell >{list.file_name}</Cell > : 
                     <>{list.supporting_files_count !== 0 ?
                        <CellTree item={list}>{list.cmdb_file_name}</CellTree > :
                        <Cell item={list}>{list.cmdb_file_name}</Cell >
                      }</> 
                     
                    }
                  <Cell>{moment(list.uploaded_time).format('DD/MMM/YYYY')}</Cell>

                  {list.cmdb_file_url !== undefined ? 
                  <Cell className="text-center"> <a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.cmdb_file_url } title="download" target='_blank'><img src={downloadraw} width={24} alt="download"/></a></Cell>
                  :
                  <Cell className="text-center"> <a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.url } title="download" target='_blank'><img src={downloadraw} width={24} alt="download"/></a></Cell>

                  }

                  <Cell className="text-center">
                    <span className={list.summary_status === "Processing" ? "orange" :(list.summary_status === "Completed" ? "green" : "red") } >{list.summary_status}
                      <span className={list.summary_status !== "Processing"? "d-none" : ""}>
                        <span className="dot-one"> .</span>
                        <span className="dot-two"> .</span>
                        <span className="dot-three"> .</span>
                      </span>
                    </span>
                    
                  </Cell>   
                  <Cell className={ list.summary_status !=="Completed" ? "text-center disabled" : "text-center" }><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.processed_cmdb_file_url }  className={list.cmdb_id !== undefined ?"d-none" : "" } ><span className='d-none'>{list.cmdb_file_url}</span><img src={downloadprocessed} width={24} /></a></Cell>

                  
                  <Cell className="text-center">
                    <span className={list.enrich_status === "Processing" ? "orange" :(list.enrich_status === "Completed" ? "green" : "red") } >{list.enrich_status}
                      <span className={list.enrich_status !== "Processing"? "d-none" : ""}>
                        <span className="dot-one"> .</span>
                        <span className="dot-two"> .</span>
                        <span className="dot-three"> .</span>
                      </span>
                    </span>
                    
                  </Cell>

                  <Cell className={ list.enrich_status !=="Completed" ? "text-center disabled" : "text-center" }><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.enriched_cmdb_file_url }  className={list.cmdb_id !== undefined ?"d-none" : "" } ><span className='d-none'>{list.cmdb_file_url}</span><img src={downloadprocessed} width={24} /></a></Cell>
                  
                   <Cell className="text-center">
                    <span className={list.apr_status === "Processing" ? "orange" :(list.apr_status === "Completed" ? "green" : "red") } >{list.apr_status}
                      <span className={list.apr_status !== "Processing"? "d-none" : ""}>
                        <span className="dot-one"> .</span>
                        <span className="dot-two"> .</span>
                        <span className="dot-three"> .</span>
                      </span>
                    </span>
                    
                  </Cell>
                  
                  <Cell className={ list.apr_status !=="Completed" ? "text-center disabled" : "text-center" }><a href={"https://webapp-decom-demo.azurewebsites.net/download-file?url=" + list.apr_cmdb_file_url }  className={list.cmdb_id !== undefined ?"d-none" : "" } ><span className='d-none'>{list.cmdb_file_url}</span><img src={downloadprocessed} width={24} /></a></Cell>
                  
                  
                  

                </Row>
              ))}
              </Body>
              </>
              
            )}
            </Table> */}
            </>


            }
            
          {spinner && (
            <div className="spinner">
              <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
            </div>
           
        </div>
    </div>
  )
}

export default FileStatus