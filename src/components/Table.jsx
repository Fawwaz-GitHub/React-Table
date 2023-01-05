import React,{ useState,useEffect,useMemo } from 'react'
import '../date.css'

function Table({data}) {

const [ sort, setSort ] = useState(data)  
const [ order, setOrder ] = useState("ASC")

useEffect(()=>{
  setSort(data)
},[data])

//pagination
const [ itemPerPage, setitemPerPage ] = useState(5)
const [ page, setPage ] = useState(1)

const displayData = useMemo(()=>{
  const start = ( page - 1 ) * itemPerPage;
  const end = start + itemPerPage
  console.log(start,end);
  return sort.slice(start, end )
},[sort,page,itemPerPage])

const handlePage = (event) => {
  setitemPerPage(Number(event.target.value))
  setPage(1)
}

const handlePage1 = (e) => {
  setPage(e.target.value)
}

var totalpages = Math.ceil( sort.length / itemPerPage )
var enddoc = page * itemPerPage
var startdoc = ( enddoc - itemPerPage ) + 1

const sorting = (col) => {
  if (order === "ASC") {
    const sorted = [...displayData].sort((a,b)=> 
      a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
    );
    setSort(sorted);
    setOrder("DSC");
  }
  if (order === "DSC") {
    const sorted = [...displayData].sort((a,b)=> 
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
    );
    setSort(sorted);
    setOrder("ASC");
  }
}

  return (
    <div>
    <table>
      <thead>
        <tr>
        <th onClick={()=>sorting('category')}>Category</th>
        <th onClick={()=>sorting('title')}>Title</th>
        <th onClick={()=>sorting('price')}>Price</th>
        <th onClick={()=>sorting('desc')}>Desc</th>
        </tr>
      </thead>
      <tbody>
      {
        displayData.map((e,i)=>{
        return (
          <tr key={i}>
          <td>{e.category}</td>
          <td>{e.title}</td>
          <td>{e.price}</td>
          <td>{e.desc}</td>
          </tr>
        )
        })
      }
      {sort.length === 0 && <p>No Data Found</p>}
      </tbody>
    </table>
    {/* Pagination */}
    <div style={{ display:'flex', flexDirection:'row', height:20, justifyContent:'space-between'}}>
    <div>
    <label>
      <select value={itemPerPage} onChange={handlePage}> 
        <option>5</option> <option>10</option> <option>25</option> <option>50</option> {/* option value can be changed here */}  
      </select> Document per Page
    </label>
    </div>
    <div> {startdoc} - { page === totalpages ? sort.length : enddoc } of {sort.length} Documents </div>
    <div>
    <input type='number' width='30' max={totalpages} min={1} value={page} onChange={handlePage1}/> of {totalpages} pages &nbsp; 
    <button name='Prev' onClick={()=> page === 1 ? setPage(1) : setPage(page - 1)}> &#60; </button> &nbsp;
    <button name='Next' onClick={()=> page === totalpages ? setPage(totalpages) : setPage(page + 1)}> &#62; </button>
    </div>
    </div>
    </div>
  )
}

export default Table