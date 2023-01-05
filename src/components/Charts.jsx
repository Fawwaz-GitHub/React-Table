import React from 'react'
import Chart from 'react-apexcharts'

const Charts = () => {

const categories = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const closedData = [20,15,20,15,20,15,10,25,15,10,25,15]
const doneData = [10,25,15,10,25,15,20,10,30,15,25,20]
const openData = [20,10,30,15,25,20,20,15,20,15,20,15]

const pieChart = [78,33,18]

const added = (data) => {
    var total = 0
    for(let i = 0; i < data.length; i++){
        total += data[i] 
    }
    return total
}


  return (
    <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:"space-evenly"}}>
        <Chart
            type='bar'
            width={800}
            height={300}
            series={[
                {
                    name:`Closed : ${added(closedData)} `,
                    data:closedData,
                    color:"#22C348"
                },
                {
                    name:`Done : ${added(doneData)} `,
                    data:doneData,
                    color:"#F8C51B"
                },
                {
                    name:`Open : ${added(openData)} `,
                    data:openData,
                    color:"#CC0905"
                },
            ]}
            options={{
                chart:{
                    stacked:true
                },
                xaxis:{
                    tickPlacement:'on',
                    categories: categories,
                    min: categories.length - 5
                },
                dataLabels:{
                    enabled: false
                },
                tooltip: {
                    y: {
                      formatter: function(value, opts) {
                        let percent = opts.w.globals.seriesPercent[opts.seriesIndex][opts.dataPointIndex];
                        return percent.toFixed(0) + '%'
                      }
                    }
                }
            }}
        >
        </Chart>
        <Chart
            type='pie'
            height={350}
            width={350}
            series={pieChart}
            options={{
                labels:['Low','Medium','High'],
                colors:['#22C348','#F8C51B','#CC0905'],
                
            }}
        >
        </Chart>
    </div>
  )
}

export default Charts