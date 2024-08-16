import { Col, Container, Row } from "react-bootstrap"
import Footer from "./components/footer"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <>
    <Header />
    <Container className="my-3">
      <Outlet/>
    </Container>
    <Footer className='mt-5'/>
    <ToastContainer />
    </>
  )
}

export default App
