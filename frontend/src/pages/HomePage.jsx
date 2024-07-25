import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productSlice";
import Message from "../components/Message";
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
  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log(error);
  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export const dataLoader = async () => {
  let resp = await fetch("/api/v1/products");
  let data = await resp.json();
  return data;
};

export default HomePage;
