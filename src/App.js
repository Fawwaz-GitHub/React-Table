import React, { useState } from "react";
import Data from "./data";
import Table from "./components/Table";
import Select from "react-select";
import CalenderComp from "./components/CalenderComp";
import Charts from "./components/Charts";
 
const App = () => {

  const options = [
    { value: 'breakfast', label: 'Breakfast'},
    { value: 'lunch', label: 'Lunch'},
    { value: 'dinner', label: 'Dinner'},
    { value: 'snacks', label: 'Snacks'}] 
    console.log(options) // ---> it is for checkbox , this is static , but below i have gone for dynamic too

  //get unique for dropdown ----> from unique we can create options 
  const menuItems = [...new Set(Data.map((Val) => Val.title))]; 
          // console.log(menuItems)

  
  const options2 = [] // created empty array
  if(options2.length === 0){
    for( let y = 0 ; y < menuItems.length ; y++)
    {
      options2.push({ value: menuItems[y].toLocaleLowerCase(), label: menuItems[y]})
    }
  }
  console.log(options2) // then pushed this for options

  //search
  const [ search, setSearch ] = useState('')
  const [ select, setSelect ] =useState([]) // formultiselect
  const [ select2, setSelect2 ] = useState([])
  const [ select3, setSelect3 ] = useState([])

  const options3 = [
    { value: 'open', label: 'Open', color: '#CC0905'},
    { value: 'done', label: 'Done', color: '#F8C51B'},
    { value: 'closed', label: 'Closed', color: '#22C348'}
  ]

  const options4 = [
    { value: 'low', label: 'Low', color: '#22C348'},
    { value: 'medium', label: 'Medium', color: '#F8C51B'},
    { value: 'high', label: 'High', color: '#CC0905'}
  ]

  const colorStyles = {
    control: (styles) => ({...styles, backgroundColor: 'white'}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: data.color}
    },
    multiValue: (styles, {data}) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff",
      }
    },
    multiValueLabel: (styles, {data}) => {
      return {
        ...styles,
        color: "#fff",
      }
    }, 
    multiValueRemove: (styles, {data}) => {
      return {
        ...styles,
        color: "#fff",
        cursor: 'pointer',
        ':hover':{
          color: '#fff'
        }
      }
    }, 
  }

  const header = [ 'category','title','price','desc']
  
  const query = (data) => {
    // if(select.length === 0 || select2.length === 0 ){
    //   return data.filter(
    //     item =>
    //   header.some((key)=> item[key].includes('')))
    // }
    // else{
        return data.filter(
         item => 
        (search.length === 0 ? item.category.includes('') : header.some((key)=> item[key].includes(search)))
        && (select.length === 0 ? item.category.includes('') : select.some((key)=> item['category'].includes(key)))
         && (select2.length === 0 ? item.title.includes('') : select2.some((key)=> item['title'].includes(key)))
        )
        //  item.category.includes(select[0]) ||
        //  item.category.includes(select[1]) ||
        //  item.category.includes(select[2]) ||
        //  item.category.includes(select[3])
          //  && item.title.toLowerCase().includes('ma') 
          //using and multi filtering can be done
      }
    // }
 
  //multi select
  const handleChange = (e) => {
    let k = e
    console.log(k);
    let blank = []
    for(let i = 0; i<k.length ; i++)
    {
      blank.push(k[i].label)
    }
    setSelect(blank)
  }
  console.log(select)

  const handleChange2 = (e) => {
    let k = e
    let blank = []
    for(let i = 0; i<k.length ; i++)
    {
      blank.push(k[i].label)
    }
    setSelect2(blank)
  }
  console.log(select2);

  const handleChange3 = (e) => {
    let k = e
    let blank = []
    for(let i = 0; i<k.length ; i++)
    {
      blank.push(k[i].label)
    }
    setSelect3(blank)
  }
  console.log(select3);

  return (
    <>
    <Charts />
    <input style={{ height: 35, width: 600}} type='text' placeholder="Search..." className="search" onChange={(e)=>setSearch(e.target.value)}/> <br/>
    <div style={{ width: 280, height:38}}><Select options={options} isMulti hideSelectedOptions={false} closeMenuOnSelect={false} width='150px' onChange={handleChange}/></div>
    <div style={{ width: 280, height:38}}><Select options={options2} isMulti hideSelectedOptions={false} closeMenuOnSelect={false} width='150px' onChange={handleChange2}/></div>
    <div style={{ width: 280, height:38}}><Select options={options3} isMulti hideSelectedOptions={false} closeMenuOnSelect={false} width='150px' styles={colorStyles} onChange={handleChange3}/></div>
    <div style={{ width: 280, height:38}}><Select options={options4} isMulti hideSelectedOptions={false} closeMenuOnSelect={false} width='150px' styles={colorStyles} onChange={handleChange3}/></div>
    <CalenderComp />
    <Table data={query(Data)} />
    </>
  );
};
 
export default App;
