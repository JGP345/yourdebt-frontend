import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
let x =0

export default class Modal5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      byMonths: false,
      byPay: false,
      calculate: false,
    };
  }
  
  handleChange = (e) => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

calculateByMonths = (item)=> {
  let int_rate = item.int_rate
  let amount_owed = item.amount_owed
  let min_payment = item.min_payment
  let months = Number(item.time_topay)
  let monthlyint = (int_rate/100)/ 12
  let totalInt = amount_owed
  for(let i = 0; i < months; i++){
    if( totalInt === 0){
      return 0
    }
    totalInt += (totalInt*monthlyint)
    totalInt -= min_payment
    
  }
  let remain = (totalInt%months)/months
  let extra = (totalInt/months) + remain
  totalInt = amount_owed

  for(let i = 0; i < months; i++){
    if( totalInt === 0){
      return 0
    }
    totalInt += (totalInt*monthlyint)
    totalInt -= (min_payment + extra)}
  remain = (totalInt%months)/months
  extra+= totalInt/months + remain
return Math.round(extra)

}
 calculateByPay = (item)=> {
  let pay = 0
  let extra_principal = Number(item.extra_principal)
  let int_rate = item.int_rate
  let amount_owed = item.amount_owed
  let min_payment = item.min_payment
  let term = 360
  if(item.hasOwnProperty('term')){
   term = item.term}
  let monthlyint = (int_rate/100)/ 12
  let totalpay = min_payment + extra_principal
  
  for( let i = 0; i < term; i++){
    amount_owed -= totalpay
    pay+= totalpay
    if(amount_owed <= 0){
      pay+= amount_owed
      x = i
      return (Math.round(pay*100)/100)
    }
    amount_owed += (amount_owed * monthlyint)
  }
return(`${(Math.round(pay*100)/100)} but still owe $${Math.round(amount_owed*100)/100}`)
}


  render() {
    const { toggle } = this.props;

    return (
      <Modal   isOpen={true} toggle={toggle}>
        <ModalHeader className="head" toggle={toggle}>{this.state.activeItem.debt_name}  
        {this.state.activeItem.hasOwnProperty('term') ? (<h6> Loan Term: {this.state.activeItem.term} months </h6>):null}


        <h6> Amount owed: ${this.state.activeItem.amount_owed} </h6>
        
        
        
        </ModalHeader>
        <ModalBody>

  
<button className="btn btn-success mr-2 mb-2" onClick={()=>{this.setState({ byMonths: !this.state.byMonths, byPay : false})}}> Calculate by months</button>  
<button className="btn btn-secondary mb-2" onClick={()=>{this.setState({ byPay: !this.state.byPay, byMonths : false})}}> Calculate by extra pay</button>

<Form>

  
  {this.state.byMonths ? ( <FormGroup><center> <Label for="time_topay">In How many months would you like to pay this off? </Label> <br></br>
              <Input
                type="text"
                id="time_topay"
                name="time_topay"
                value={this.state.activeItem.time_topay}
                onChange={this.handleChange}
                placeholder="Enter number of months"
              /> </center>
  </FormGroup>):null}
  {this.state.byPay ? ( <FormGroup>
             <center> <Label for="extra_principal">How much extra do you want to pay? <br></br> (The minimum payment of ${this.state.activeItem.min_payment} will automatically be applied)</Label></center>
              <Input
                type="number"
                id="extra_principal"
                name="extra_principal"
                onChange={this.handleChange}
                value={this.state.activeItem.extra_principal}
                
                placeholder="Enter the expected extra you will pay towards the principal"
              />
            </FormGroup>):null}
 
            </Form>
          
        </ModalBody>
<ModalFooter>
 {this.state.byPay ? <center><h4> You will pay ${this.calculateByPay(this.state.activeItem)} {x===0 ? null:` in ${x} months`}</h4></center>
: null}
 {this.state.byMonths ? <center><h4> You will  have to pay ${this.calculateByMonths(this.state.activeItem)} extra per month</h4></center>
: null}

 
</ModalFooter>
      </Modal>
    );
  }
}