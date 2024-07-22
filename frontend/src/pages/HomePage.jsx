import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
const HomePage = () => {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   fetch("/api/v1/products")
  //     .then((resp) => resp.json())
  //     .then((data) => setProducts(data))
  //     .catch((err) =>
  //       console.log("Error Occur while fetching api", err.message)
  //     );
  // }, []);
  const products = useLoaderData();
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export const dataLoader = async () => {
  let resp = await fetch("/api/v1/products");
  let data = await resp.json();
  return data;
};

export default HomePage;
