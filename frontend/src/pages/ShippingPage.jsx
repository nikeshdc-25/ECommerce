import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup } from "react-bootstrap";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.cart);
  const [recipient, setRecipient] = useState(userInfo.name);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ recipient, address, city, phone }));
    navigate("/order");
  };

  return (
    <>
      <FormContainer>
        <h2>Shipping Address</h2>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="recipient" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Full Name..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="address" className="my-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter current address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
            <FormGroup controlId="city" className="my-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City Name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="Phone" className="my-3">
              <Form.Label>Tel/Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone no..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-2">
              Continue
            </Button>
          </FormGroup>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingPage;
