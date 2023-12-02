import { Nav } from "./Header";

const currentYear = new Date().getFullYear();

const Footer = () => {
    return <footer>
        <div className="footer-banner">
            {/* <img src='https://placehold.co/1000x1000/png' /> */}
            <img src='/images/space.jpg' />
        </div>
        <div className="footer-logo">
            {/* <img src='https://placehold.co/1000x1000/png' /> */}
            <img src='/images/grok2.png' />
        </div>
        <a href="mailto:Groktwoerc@Gmail.Com">Groktwoerc@Gmail.Com</a>
        <Nav />
        <div className="copyright">
            Copyright: © {currentYear} GROK 2.0. All Rights Reserved.
        </div>
    </footer>
}

export default Footer;