import React, { Component } from "react";
import JSONDATA from "./utils/order.json";
import "./utils/style.css";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import OrderTrendChart from "./Components/LineChart";

import TopOrder from "./Components/OrderTable/Top5order";
import BottomOrder from "./Components/OrderTable/Bottom5order";
import TopUser from "./Components/UserTable/Top5user";
import BottomUser from "./Components/UserTable/Bottom5user";

import moment from "moment";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      age: "",
      todayOrderCount: [],
      today_order_count: 0,
      today_order_amount: 0,
      current_week_order_count: 0,
      current_week_order_amount: 0,
      current_month_order_count: 0,
      current_month_order_amount: 0,
      last_month_order_amount: 0,
      last_month_order_count: 0,
      topOrder: [],
      bottomOrder: [],
      topUser: [],
      bottomUser: []
    };
  }

  componentDidMount = () => {
    this.TodayOrderData();
    this.CurrentWeekData();
    this.CurrentMonthData();
    this.LastMonthData();
    this.top5order();
    this.bottom5order();
    this.top5user();
    this.bottom5user()
  };

  amountSum = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].amount;
    }
    return sum;
  };

  TodayOrderData = () => {
    let today_date = moment(new Date()).format("YYYY-MM-DD");
    let filter_date = [];
    if (JSONDATA) {
      for (let i = 0; i < JSONDATA.length; i++) {
        if (moment(JSONDATA[i].date).format("YYYY-MM-DD") === today_date) {
          filter_date.push(JSONDATA[i]);
          let amount_sum = this.amountSum(filter_date);
          this.setState({
            today_order_count: filter_date.length,
            today_order_amount: amount_sum,
          });
        }
      }
    }
  };

  getCurrentWeek() {
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf("isoWeek");
    let days = [];
    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").format("YYYY-MM-DD"));
    }
    return days;
  }

  CurrentWeekData = () => {
    let current_week = this.getCurrentWeek();
    let filter_data = [];
    if (JSONDATA) {
      for (let i = 0; i < JSONDATA.length; i++) {
        for (let j = 0; j < current_week.length; j++) {
          if (
            moment(JSONDATA[i].date).format("YYYY-MM-DD") ===
            moment(current_week[j]).format("YYYY-MM-DD")
          ) {
            filter_data.push(JSONDATA[i]);
            let amount_sum = this.amountSum(filter_data);
            this.setState({
              current_week_order_count: filter_data.length,
              current_week_order_amount: amount_sum,
            });
          }
        }
      }
    }
  };

  CurrentMonthData = () => {
    let filter_data = [];
    let current_month = moment(new Date()).format("MM");
    if (JSONDATA) {
      for (let i = 0; i < JSONDATA.length; i++) {
        if (moment(JSONDATA[i].date).format("MM") === current_month) {
          filter_data.push(JSONDATA[i]);
          let amount_sum = this.amountSum(filter_data);
          this.setState({
            current_month_order_count: filter_data.length,
            current_month_order_amount: amount_sum,
          });
        }
      }
    }
  };

  LastMonthData = () => {
    let filter_data = [];
    let last_month = moment().subtract(1, "months").endOf("month").format("MM");
    if (JSONDATA) {
      for (let i = 0; i < JSONDATA.length; i++) {
        if (moment(JSONDATA[i].date).format("MM") === last_month) {
          filter_data.push(JSONDATA[i]);
          let amount_sum = this.amountSum(filter_data);
          this.setState({
            last_month_order_count: filter_data.length,
            last_month_order_amount: amount_sum,
          });
        }
      }
    }
  };

  top5order = () => {
    if (JSONDATA) {
      let data = JSONDATA.sort((a,b) => b.amount - a.amount)
      this.setState({
        topOrder: data.slice(0,5)
      })
    }
  };

  bottom5order = () => {
    if(JSONDATA){
      let data = JSONDATA.sort((a,b) => a.amount - b.amount)
      this.setState({
        bottomOrder: data.slice(0,5)
      })
    }
  }

  top5user = () => {
    if (JSONDATA) {
      let data = JSONDATA.sort((a,b) => b.quantity - a.quantity)
      this.setState({
        topUser: data.slice(0,5)
      })
    }
  };

  bottom5user = () => {
    if(JSONDATA){
      let data = JSONDATA.sort((a,b) => a.quantity - b.quantity)
      this.setState({
        bottomUser: data.slice(0,5)
      })
    }
  }

  render() {
    return (
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
          <Select
            native
            value={this.state.age}
            label="Age"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <Box
          display="flex"
          p={1}
          m={1}
          bgcolor="background.paper"
          flexWrap="nowrap"
          flexDirection="row"
          justifyContent="space-evenly"
        >
          <Box
            bgcolor="grey.500"
            display="flex"
            flexDirection="column"
            style={{ padding: "10px", borderRadius: "10px", color: "#ffffff" }}
          >
            <p>Today's Order: {this.state.today_order_count}</p>
            <p>Current Week Order: {this.state.current_week_order_count}</p>
          </Box>
          <Box
            bgcolor="grey.500"
            display="flex"
            flexDirection="column"
            style={{ padding: "10px", borderRadius: "10px", color: "#ffffff" }}
          >
            <p>Today's Order Amount: {this.state.today_order_amount}</p>
            <p>Current Week Amount: {this.state.current_week_order_amount}</p>
          </Box>
          <Box
            bgcolor="grey.500"
            display="flex"
            flexDirection="column"
            style={{ padding: "10px", borderRadius: "10px", color: "#ffffff" }}
          >
            <p>MTD Order: {this.state.current_month_order_count}</p>
            <p>Last Month Order: {this.state.last_month_order_count}</p>
          </Box>
          <Box
            bgcolor="grey.500"
            display="flex"
            flexDirection="column"
            style={{ padding: "10px", borderRadius: "10px", color: "#ffffff" }}
          >
            <p>MTD order amount: {this.state.current_month_order_amount}</p>
            <p>Last Month Amount: {this.state.last_month_order_amount}</p>
          </Box>
        </Box>
        <div>
          <OrderTrendChart />
        </div>
        <div>
          <p>Top 5 Orders</p>
          <TopOrder order = {this.state.topOrder}/>
        </div>
        <div>
          <p>Bottom 5 Orders</p>
          <BottomOrder order = {this.state.bottomOrder}/>
        </div>
        <div>
          <p>Top 5 User</p>
          <TopUser order = {this.state.topUser}/>
        </div>
        <div>
          <p>Bottom 5 User</p>
          <BottomUser order={this.state.bottomUser}/>
        </div>
      </Container>
    );
  }
}

export default Order;
