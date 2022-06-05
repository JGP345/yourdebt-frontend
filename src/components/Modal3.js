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


export default class Modal2 extends Component {
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
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Mortgage</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
              <Label for="mortgage_name">Mortgage</Label>
              <Input
                type="text"
                id="mortgage_name"
                name="mortgage_name"
                value={this.state.activeItem.mortgage_name}
                onChange={this.handleChange}
                placeholder="Enter mortgage name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="purchase_price">Purchased Price</Label>
              <Input
                type="number"
                id="purchase_price"
                name="purchase_price"
                value={this.state.activeItem.purchase_price}
                onChange={this.handleChange}
                placeholder="Enter purchase price"
              />
            </FormGroup>
            <FormGroup>
              <Label for="down_payment">Down Payment</Label>
              <Input
                type="number"
                id="down_payment"
                name="down_payment"
                value={this.state.activeItem.down_payment}
                onChange={this.handleChange}
                placeholder="Enter the downpayment"
              />
            </FormGroup>
            <FormGroup>
              <Label for="mortgage_term">Mortgage Term in years</Label>
              <Input
                type="number"
                id="mortgage_term"
                name="mortgage_term"
                value={this.state.activeItem.mortgage_term}
                onChange={this.handleChange}
                placeholder="Enter the downpayment"
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
              <Label for="property_tax">Property tax</Label>
              <Input
                type="number"
                id="property_tax"
                name="property_tax"
                value={this.state.activeItem.property_tax}
                onChange={this.handleChange}
                placeholder="Enter annual property tax"
              />
            </FormGroup>
            <FormGroup>
              <Label for="property_insurance">Property insurance</Label>
              <Input
                type="number"
                id="property_insurance"
                name="property_insurance"
                value={this.state.activeItem.property_insurance}
                onChange={this.handleChange}
                placeholder="Enter the property insurance"
              />
            </FormGroup>
            <FormGroup>
              <Label for="PMI">PMI</Label>
              <Input
                type="number"
                id="PMI"
                name="PMI"
                value={this.state.activeItem.PMI}
                onChange={this.handleChange}
                placeholder="PMI"
              />
            </FormGroup>
            <FormGroup>
              <Label for="first_month"> Month of first payment</Label>
              <Input
                type="number"
                id="first_month"
                name="first_month"
                value={this.state.activeItem.first_month}
                onChange={this.handleChange}
                placeholder="first_month"
              />
            </FormGroup>
            <FormGroup>
              <Label for="first_year"> Year of first payment</Label>
              <Input
                type="number"
                id="first_year"
                name="first_year"
                value={this.state.activeItem.first_year}
                onChange={this.handleChange}
                placeholder="first_year"
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