import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import downloadimg from "../assets/images/icons/download-arrow-icon.svg";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { Dropdown } from "semantic-ui-react";
import downloadraw from "../assets/images/icons/download-file.svg";
import { Button } from "react-bootstrap";
import summarize from "../assets/images/additem.svg";
import { useTree, CellTree } from "@table-library/react-table-library/tree";
import downloadprocessed from "../assets/images/icons/file-download-alt.svg";


type Props = {}

const Recommend = (props: Props) => {
  const [spinner, setSpinner] = useState(false);
  const [selectedfile, setSelectedfile] = useState("");
  const [processfiles, setProcessfiles] = useState(false);

  const [selected1, setSelected1] = useState([]);
  const [uploadlist, setUploadedList] = useState<any[]>([]);
  const [seleteduploadlist, setSeltedUploadedList] = useState({ nodes: [] });
  const [selectedid, setSelectedID] = useState("");
  const [recommeddata, setRecommedData] = useState<any | null>([]);
  const [showprocess, setShowProcess] = useState(false);
  const [recommendstatus, setRecommendstatus] = useState<any | null>('');
  
  useEffect(() => {
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
        let completeddata: any = [];
        setUploadedList(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].enrich_status === "Completed") {
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

  const Getfilename = (e: any) => {
    if(e.target.textContent === ""){
      return;
    }
    setProcessfiles(true);
    console.log(uploadlist);
    console.log(uploadlist);
    // value = selectedfile;
    //let dataselected = {nodes: []};
    uploadlist.forEach((file, i) => {
      if (file.cmdb_file_name === e.target.textContent) {
        console.log(file.cmdb_file_name);
        setSeltedUploadedList(file);
        setSelectedID(file.id);
        setRecommendstatus(file.apr_status);
      }
    });

    console.log(e.target.textContent);
    setSelectedfile(e.target.textContent);
  };
  function Tablelist() {
    console.log(seleteduploadlist);
    const tree = useTree(
      seleteduploadlist,
      {
        state: {
          ids: ["6", "7", "5"],
        },
        onChange: onTreeChange,
      },

      {
        treeIcon: {
          size: "10px",
        },
      }
    );
    function onTreeChange(action: any, state: any) {
      console.log(action, state);
    }
    const data = { nodes: [seleteduploadlist] };
    console.log(data);
    const Summarization = () => {
      // const formData = new FormData();
      // formData.append("cmdb_folder", selectedfile);
      setSpinner(true);
      fetch(
        "https://webapp-decom-demo.azurewebsites.net/apr?id=" + selectedid,
        {
          method: "get",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSpinner(false);
          setShowProcess(true);
          setRecommedData(data);
        })
        .catch((error) =>{ alert("server error"); console.error(error)});
    };
    return (
      <>
        <Table data={data} tree={tree}>
          {(tableList: any) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>CMDB Name</HeaderCell>
                  <HeaderCell className="text-center">
                    Download Raw Files
                  </HeaderCell>
                  <HeaderCell className="text-center">
                    Download Summarized Files
                  </HeaderCell>
                  <HeaderCell className="text-center">
                    Download Enriched Files
                  </HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((list: any) => (
                  <Row key={list.id} item={list}>
                    {list.cmdb_id !== undefined ? (
                      <Cell>{list.file_name}</Cell>
                    ) : (
                      <>
                        {list.supporting_files_count !== 0 ? (
                          <CellTree item={list}>{list.cmdb_file_name}</CellTree>
                        ) : (
                          <Cell item={list}>{list.cmdb_file_name}</Cell>
                        )}
                      </>
                    )}

                    {list.cmdb_file_url !== undefined ? (
                      <Cell className="text-center">                       
                        <a
                          href={
                            "https://webapp-decom-demo.azurewebsites.net/download-file?url=" +
                            list.cmdb_file_url
                          }
                          title="download"
                          target="_blank" rel="noopener noreferrer"
                        >
                          <img src={downloadraw} width={24} alt="download" />
                        </a>
                      </Cell>
                    ) : (
                      <Cell className="text-center">
                      
                        <a
                          href={
                            "https://webapp-decom-demo.azurewebsites.net/download-file?url=" +
                            list.url
                          }
                          title="download"
                          target="_blank" rel="noopener noreferrer"
                        >
                          <img src={downloadraw} width={24} alt="download" />
                        </a>
                      </Cell>
                    )}
                    {list.cmdb_file_url !== undefined ? (
                      <Cell className="text-center">
                        <a
                          href={
                            "https://webapp-decom-demo.azurewebsites.net/download-file?url=" +
                            list.processed_cmdb_file_url
                          }
                          title="download"
                          target="_blank" rel="noopener noreferrer"
                        >
                          <img
                            src={downloadprocessed}
                            width={24}
                            alt="download"
                          />
                        </a>
                      </Cell>
                    ) : (
                      <Cell className="text-center"></Cell>
                    )}
                    {list.cmdb_file_url !== undefined ? (
                      <Cell className="text-center">
                        <a
                          href={
                            "https://webapp-decom-demo.azurewebsites.net/download-file?url=" +
                            list.apr_cmdb_file_url
                          }
                          title="download"
                          target="_blank" rel="noopener noreferrer"
                        >
                          <img
                            src={downloadprocessed}
                            width={24}
                            alt="download"
                          />
                        </a>
                      </Cell>
                    ) : (
                      <Cell className="text-center"></Cell>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        <div>
          {/* <Button variant="primary" onClick={Summarization}>
            <img src={summarize} width={25} alt="upload" className="btn-icon" />
            Begin Enrich
          </Button> */}

          {recommendstatus === "Completed" ?
             <Button variant="primary" onClick={Summarization}>
             <img src={summarize} width={25} alt="Show Recommended Result" className="btn-icon" />
             Show Recommended Result
           </Button>
           : recommendstatus === "Processing" ?  <p className="orange">Processing 
                  <span>
                      <span className="dot-one"> .</span>
                      <span className="dot-two"> .</span>
                      <span className="dot-three"> .</span>
                    </span>
                </p>
              : ((recommendstatus === "Not Yet Initiated" ||  recommendstatus === null)? 
              <Button variant="primary" onClick={Summarization}>
                  <img src={summarize} width={25} alt="Begin Recommend" className="btn-icon" />
                Begin Recommend
                </Button> : 
                <div>
                  <p className="red">Server Error Please Upload Again
                </p>
                <Button variant="primary" className="" onClick={Summarization}>
                  <img src={summarize} width={25} alt="Begin Recommend" className="btn-icon" />
                Begin Recommend
                </Button> 
                  </div>
                )

          }
        </div>
      </>
    );
  }
  console.log(recommeddata);
 // ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = ['Retain', 'Retire', 'Remeadiate', 'Replace', 'Consolidate'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Applications total count: ' + (recommeddata.apr_retain_count + recommeddata.apr_retire_count + recommeddata.apr_remeadiate_count + recommeddata.apr_replace_count +  recommeddata.apr_consolidate_count),
        data: [recommeddata.apr_retain_count, recommeddata.apr_retire_count, recommeddata.apr_remeadiate_count, recommeddata.apr_replace_count, recommeddata.apr_consolidate_count],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <div className="container-block w90center d-flex align-items-start">
        <div className="container-block-bg white w-50 ">
          <h2>Recommendation</h2>
          <div className="desc">
            <ul>
              <li><span className='fw-bold'>Utilize CMDB Data:</span> This app will extract relevant information from the Configuration Management Database (CMDB), such as usage statistics, performance metrics, and dependencies.
</li><li><span className='fw-bold'>Formulate Dispositions with Reasoning:</span> For each application, GenAI based app will decide a disposition and concise reasoning based on the data available in the CMDB.
</li>
            </ul>
          </div>
        </div>
        <div className="column-alignments">
          <div className="container-block-bg white w-100">
            <div>
              <div>
                <h2>Enriched CMDB</h2>
                <div className="d-flex align-items-center">
                  <label className="w-50">Select Enriched File</label>
                  <Dropdown
                    placeholder="Select Uploaded CMDB file"
                    fluid
                    search
                    selection
                    onChange={Getfilename}
                    options={selected1}
                    loading={spinner}
                    value={selectedfile}
                  />
                </div>
                <div>{processfiles ? <Tablelist /> : ""}</div>
              </div>
              {spinner && (
            <div className="spinner ">
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
      </div>
      {showprocess && (
        <div className="container-block w90center d-flex align-items-start mt-4">
          <div className="container-block-bg white w-100 ">
            <h2>Disposition Status</h2>
            <div className="text-center d-flex justify-content-center">
              <div className="w-100 px-5 pb-5">                
                <Bar data={data} />
              </div>             
            </div>
            <div className="text-center">
              <p className='text-start'>You will get additionally Architecture Recommendation, Functional Adequacy, Digital Readiness, Strategic/Business Fit, Technical Fit, Financial Fit along with Disposition and Reason.</p>
              <Button
                variant="primary"
                href={
                  "https://webapp-decom-demo.azurewebsites.net/download-file?url=" +
                  recommeddata.apr_cmdb_file_url
                }
              >
                <img
                  src={downloadimg}
                  width={25}
                  alt="upload"
                  className="btn-icon"
                />
                Download Recommended File
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Recommend