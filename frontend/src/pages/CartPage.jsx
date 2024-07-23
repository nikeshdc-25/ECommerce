import { useState } from "react";
import { Row, Col, ListGroup, Form, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../slices/cartSlice";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const changeCartQty = (item, qty) => {
    dispatch(addItem({ ...item, qty }));
  };
  return (
    <ListGroup variant="flush">
      {cartItems.map((item) => (
        <ListGroup.Item key={item._id}>
          <Row>
            <Col md={2}>
              <Image src={item.image} fluid rounded alt="item image" />
            </Col>
            <Col md={3}>
              <strong>{item.name}</strong>
            </Col>
            <Col md={2}>
              <span>${item.qty * item.price}</span>
            </Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={item.qty}
                onChange={(e) => changeCartQty(item, Number(e.target.value))}
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1}>{x + 1}</option>
                ))}
              </Form.Control>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CartPage;
