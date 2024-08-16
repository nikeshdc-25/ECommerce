import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productSlice";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });
  console.log(data);

  return (
    <>
      <Meta />
      {!keyword && <ProductCarousel />}
      {keyword ? (
        <h2>Search Results for "{keyword}"</h2>
      ) : (
        <h2>Latest Products</h2>
      )}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <>
          <Row>
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword ? keyword : ""}
          />
        </>
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
