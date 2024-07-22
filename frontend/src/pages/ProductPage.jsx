import { Image, Row, Col, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addItem } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/v1/products/" + id) // `/api/v1/products/${id}`
      .then((resp) => setProduct(resp.data))
      .catch((err) => console.log(err.message));
  }, []);

  const addToCartHandler = (item) => {
    dispatch(addItem(item));
  };
  return (
    <>
      <Link className="btn btn-light" to="/">
        Go Back
      </Link>
      <Row className="my-3">
        <Col md={5}>
          <Image src={product.image} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>${product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              <span>{product.description}</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price</Col>
                <Col>
                  <strong>{product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status</Col>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="secondary"
                disabled={product.countInStock <= 0}
                onClick={() => addToCartHandler(product)}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;
