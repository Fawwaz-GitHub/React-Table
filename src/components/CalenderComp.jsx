import React,{ useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'
import moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../date.css'

const CalenderComp = () => {

    const [dateFilter, setDateFilter] = useState(true)

    const [ filterDateAdded, setFilterDateAdded] = useState([])
    const [ filterDueDate, setFilterDueDate] = useState([])

    const [ range , setRange ] = useState([{
        startDate : new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
    }])

    console.log(dateFilter)
    // console.log( range[0].startDate, range[0].endDate)
    const dateAdded = () => {
    let dateArray = []
    let currentDate = moment( range[0].startDate);
    let stopDate = moment(range[0].endDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('DD-MM-YY') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    setFilterDateAdded(dateArray)
    }
    console.log('Date Added',filterDateAdded);

    const DueDate = () => {
        let dateArray = []
        let currentDate = moment( range[0].startDate);
        let stopDate = moment(range[0].endDate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('DD-MM-YY') )
            currentDate = moment(currentDate).add(1, 'days');
        }
    setFilterDueDate(dateArray)
        }
    console.log('Due Date',filterDueDate);
    
    const [ open, setOpen ] = useState(false)

    const selection = [filterDateAdded[0],', ',filterDateAdded[filterDateAdded.length - 1]]
    console.log(selection);

    // const handleSelect = (date) => {
    //     // console.log(date);
    //     // console.log(format(date , 'MM/dd/yyyy'));
    //     setCalender(format(date , 'MM/dd/yyyy'));
    // }

    const handleChange = () =>{ 
        if(selection[0]){
        return <div className='whole'><div className='date'>{selection}</div><div className='btn' onClick={()=>setFilterDateAdded([])}>✖</div></div>}
       }

  return (
    <div className='calenderWrap'>
        <input
            value = 'Filter By Date'
            readOnly
            className='inputBox'
            style={{ width: 280, height:38}}
            onClick={ () => setOpen(open => !open)}
        />
          { open && 
          <>
          <div>
            <label>
            <input type="radio" checked={dateFilter} onChange={()=>setDateFilter(true)}/> Date Added
            <input type="radio" checked={!dateFilter} onChange={()=>setDateFilter(false)}/> Due Date
            </label>
          </div>
          <div>
         <DateRangePicker
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            defaultValue={null}
            showDateDisplay={false}
            months={1}
            direction='horizontal'
            className='calenderElement'
            rangeColors={['#a3a096']}
        /> 
        </div>
        <div>
        <input
            value = 'Date Added' 
            readOnly
            className='inputBox'
            style={{ width: 280, height:38}}
            onClick={()=> dateFilter ? dateAdded() : DueDate() }
        />
        <div>{handleChange()}</div>
        </div> 
        </>
}
    </div>
  )
}

export default CalenderComp