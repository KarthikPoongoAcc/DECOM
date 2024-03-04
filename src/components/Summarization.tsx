import "./Summarization.scss";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";
import { Dropdown } from "semantic-ui-react";
import downloadimg from "../assets/images/icons/download-arrow-icon.svg";
import { Checkbox } from "semantic-ui-react";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import downloadraw from "../assets/images/icons/download-file.svg";
import summarize from "../assets/images/additem.svg";

import Upload from "./Upload";
import BarChart from "./BarChart";

import axios from "axios";
import info from "../assets/images/icons/info.png";
import uploadimg from "../assets/images/icons/upload-arrow-icon.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./FileUpload.scss";
import excel from "../assets/images/icons/doc.svg";

type Props = {};

const list = [
  {
    id: "1",
    CMDBfileName: "CMDB_NICApplication",
    deadline: new Date(2020, 1, 17),
    type: "In-Progress",
    isComplete: true,
  },
];

const Summarization = (props: Props) => {
  // const CheckboxExampleSlider = () => <Checkbox slider />
  const [toggle, setTogglebtn] = useState(true);
  const [fileName, setFilename] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [showprocess, setShowProcess] = useState(false);
  const [selected1, setSelected1] = useState([]);
  const [selectedfile, setSelectedfile] = useState("");
  const [processfiles, setProcessfiles] = useState(false);

  const [showupload, setShowshowupload] = useState(true);

  const [showmultipleupload, setShowmultipleupload] = useState(true);
  // eslint-disable-next-line
  const [showResults, setShowResults] = useState(false);
  const [showstatus, setShowstatus] = useState(true);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const [ofileList, setOFileList] = useState<FileList | null>(null);

  const [errormsg, setErrormsg] = useState("");

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  const ofiles = ofileList ? [...ofileList] : [];

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
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const selectedFile = e.target.files[0];

    let filename = e.target.value.split("\\");
    let filen = filename[2].split("_");
    let fileext = filename[2].split(".");
    console.log(filen[0]);
    setFileList(e.target.files);

    if (e.target.files) {
      console.log(fileext[1]);
      if (filen[0] === "CMDB") {
        if (
          fileext[1] === "xlsx" ||
          fileext[1] === "csv" ||
          fileext[1] === "xls"
        ) {
          setShowshowupload(false);
          setShowResults(true);
        } else {
          setErrormsg("File extension is not matching the criteria.");
        }
      } else {
        setErrormsg("File name is not matching the criteria.");
      }
    }

    //const type =(e.target.accept).split(",");
  };

  const ohandleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const selectedFile = e.target.files[0];

    setShowmultipleupload(false);
    console.log(e.target.accept.split(","));
    setOFileList(e.target.files);

    if (e.target.files) {
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
    // create a new FormData object and append the file to it
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append("cmdbs", file);
    });

    ofiles.forEach((file, i) => {
      formData.append("cmdbs", file);
    });

    console.log(ofileList);
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
        setShowstatus(false);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  function CMDBUpload() {
    return (
      <Form.Group controlId="formFileMultiple" className="mb-3 file-area">
        <Form.Label>
          Upload CMDB file.
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <span>
              <img src={info} width={16} alt="info" className="mx-2" />
            </span>
          </OverlayTrigger>
          <span className="mandatory">*</span>
        </Form.Label>
        <div className="d-flex flex-column w-100">
          <Form.Control
            className="cmdb"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange}
          />
          <p className="error"> {errormsg}</p>
        </div>
      </Form.Group>
    );
  }

  function Filelist() {
    return (
      <div className="d-flex list-files">
        <div>CMDB File:</div>
        <ul className="list-group">
          {files.map((file, i) => (
            <li key={i} className="list-group-item">
              <img src={excel} width={25} alt="file" /> {file.name};
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function Filelist2() {
    return (
      <div className="d-flex list-files">
        <div>Supporting Files:</div>
        <ul className="list-group">
          {ofiles.map((file, i) => (
            <li key={i} className="list-group-item">
              <img src={excel} width={25} alt="file" /> {file.name};
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function UploadOther() {
    return (
      <Form.Group controlId="formFileMultiple" className="mb-3 file-area">
        <Form.Label>
          Upload Supporting Files.
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip2}
          >
            <span>
              <img src={info} width={16} alt="info" className="mx-2" />
            </span>
          </OverlayTrigger>
        </Form.Label>
        <Form.Control
          type="file"
          className="cmdb"
          onChange={ohandleFileChange}
          multiple
        />
        {/* <div className="file-dummy">
          <div className="default">Upload supporting files </div>
        </div> */}
      </Form.Group>
    );
  }
  function Uploads() {
    return (
      <>
        <h2>Upload</h2>
        <div className="d-flex ">
          {showupload ? <CMDBUpload /> : <Filelist />}
        </div>

        {!showupload ? (
          <div className="d-flex">
            {showmultipleupload ? <UploadOther /> : <Filelist2 />}
          </div>
        ) : (
          ""
        )}
        <div className="text-end">
          <Button variant="primary" onClick={UploadCMDB} disabled={showupload}>
            <img src={uploadimg} width={25} alt="upload" className="btn-icon" />
            Upload
          </Button>
        </div>
      </>
    );
  }

  useEffect(() => {
    setSpinner(true);
    fetch("https://webapp-decom-demo.azurewebsites.net/available-cmdbs", {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        setSelected1(
          data.list_of_cmdbs.map((x: any, i: any) => {
            return { key: i, text: x, value: x };
          })
        );
        setSpinner(false);
      });
  }, []);

  // var fileDownload = require('js-file-download');
  const Summarization = () => {
    const formData = new FormData();
    formData.append("cmdb_folder", selectedfile);
    setSpinner(true);
    fetch("https://webapp-decom-demo.azurewebsites.net/summarize", {
      method: "post",
      body: formData,
    })
      .then(function (resp) {
        //const filename =  resp.headers.get('Content-Disposition').split('filename=')[1];
        setSpinner(false);
        console.log(resp);
        setShowProcess(true);
        return resp.blob();
      })
      .then(function (blob) {
        console.log(blob);
        setSpinner(false);

        //fileDownload(blob, "Processed_" + selectedfile + ".xlsx");
      });
  };

  //var fileDownload = require('js-file-download');
  const UploadSummarization = () => {
    const f1 = files[0];
    let fileext = f1.name.split(".");
    const formData = new FormData();
    formData.append("cmdb_folder", fileext[0]);
    setSpinner(true);
    fetch("https://webapp-decom-demo.azurewebsites.net/summarize", {
      method: "post",
      body: formData,
    })
      .then(function (resp) {
        //const filename =  resp.headers.get('Content-Disposition').split('filename=')[1];
        setSpinner(false);
        console.log(resp);
        setShowProcess(true);
        return resp.blob();
      })
      .then(function (blob) {
        console.log(blob);
        setSpinner(false);
        // fileDownload(blob, "Processed_" + f1.name);
      });
  };

  const Getfilename = (e: any) => {
    setProcessfiles(true);
    setShowProcess(false);
    setSelectedfile(e.target.textContent);
  };
  function Tablelist() {
    const data = { nodes: list };
    return (
      <>
        <Table data={data}>
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
                    <Cell>{selectedfile}</Cell>

                    <Cell className="text-center">
                      <a href="">
                        <img src={downloadraw} width={24} />
                      </a>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        <div>
          <Button variant="primary" onClick={Summarization}>
            <img src={summarize} width={25} alt="upload" className="btn-icon" />
            Begin Summarization
          </Button>
        </div>
      </>
    );
  }

  function TablelistUpload() {
    const data = { nodes: list };
    return (
      <>
        <Table data={data}>
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
                    <Cell>{files[0].name}</Cell>

                    <Cell className="text-center">
                      <a href="">
                        <img src={downloadraw} width={24} />
                      </a>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        <div>
          <Button variant="primary" onClick={UploadSummarization}>
            <img src={summarize} width={25} alt="upload" className="btn-icon" />
            Begin Summarization
          </Button>
        </div>
      </>
    );
  }
  function ExistingList() {
    return (
      <>
        <div className="position-relative">
          <h2>Existing CMDB</h2>
          <div className="d-flex align-items-center">
            <label className="w-50">Select Uploaded File</label>
            <Dropdown
              placeholder="Select Uploaded CMDB file"
              fluid
              search
              selection
              onChange={Getfilename}
              options={selected1}
              loading={spinner}
            />
          </div>
          <div>{processfiles ? <Tablelist /> : ""}</div>
          {spinner && (
            <div className="spinner spinner-full">
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
      </>
    );
  }

  var download = require("js-file-download");
  const Downloadsummaryfile = () => {
    const formData = new FormData();
    formData.append("cmdb_folder", fileName);
    setSpinner(true);
    fetch("https://webapp-decom-demo.azurewebsites.net/download", {
      method: "post",
      body: formData,
    })
      .then(function (resp) {
        // const filename =  resp.headers.get('Content-Disposition').split('filename=')[1];
        setSpinner(false);
        console.log(resp);
        return resp.blob();
      })
      .then(function (blob) {
        console.log(blob);
        setSpinner(false);
        return download(blob, "Processed_" + fileName + ".xlsx");
      });
  };

  const DownloadUploadedsummaryfile = () => {
    const f1 = files[0];
    let fileext = f1.name.split(".");
    const formData = new FormData();
    formData.append("cmdb_folder", fileext[0]);
    setSpinner(true);
    fetch("https://webapp-decom-demo.azurewebsites.net/download", {
      method: "post",
      body: formData,
    })
      .then(function (resp) {
        //const filename =  resp.headers.get('Content-Disposition').split('filename=')[1];
        setSpinner(false);
        console.log(resp);
        setShowProcess(true);
        return resp.blob();
      })
      .then(function (blob) {
        console.log(blob);
        setSpinner(false);
        download(blob, "Processed_" + f1.name);
      });
  };

  const donutData = [
    { name: "No of Apps with Supporting Docs", value: 400 },
    { name: "No of COTS Apps Summarized", value: 350 },
    { name: "No of Custom Apps Summarized", value: 300 },
  ];

  function Processfile() {
    return (
      <div className="position-relative">
        <div className="container-block w90center d-flex align-items-start my-4">
          <div className="container-block-bg white w-100">
            <h4>{fileName} Summarized Data 1</h4>
            {/* <div className="text-center d-flex">
    <div className="w-100">
      <DonutChart data={donutData}  /> 
    </div>
    <div className="w-100">
      <DonutChart data={donutData}  /> 
    </div>
  </div> */}
            <div className="text-center d-flex justify-content-center">
              <BarChart data={donutData} />
            </div>
            <div className="text-center">
              <Button variant="primary" onClick={Downloadsummaryfile}>
                <img
                  src={downloadimg}
                  width={25}
                  alt="upload"
                  className="btn-icon"
                />
                Download Summarized File
              </Button>
            </div>
          </div>
        </div>
        {spinner && (
            <div className="spinner spinner-full">
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
    );
  }
  function ProcessfileUpload() {
    return (
      <div className="position-relative">
        <div className="container-block w90center d-flex align-items-start my-4">
          <div className="container-block-bg white w-100">
            <h4> Summarized Data</h4>
            {/* <div className="text-center d-flex">
    <div className="w-100">
      <DonutChart data={donutData}  /> 
    </div>
    <div className="w-100">
      <DonutChart data={donutData}  /> 
    </div>
  </div> */}
            <div className="text-center d-flex justify-content-center">
              <BarChart data={donutData} />
            </div>
            <div className="text-center">
              <Button variant="primary" onClick={DownloadUploadedsummaryfile}>
                <img
                  src={downloadimg}
                  width={25}
                  alt="upload"
                  className="btn-icon"
                />
                Download Summarized File
              </Button>
            </div>
            {spinner && (
            <div className="spinner spinner-full">
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
    );
  }
  const toggleChange = () => {
    setShowProcess(false);
    setTogglebtn((prevCheck) => !prevCheck);
  };
  function Uploaddata() {
    return (
      <>
        <div className="position-relative">
          {showstatus ? <Uploads /> : <TablelistUpload />}
          {spinner && (
            <div className="spinner spinner-full">
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
      </>
    );
  }
  return (
    <>
      <div className="container-block w90center d-flex align-items-start">
        <div className="container-block-bg white w-50 mt-4">
          <h2>Summarization</h2>
          <div className="desc">
            <ul>
              <li>
                Distill essential details from client documents into concise
                summaries.
              </li>
              <li>
                Provide streamlined representations of information for easier
                understanding and accessibility.
              </li>
              <li>
                Facilitate efficient decision-making and resource management.
              </li>
            </ul>
          </div>
          {/* <Datalist/>
          { (downloadfile && fileName) && <Download /> } */}
        </div>
        <div className="column-alignments">
          <div className="checkfield">
            Upload New CMDB
            <Checkbox slider onChange={toggleChange} />
            Existing CMDB{" "}
          </div>
          <div className="container-block-bg white w-100">
            <div>{toggle ? <Uploaddata /> : <ExistingList />}</div>
          </div>
        </div>

        {/* <iframe width={1000} height={500} src="https://docs.google.com/spreadsheets/d/1NXxpCGF9WRw7qtpE2tQtkguVu5yMPQImouGnibyQFl0/edit?usp=sharing"></iframe> */}
      </div>
      {showprocess && ( toggle ? <ProcessfileUpload /> : <Processfile /> )}
    </>
  );
};

export default Summarization;
