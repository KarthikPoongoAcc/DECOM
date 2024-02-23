import { CompactTable } from '@table-library/react-table-library/compact';
import { useTree } from '@table-library/react-table-library/tree';
import { useState } from 'react';
import { useSort } from "@table-library/react-table-library/sort";

import "./FileStatus.scss";
const list = [
    {
      id: "1",
      name: "VSCode",
      deadline: new Date(2020, 1, 17),
      type: "SETUP",
      isComplete: true,
    },
    {
      id: "2",
      name: "JavaScript",
      deadline: new Date(2020, 2, 28),
      type: "LEARN",
      isComplete: true,
      nodes: [
        {
          id: "2.1",
          name: "Data Types",
          deadline: new Date(2020, 2, 28),
          type: "LEARN",
          isComplete: true,
        },
        {
          id: "2.2",
          name: "Objects",
          deadline: new Date(2020, 2, 28),
          type: "LEARN",
          isComplete: true,
        },
        {
          id: "2.3",
          name: "Code Style",
          deadline: new Date(2020, 2, 28),
          type: "LEARN",
          isComplete: true,
        },
      ],
    },
    {
      id: "3",
      name: "React",
      deadline: new Date(2020, 3, 8),
      type: "LEARN",
      isComplete: false,
      nodes: [
        {
          id: "3.1",
          name: "Components",
          deadline: new Date(2020, 3, 8),
          type: "LEARN",
          isComplete: true,
        },
        {
          id: "3.2",
          name: "JSX",
          deadline: new Date(2020, 3, 8),
          type: "LEARN",
          isComplete: true,
        },
      ],
    },
  ];

const COLUMNS = [
  { label: 'Task', renderCell: (item:any) => item.name },
  {
    label: 'Deadline',
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
        item.name.toLowerCase().includes(search.toLowerCase())
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
            array.sort((a, b) => a.name.localeCompare(b.name)),
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
            <CompactTable columns={COLUMNS} data={data} tree={tree} sort={sort}/>
            </div>
        </div>
    </div>
  )
}

export default FileStatus