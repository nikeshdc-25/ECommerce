import { Container } from "react-bootstrap";
import './footer.css';
import { FaGithub, FaFacebookF , FaInstagram } from "react-icons/fa";

function Footer(){
    let currentYear = new Date().getFullYear();
    return(
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Contact Me</h3>
                            <p>Email: nikeshdhakal25@gmail.com</p>
                            <p>Phone: +977 9848050240</p>
                        </div>
                        <div className="col-md-4">
                            <h3>Follow Me</h3>
                            <ul className="social-icons">
                                <li><a href="https://github.com/nikeshdc-25"><FaGithub /></a></li>
                                <li><a href="https://facebook.com/nikeshdhakal25"><FaFacebookF /></a></li>
                                <li><a href="https://instagram.com/nikkey_25"><FaInstagram /></a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h3>Quick Links</h3>
                            <ul className="footer-links">
                                <li><a href="#">Home</a></li>
                                <li><a href="../About/aboutme.html">About Me</a></li>
                                <li><a href="tel:+9779848050240"><i className="fas fa-phone"></i> Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="text-center">© {currentYear} eCart. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
    )
}

export default Footer;