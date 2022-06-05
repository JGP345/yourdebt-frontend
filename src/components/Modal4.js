import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";


export default class Modal4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  render() {
    const { toggle } = this.props;

    return (
      <Modal contentClassName="modal-height"  isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>{this.state.activeItem.mortgage_name}</ModalHeader>
        <ModalBody>
 <form action="https://www.mlcalc.com/" method="post" target="output_frame"> 
<input type="hidden" name="wl" value="en"></input>
<label><input type="hidden" name="ma" value={this.state.activeItem.purchase_price}></input> </label>
<label> <input type="hidden" name="dp" value={Math.round(this.state.activeItem.down_payment/this.state.activeItem.purchase_price*100)}></input> </label>
<label> <input type="hidden" name="mt" value={this.state.activeItem.mortgage_term}></input> </label>
<label> <input type="hidden" name="ir" value={this.state.activeItem.int_rate}></input> </label>
<label> <input type="hidden" name="pt" value={this.state.activeItem.property_tax}></input> </label>
<label> <input type="hidden" name="pi" value={this.state.activeItem.property_insurance}></input> </label>
<label> <input type="hidden" name="mi" value={this.state.activeItem.PMI/100}></input></label>
<label> <input type="hidden" name="sm" value={this.state.activeItem.first_month}></input></label>
<label> <input type="hidden" name="sy" value={this.state.activeItem.first_year}></input></label>
<label>Years<input type="radio" name="as" value="year" checked="checked"></input></label>
<label>Months<input type="radio" name="as" value="month"></input></label>
<input type="submit" value="Calculate"  ></input>
</form>

<div className="wow">
<iframe title="title"name="output_frame" src="" id="output_frame" width="100%" height="500px">
</iframe> 
</div> 
        </ModalBody>
        <ModalFooter>

       
        </ModalFooter>
      </Modal>
    );
  }
}