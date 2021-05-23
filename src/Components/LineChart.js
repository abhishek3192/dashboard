import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import Box from "@material-ui/core/Box";
import moment from 'moment'


export default function OrderTrendChart(props){
  const [date, setDate] = useState([])
  const [amount, setAmount] = useState([])
  
  useEffect(() => {
    let date = []
    let amount = []
    props.order.forEach((item) => {
      date.push(moment(item.date).format('DD-MM-YYYY'))
      amount.push(item.amount)
    })
    setDate(date)
    setAmount(amount)
  }, [props.order])

  const data = {
    labels: date,
    datasets: [
      {
        label: "Order Trend",
        data: amount
      }
    ]
}

  return(
    <Box display="flex" justifyContent="center" marginTop="50px">
      <Line data={data}/>
    </Box>
  )
}
