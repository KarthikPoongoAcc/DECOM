import { useState } from "react";

import { TabPane, Tab, Input } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import "./DocGeneration.scss";
import { Button } from "react-bootstrap";
import uploadimg from "../assets/images/icons/upload-arrow-icon.svg";
import downloadimg from "../assets/images/icons/download-arrow-icon.svg";
import downloadraw from "../assets/images/icons/download-file.svg";

import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";

const list = [
  {
    id: "1",
    name: "VSCode",
    deadline: new Date(2020, 1, 17),
    type: "SETUP",
    isComplete: true,
  },
];
const list1 = [
  {
    id: "2",
    name: "VSCode",
    deadline: new Date(2020, 1, 17),
    type: "SETUP",
    isComplete: true,
  },
];

type Props = {};

const DocGeneration = (props: Props) => {
  const data = { nodes: list };

  const [filename, setFileName] = useState("");
  const [appname, setAppName] = useState("");
  const [uploadstatus, setUploadstatus] = useState(false);
  const [beginqstatus, setBeginQStatus] = useState(false);

  const [disablebtn, setDisableBtn] = useState(true);
  const [disableQbtn, setDisableQBtn] = useState(true);
  const [disableTbtn, setDisableTBtn] = useState(true);
  const [disableCbtn, setDisableCBtn] = useState(true);

  const [qfilename, setQFileName] = useState("");
  const [uploadqstatus, setUploadQstatus] = useState(false);
  const [begindiscoverystatus, setBeginDiscoveryStatus] = useState(false);

  const [tfilename, setTFileName] = useState("");
  const [uploadtstatus, setUploadTstatus] = useState(false);
  const [begintedstatus, setBeginTEDStatus] = useState(false);

  const [cfilename, setCFileName] = useState("");
  const [uploadcstatus, setUploadCstatus] = useState(false);
  const [beginclosurestatus, setBeginClosureStatus] = useState(false);

  const TabChange = () => {
    console.log("hello");
    ClearQ();
    ClearDiscovery();
    ClearTED();
    ClearClosure();
    /// false;

    // if(uploadqstatus == true) {
    //   setUploadQstatus(false);
    //   setTimeout(() => { setUploadQstatus(true); });
    // }
    // if(uploadstatus == true){
    //   setUploadstatus(false);
    //   setUploadstatus(true);
    // }
  };

  const ValidateCMDB = (e: any) => {
    // const selectedFile = e.target.files[0];
    if ((appname != "" || appname != undefined) && e.target.files.length) {
      setDisableBtn(false);
    } else {
      return false;
    }
    let filename = e.target.value.split("\\");
    let filen = filename[2].split("_");
    let fileext = filename[2].split(".");
    let checksamename = true;
    console.log(filen[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0]);

    if (e.target.files && checksamename) {
      console.log(fileext[1]);
      if (filen[0] === "CMDB") {
        if (
          fileext[1] === "xlsx" ||
          fileext[1] === "csv" ||
          fileext[1] === "xls"
        ) {
          // setShowshowupload(false);
          // setShowResults(true);
        } else {
          //setErrormsg("File extension is not matching the criteria.");
        }
      } else {
        //setErrormsg("File name is not matching the criteria.");
      }
    }

    //const type =(e.target.accept).split(",");
  };

  const UploadCMDB = (event: any) => {
    setUploadstatus(true);
    console.log(filename);
    // event.target.reset();
    // console.log(event.target.value);
    // setFileName(event.target.textContent);
  };

  const AppName = (event: any) => {
    console.log(event.target.value);
    setAppName(event.target.value);
    console.log(filename);
    if (
      (event.target.value != "" || event.target.value != undefined) &&
      filename.length
    ) {
      setDisableBtn(false);
    }
  };

  const BeginQuestionnaire = (event: any) => {
    setBeginQStatus(true);
  };

  const ClearQ = () => {
    setFileName("");
    setAppName("");
    setBeginQStatus(false);
    setUploadstatus(false);
    setDisableBtn(true);
  };

  ///////

  const UploadQuestionnaire = (event: any) => {
    setUploadQstatus(true);
    // console.log(filename);
    // console.log(event.target.value);
    // setFileName(event.target.textContent);
  };

  const ValidateQuestionnaire = (e: any) => {
    if (e.target.files.length) {
      setQFileName(e.target.files[0].name);
      setDisableQBtn(false);
    } else {
      return false;
    }
  };
  const BeginTED = (event: any) => {
    setBeginDiscoveryStatus(true);
  };

  const ClearDiscovery = () => {
    setQFileName("");
    setUploadQstatus(false);
    setBeginDiscoveryStatus(false);
    setDisableQBtn(true);
  };

  /////////

  const UploadDiscovery = (event: any) => {
    setUploadTstatus(true);
    // console.log(filename);
    // console.log(event.target.value);
    // setFileName(event.target.textContent);
  };

  const ValidateDiscovery = (e: any) => {
    if (e.target.files.length) {
      setTFileName(e.target.files[0].name);
      setDisableTBtn(false);
    } else {
      return false;
    }
  };
  const BeginTEDReport = (event: any) => {
    setBeginTEDStatus(true);
  };

  const ClearTED = () => {
    setTFileName("");
    setUploadTstatus(false);
    setBeginTEDStatus(false);
    setDisableTBtn(true);
  };

  ////

  const UploadTED = (event: any) => {
    setUploadCstatus(true);
    // console.log(filename);
    // console.log(event.target.value);
    // setFileName(event.target.textContent);
  };

  const ValidateTED = (e: any) => {
    if (e.target.files.length) {
      setCFileName(e.target.files[0].name);
      setDisableCBtn(false);
    } else {
      return false;
    }
  };
  const BeginClosureReport = (event: any) => {
    setBeginClosureStatus(true);
  };

  const ClearClosure = () => {
    setCFileName("");
    setUploadCstatus(false);
    setBeginClosureStatus(false);
    setDisableCBtn(true);
  };

  ////////
  const panes = [
    {
      menuItem: "Generate Questionnaire",
      render: () => (
        <TabPane attached={false}>
          <h2>Generate Questionnaire</h2>

          <div className="w-75 mx-auto">
            {!uploadstatus && (
              <>
                <Form.Group controlId="cmdb" className="mb-3 form-file">
                  <Form.Label>Upload the CMDB: </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={ValidateCMDB}
                    defaultValue={filename}
                  />
                </Form.Group>

                <Form.Group className="mb-3 form-file" controlId="appName">
                  <Form.Label>Enter the application to be retired: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Application Name"
                    onChange={AppName}
                    value={appname}
                  />
                </Form.Group>
                <div className="text-center my-4">
                  {/* <Button variant="primary" onClick={UploadCMDB}> */}
                  <Button
                    variant="primary"
                    onClick={UploadCMDB}
                    disabled={disablebtn}
                  >
                    <img
                      src={uploadimg}
                      width={25}
                      alt="upload"
                      className="btn-icon"
                    />
                    Upload
                  </Button>
                </div>
              </>
            )}
            {uploadstatus && (
              <div className="w-75 mx-auto">
                <Table data={data}>
                  {(tableList: any) => (
                    <>
                      <Header>
                        <HeaderRow>
                          <HeaderCell>CMDB Name</HeaderCell>
                          <HeaderCell className="text-center">
                            Download
                          </HeaderCell>
                          <HeaderCell className="text-center">
                            Application Name
                          </HeaderCell>
                        </HeaderRow>
                      </Header>
                      <Body>
                        {tableList.map((item: any) => (
                          <Row key={item.id} item={item}>
                            <Cell>{filename}</Cell>
                            <Cell className="text-center">
                              <a href={filename}>
                                <img
                                  src={downloadraw}
                                  width={24}
                                  alt="download"
                                />
                              </a>
                            </Cell>
                            <Cell className="text-center">{appname}</Cell>
                          </Row>
                        ))}
                      </Body>
                    </>
                  )}
                </Table>
                {!beginqstatus ? (
                  <div className="text-center my-4">
                    <Button variant="secondary me-4" onClick={ClearQ}>
                      Clear
                    </Button>
                    <Button variant="primary" onClick={BeginQuestionnaire}>
                      Begin Discovery Questionnaire Generation
                    </Button>
                  </div>
                ) : (
                  <div className="text-center my-4">
                    <Button variant="secondary me-4" onClick={ClearQ}>
                      Clear
                    </Button>
                    <Button variant="primary">
                      <img
                        src={downloadimg}
                        width={25}
                        alt="upload"
                        className="btn-icon"
                      />
                      Download Discovery Questionnaire
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabPane>
      ),
    },
    {
      menuItem: "Generate Discovery Report",
      render: () => (
        <TabPane attached={false}>
          <h2>Generate Discovery Report</h2>
          <div className="w-75 mx-auto">
            {!uploadqstatus ? (
              <>
                <Form.Group
                  controlId="questionnaire"
                  className="mb-3 form-file"
                >
                  <Form.Label>Upload the Discovery Questionnaire: </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={ValidateQuestionnaire}
                    defaultValue={qfilename}
                  />
                </Form.Group>
                <Form.Group
                  controlId="arcdiagram"
                  className="mb-3 form-file"
                >
                  <Form.Label>Upload the Architecture Diagram: </Form.Label>
                  <Form.Control
                    type="file"
                    // onChange={}
                    // defaultValue={}
                  />
                </Form.Group>
                <div className="text-center my-4">
                  {/* <Button variant="primary" onClick={UploadCMDB}> */}
                  <Button
                    variant="primary"
                    onClick={UploadQuestionnaire}
                    disabled={disableQbtn}
                  >
                    <img
                      src={uploadimg}
                      width={25}
                      alt="upload"
                      className="btn-icon"
                    />
                    Upload
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-75 mx-auto">
                  <Table data={data}>
                    {(tableList: any) => (
                      <>
                        <Header>
                          <HeaderRow>
                            <HeaderCell>Questionnaire Name</HeaderCell>
                            <HeaderCell className="text-center">
                              Download
                            </HeaderCell>
                          </HeaderRow>
                        </Header>
                        <Body>
                          {tableList.map((item: any) => (
                            <Row key={item.id} item={item}>
                              <Cell>{qfilename}</Cell>
                              <Cell className="text-center">
                                <a href={qfilename}>
                                  <img
                                    src={downloadraw}
                                    width={24}
                                    alt="download"
                                  />
                                </a>
                              </Cell>
                            </Row>
                          ))}
                        </Body>
                      </>
                    )}
                  </Table>
                  {!begindiscoverystatus ? (
                    <div className="text-center my-4">
                      <Button variant="secondary me-4" onClick={ClearDiscovery}>
                        Clear
                      </Button>
                      <Button variant="primary" onClick={BeginTED}>
                        Begin Discovery Report Generation
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center my-4">
                      <Button variant="secondary me-4" onClick={ClearDiscovery}>
                        Clear
                      </Button>
                      <Button variant="primary">
                        Download Discovery Report
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </TabPane>
      ),
    },
    {
      menuItem: "Generate TED Report",
      render: () => (
        <TabPane attached={false}>
          <h2>Generate TED Report</h2>
          <div className="w-75 mx-auto">
            {!uploadtstatus ? (
              <>
                <Form.Group controlId="discovery" className="mb-3 form-file">
                  <Form.Label>Upload the Discovery Report: </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={ValidateDiscovery}
                    defaultValue={tfilename}
                  />
                </Form.Group>
                <div className="text-center my-4">
                  {/* <Button variant="primary" onClick={UploadCMDB}> */}
                  <Button
                    variant="primary"
                    onClick={UploadDiscovery}
                    disabled={disableTbtn}
                  >
                    <img
                      src={uploadimg}
                      width={25}
                      alt="upload"
                      className="btn-icon"
                    />
                    Upload
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-75 mx-auto">
                  <Table data={data}>
                    {(tableList: any) => (
                      <>
                        <Header>
                          <HeaderRow>
                            <HeaderCell>Document Name</HeaderCell>
                            <HeaderCell className="text-center">
                              Download
                            </HeaderCell>
                          </HeaderRow>
                        </Header>
                        <Body>
                          {tableList.map((item: any) => (
                            <Row key={item.id} item={item}>
                              <Cell>{tfilename}</Cell>
                              <Cell className="text-center">
                                <a href={tfilename}>
                                  <img
                                    src={downloadraw}
                                    width={24}
                                    alt="download"
                                  />
                                </a>
                              </Cell>
                            </Row>
                          ))}
                        </Body>
                      </>
                    )}
                  </Table>
                  {!begintedstatus ? (
                    <div className="text-center my-4">
                      <Button variant="secondary me-4" onClick={ClearTED}>
                        Clear
                      </Button>
                      <Button variant="primary" onClick={BeginTEDReport}>
                        Begin TED Report Generation
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center my-4">
                      <Button variant="secondary me-4" onClick={ClearTED}>
                        Clear
                      </Button>
                      <Button variant="primary">Download TED Report</Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </TabPane>
      ),
    },
    {
      menuItem: "Generate Closure Report",
      render: () => (
        <TabPane attached={false}>
          <h2>Generate Closure Report</h2>
          <div className="w-75 mx-auto">
            {!uploadcstatus ? (
              <>
                <Form.Group controlId="ted" className="mb-3 form-file">
                  <Form.Label>Upload the TED Report: </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={ValidateTED}
                    defaultValue={cfilename}
                  />
                </Form.Group>
                <div className="text-center my-4">
                  {/* <Button variant="primary" onClick={UploadCMDB}> */}
                  <Button
                    variant="primary"
                    onClick={UploadTED}
                    disabled={disableCbtn}
                  >
                    <img
                      src={uploadimg}
                      width={25}
                      alt="upload"
                      className="btn-icon"
                    />
                    Upload
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-75 mx-auto">
                  <Table data={data}>
                    {(tableList: any) => (
                      <>
                        <Header>
                          <HeaderRow>
                            <HeaderCell>Document Name</HeaderCell>
                            <HeaderCell className="text-center">
                              Download
                            </HeaderCell>
                          </HeaderRow>
                        </Header>
                        <Body>
                          {tableList.map((item: any) => (
                            <Row key={item.id} item={item}>
                              <Cell>{cfilename}</Cell>
                              <Cell className="text-center">
                                <a href={cfilename}>
                                  <img
                                    src={downloadraw}
                                    width={24}
                                    alt="download"
                                  />
                                </a>
                              </Cell>
                            </Row>
                          ))}
                        </Body>
                      </>
                    )}
                  </Table>
                  {!beginclosurestatus ? (
                    <div className="text-center my-4">
                      <Button variant="secondary me-4" onClick={ClearClosure}>
                        Clear
                      </Button>
                      <Button variant="primary" onClick={BeginClosureReport}>
                        Begin Closure Report Generation
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center my-4">
                      <Button variant="secondary me-4" onClick={ClearClosure}>
                        Clear
                      </Button>
                      <Button variant="primary">Download Closure Report</Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* <div className="w-75 mx-auto">
            <Form.Group controlId="closure" className="mb-3 form-file">
              <Form.Label>Upload the TED Report: </Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <div className="text-center my-4">
              <Button variant="primary" disabled>
                Begin Closure Report Generation
              </Button>
            </div>
          </div> */}
        </TabPane>
      ),
    },
  ];

  return (
    <>
      <div className="w90center">
        <Tab menu={{ pointing: true }} panes={panes} onTabChange={TabChange} />
      </div>
    </>
  );
};

export default DocGeneration;
