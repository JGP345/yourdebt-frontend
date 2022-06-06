import React, { Component } from "react";
import Modal from "../components/Modal1";
import Modal2 from "../components/Modal2";
import Modal3 from "../components/Modal3";
import Modal4 from "../components/Modal4";
import Modal5 from "../components/Modal5";
import axios from "axios";
import { Redirect, Route, Switch } from "react-router-dom";

const URL = 'https://yourdebt-backend.herokuapp.com/'

class HomePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        type: "Mortgage",
        openDebtList: [],
        closeDebtList: [],
        mortgageList: [],
        modal: false,
        calculate:false,
        loginInfo: {username: "",
      password: ""},
        thirtyAverage: "",
        fifteenAverage: "",
        activeOpenDebt: {
          debt_name: "",
          amount_owed: "",
          int_rate: "",
          min_payment: "",
          extra_principal: "",
          time_topay: "",
        },
        activeCloseDebt: {
          debt_name: "",
          amount_owed: "",
          int_rate: "",
          min_payment: "",
          extra_principal: "",
          time_topay: "",
          term: "",
        },
        activeMortgage: {
          mortgage_name: "",
          purchase_price: "",
          down_payment: "",
          mortgage_term: "",
          int_rate: "",
          property_tax: "",
          property_insurance: "",
          PMI: "",
          first_month: "",
          first_year: "",
        }
      };
    }
  
    componentDidMount = async () => {
       this.refreshList();
       const res = await fetch('https://cloud.iexapis.com/stable/data-points/market/MORTGAGE30US?token=pk_fb2f30e9d9124d01aaa8632476f2b9a0')
       const thirty = await res.json()
       const res2 = await fetch('https://cloud.iexapis.com/stable/data-points/market/MORTGAGE15US?token=pk_fb2f30e9d9124d01aaa8632476f2b9a0')
       const fifteen = await res2.json()
       this.setState({fifteenAverage: fifteen, thirtyAverage: thirty})
  
       
   }
      
    refreshList = () => {
      const openDebtsUrl = URL +'api/opendebt/';
      const closeDebtsUrl = URL + 'api/closedebt/';
      const mortgagesUrl = URL+ 'api/mortgage/';
      const getOpenDebts = axios.get(openDebtsUrl);
      const getCloseDebts = axios.get(closeDebtsUrl);
      const getmortgages = axios.get(mortgagesUrl);
      axios.all([getOpenDebts,getCloseDebts, getmortgages,]).then(
      axios.spread((...allData) => {
      this.setState({openDebtList: allData[0].data});
      this.setState({closeDebtList: allData[1].data});  
      this.setState({mortgageList: allData[2].data})}))};
  
    toggle = () => {
      this.setState({ modal: !this.state.modal, calculate: !this.state.calculate });
    };

    handleChange = (e) => {
      let { name, value } = e.target;
  
      const activeItem = { ...this.state.loginInfo, [name]: value };
  
      this.setState({ activeItem });
    };
  
  
    getAverages = () => {
  const thirtyAvg = axios.get('https://api.stlouisfed.org/fred/series?series_id=MORTGAGE30US&api_key=684c80737ae93c6aab774bddb81a3de8&file_type=json',{ mode: 'no-cors',    headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }});
  const fitheenAvg = axios.get('https://api.stlouisfed.org/fred/series?series_id=MORTGAGE15US&api_key=684c80737ae93c6aab774bddb81a3de8&file_type=json',{ mode: 'no-cors',    headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }});
  axios.all([thirtyAvg,fitheenAvg]).then(
    axios.spread((...allData) => {
      this.setState({thirtyAverages: allData[0].data});
      this.setState({fitheenAverages: allData[1].data}); 
    }))};
  
    handleSubmit = (item) => {
      this.toggle();
      if(this.state.type === "Mortgage"){
      if (item.id) {
        axios
          .put(`/api/mortgage/${item.id}/`, item)
          .then((res) => this.refreshList());
        return;
      }
      axios
        .post("/api/mortgage/", item)
        .then((res) => this.refreshList());
    };
    if(this.state.type === "Open Debt"){
      if (item.id) {
        axios
          .put(`/api/opendebt/${item.id}/`, item)
          .then((res) => this.refreshList());
        return;
      }
      axios
        .post("/api/opendebt/", item)
        .then((res) => this.refreshList());
    };
    if(this.state.type === "Close Debt"){
      if (item.id) {
        axios
          .put(`/api/closedebt/${item.id}/`, item)
          .then((res) => this.refreshList());
        return;
      }
      axios
        .post("/api/closedebt/", item)
        .then((res) => this.refreshList());
    };}
  
    handleDelete = (item) => {
      if(this.state.type === "Mortgage"){
          axios
        .delete(`/api/mortgage/${item.id}/`)
        .then((res) => this.refreshList());}
      if(this.state.type === "Open Debt"){
          axios
            .delete(`/api/opendebt/${item.id}/`)
            .then((res) => this.refreshList());}
      if(this.state.type === "Close Debt"){
          axios
            .delete(`/api/closedebt/${item.id}/`)
            .then((res) => this.refreshList());}
    };
  
    createItem = () => {
      if(this.state.type === "Mortgage"){
        const item = this.state.activeMortgage
  
        this.setState({ activeItem: item, modal: !this.state.modal });
      }
      if(this.state.type === "Close Debt"){
        const item = this.state.activeCloseDebt
  
        this.setState({ activeItem: item, modal: !this.state.modal });
      }
      if(this.state.type === "Open Debt"){
        const item = this.state.activeOpenDebt
  
        this.setState({ activeItem: item, modal: !this.state.modal });
      }
  
  
    };
  
    editItem = (item) => {
      this.setState({ activeItem: item, modal: true, calculate: false});
    };
    calculateItem = (item) => {
      this.setState({ activeItem: item, calculate: true, modal: true});
    };
  
    displayItems = (type) => {
    return this.setState({type: type})
    };
  
    renderTabList = () => {
      return (
        <div className="nav nav-tabs">
          <span
            onClick={() => this.displayItems("Mortgage")}
            className={this.state.type === "Mortgage" ? "nav-link active" : "nav-link"}
          >
            Mortgage
          </span>
          <span
            onClick={() => this.displayItems("Close Debt")}
            className={this.state.type === "closeDebt" ? "nav-link active" : "nav-link"}
          >
           Close Debts
          </span>
          <span
            onClick={() => this.displayItems("Open Debt")}
            className={this.state.type === "openDebts" ? "nav-link active" : "nav-link"}
          >
           Open Debts
          </span>
        </div>
      );
    };
  
    renderItems = () => {
      const { type } = this.state;
      var realType = "";
      const closeDebt = this.state.closeDebtList;
      const openDebt = this.state.openDebtList;
      const mortgage = this.state.mortgageList;
      const items = this.state.closeDebtList.concat(this.state.openDebtList).concat(this.state.mortgageList).filter(
        function n(item) { if(closeDebt.includes(item)){ realType = "Close Debt" } 
        else if (openDebt.includes(item)){ realType = "Open Debt"} 
        else if (mortgage.includes(item)){ realType = "Mortgage"}; 
        return realType === type });
  
        function name(item) { 
        if (mortgage.includes(item)){
          return item.mortgage_name
        }
        else {
          return item.debt_name;
        }
      }
  
      return items.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>
            {name(item)}
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editItem(item)}
            >
              Edit
            </button>
            <button
              className="btn btn-success mr-2"
              onClick={() => this.calculateItem(item)}
            >
              Calculate
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}
            >
              Delete
            </button>
          </span>
        </li>
      ));
    };
  
    render() {
      return (
        <main className="container">
           
          <h1 className="text-black text-uppercase text-center my-4">YourDebt</h1>
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
              
                <div className="mb-4">
                  <button
                    className="btn btn-primary"
                    onClick={this.createItem}
                  >
                    Add {this.state.type}
                  </button>
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush border-top-0">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
          {this.state.modal && this.state.calculate === false && this.state.type === "Open Debt" ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
                  {this.state.modal && this.state.calculate && this.state.type === "Open Debt" ? (
            <Modal5
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
                  {this.state.modal && this.state.calculate === false && this.state.type === "Close Debt" ? (
            <Modal2
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
          {this.state.modal && this.state.calculate && this.state.type === "Close Debt" ? (
            <Modal5
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
                   
                  {this.state.modal && this.state.calculate === false && this.state.type  === "Mortgage" ? (
            <Modal3
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
                      {this.state.modal && this.state.calculate && this.state.type === "Mortgage" ? (
            <Modal4
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
  <div class="jumbotron jumbotron-fluid mt-5">
    <div class="container">
      <center><h1 class="display-4">Average Interest Rates</h1></center>
     <center> <p class="lead"> Average 30 years rate: {this.state.thirtyAverage}% <br></br> Average 15 years rate: {this.state.fifteenAverage}%</p></center>
    </div>
  </div>
  
  
  
        </main>
      );
    }
  }
  
  export default HomePage;