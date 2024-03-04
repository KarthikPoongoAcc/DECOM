import { useTree } from '@table-library/react-table-library/tree';
import { useState } from 'react';
import { useSort } from "@table-library/react-table-library/sort";
import downloadprocessed from "../assets/images/icons/file-download-alt.svg";
import downloadraw from "../assets/images/icons/download-file.svg";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";

import "./FileStatus.scss";
const list = [
    {
      id: "1",
      CMDBfileName: "CMDB_NICApplication",
      deadline: new Date(2020, 1, 17),
      type: "In-Progress",
      isComplete: true,
    },
    {
      id: "2",
      CMDBfileName: "CMDB_TechApp",
      deadline: new Date(2020, 2, 28),
      type: "Completed",
      isComplete: true,
      nodes: [
        {
          id: "2.1",
          CMDBfileName: "Data Types",
          deadline: new Date(2020, 2, 28),
         
          isComplete: false,
        },
        {
          id: "2.2",
          CMDBfileName: "Objects",
          deadline: new Date(2020, 2, 28),
        
          isComplete: false,
        },
        {
          id: "2.3",
          CMDBfileName: "Code Style",
          deadline: new Date(2020, 2, 28),
          
          isComplete: false,
        },
      ],
    },
    {
      id: "3",
      CMDBfileName: "CMDB_TestApp",
      deadline: new Date(2020, 3, 8),
      type: "Completed",
      isComplete: true,
      nodes: [
        {
          id: "3.1",
          CMDBfileName: "Components",
          deadline: new Date(2020, 3, 8),
         
          isComplete: false,
        },
        {
          id: "3.2",
          CMDBfileName: "JSX",
          deadline: new Date(2020, 3, 8),
          
          isComplete: false,
        },
      ],
    },
  ];

const COLUMNS = [
  { label: 'CMDB File Name', renderCell: (item:any) => item.CMDBfileName },
  {
    label: 'Uploaded Date',
    renderCell: (item:any) =>
      item.deadline.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
  },
  { label: 'Type', renderCell: (item:any) => item.type },
  {
    label: 'Complete',
    renderCell: (item:any) => item.isComplete.toString(),
  },
  { label: 'Tasks', renderCell: (item:any) => item.nodes },
];
type Props = {}

const FileStatus = (props: Props) => {
    //const data = { nodes };
  

    const [search, setSearch] = useState("");

    const handleSearch = (event:any) => {
      setSearch(event.target.value);
    };
  
    const data = {
      nodes: list.filter((item) =>
        item.CMDBfileName.toLowerCase().includes(search.toLowerCase())
      ),
    };

    const tree = useTree(data, {
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

      const sort = useSort(data,  {
        state: {
            sortKey: 'TASK',
            reverse: false,
          },
        onChange: onSortChange,
      }, {
        sortFns: {
          TASK: (array:any[]) =>
            array.sort((a, b) => a.CMDBfileName.localeCompare(b.CMDBfileName)),
          DEADLINE: (array:any[]) =>
            array.sort((a, b) => a.deadline - b.deadline),
          TYPE: (array:any[]) =>
            array.sort((a, b) => a.type.localeCompare(b.type)),
          COMPLETE: (array:any[]) =>
            array.sort((a, b) => a.isComplete - b.isComplete),
        },
      });
    
      function onSortChange(action:any, state:any) {
        console.log(action, state);
      }
  return (
    <div>
        <div className='container-block'>
            <div className='container-block-bg white'>
            <label htmlFor="search" className='searchfield'>
        Search by CMDB File Name:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} placeholder='Search' />
      </label>
      <br /> 
            {/* <CompactTable columns={COLUMNS} data={data} tree={tree} sort={sort}/> */}
            <Table data={data} tree={tree} sort={sort}>
            {(tableList:any) => (
              <>
              <Header>
                <HeaderRow>
                  <HeaderCell>CMDB Name</HeaderCell>
                  <HeaderCell>Uploaded Date</HeaderCell>
                  <HeaderCell className="text-center">Summarization Status</HeaderCell>
                  <HeaderCell className="text-center">Download Raw Files</HeaderCell>
                  <HeaderCell className="text-center">Download Processed Files</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                   {tableList.map((list:any) => (
                <Row key={list.id} item={list}>
                  <Cell>{list.CMDBfileName}</Cell>
                  <Cell>
                    {list.deadline.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Cell>
                  <Cell className="text-center">
                    <span className={list.type == "In-Progress" ? "orange" :(list.type == "Completed" ? "green" : "red") } >{list.type}</span>
                  </Cell>
                  <Cell className="text-center"><a href=""><img src={downloadraw} width={24} /></a></Cell>
                  <Cell className={ list.type =="In-Progress" ? "text-center disabled" : "text-center" }><a href="" className={list.isComplete == false ?"d-none" : "" } ><img src={downloadprocessed} width={24} /></a></Cell>
                </Row>
              ))}
              </Body>
              </>
              
            )}
          </Table>

            </div>
        </div>
    </div>
  )
}

export default FileStatus