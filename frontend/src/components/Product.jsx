import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="my-3 p-3">
      <Card.Img src={product.image} variant="top" />
      <Card.Body>
        <Card.Text as="div" className="product-title">
          <strong>{product.name}</strong>
        </Card.Text>
        <Card.Text as="div">
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Product;
