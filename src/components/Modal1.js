import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };



  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal id="Modal" isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Debt</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="debt_name">Debtor</Label>
              <Input
                type="text"
                id="debt_name"
                name="debt_name"
                value={this.state.activeItem.debt_name}
                onChange={this.handleChange}
                placeholder="Enter debt_name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="amount_owed">Amount Owed</Label>
              <Input
                type="number"
                id="amount_owed"
                name="amount_owed"
                value={this.state.activeItem.amount_owed}
                onChange={this.handleChange}
                placeholder="Enter amount owed"
              />
            </FormGroup>
            <FormGroup>
              <Label for="int_rate">Interest Rate</Label>
              <Input
                type="number"
                id="int_rate"
                name="int_rate"
                value={this.state.activeItem.int_rate}
                onChange={this.handleChange}
                placeholder="Enter Interest Rate"
              />
            </FormGroup>
           
            <FormGroup>
              <Label for="min_payment">Minimum Payment</Label>
              <Input
                type="number"
                id="min_payment"
                name="min_payment"
                value={this.state.activeItem.min_payment}
                onChange={this.handleChange}
                placeholder="Enter minimum payment"
              />
            </FormGroup>
            <FormGroup>
              <Label for="extra_principal">Extra Principal Pay</Label>
              <Input
                type="number"
                id="extra_principal"
                name="extra_principal"
                value={this.state.activeItem.extra_principal}
                onChange={this.handleChange}
                placeholder="Enter the expected extra you will pay towards the principal"
              />
            </FormGroup>
            <FormGroup>
              <Label for="time_topay">Time to pay in months</Label>
              <Input
                type="text"
                id="time_topay"
                name="time_topay"
                value={this.state.activeItem.time_topay}
                onChange={this.handleChange}
                placeholder="Enter time to pay in months"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
       
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
     
      </Modal>
      
    );
  }
}