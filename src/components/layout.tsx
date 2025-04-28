import { Link } from "gatsby"
import * as React from "react"
import { useLocation } from "@reach/router"
// CSS
import "../styles/bootstrap.min.css"
import "../styles/templatemo-style.css"

interface LayoutProps {
  children: React.ReactNode
}

const navItem = [
  {
    path: "/",
    title: "Photos"
  },
  {
    path: "/videos/",
    title: "Videos"
  },
  {
    path: "/about/",
    title: "About"
  },
  {
    path: "/contact/",
    title: "Contact"
  }
]

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const path = useLocation().pathname.split("/")[1];
  const parentPath = path === '' || path === 'pages' || path === 'photos' ? '/' : `/${path}/`;

  React.useEffect(() => {
    document.querySelector("body")?.classList.add("loaded")
  });

  return (
    <div>
      <link rel="stylesheet" href="/fontawesome/css/all.min.css" />

      <div id="loader-wrapper">
        <div id="loader"></div>

        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>

      </div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-film mr-2"></i>
            Catalog-Z
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              {navItem.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link className={`nav-link nav-link-${index + 1} ${parentPath === item.path ? 'active' : ''}`} aria-current="page" to={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="tm-bg-gray pt-5 pb-3 tm-text-gray tm-footer">
        <div className="container-fluid tm-container-small">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 px-5 mb-5">
              <h3 className="tm-text-primary mb-4 tm-footer-title">About Catalog-Z</h3>
              <p>Catalog-Z is free <a rel="sponsored" href="https://v5.getbootstrap.com/">Bootstrap 5</a> Alpha 2 HTML Template for video and photo websites. You can freely use this TemplateMo layout for a front-end integration with any kind of CMS website.</p>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
              <h3 className="tm-text-primary mb-4 tm-footer-title">Our Links</h3>
              <ul className="tm-footer-links pl-0">
                <li><a href="#">Advertise</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Our Company</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
              <ul className="tm-social-links d-flex justify-content-end pl-0 mb-5">
                <li className="mb-2"><a href="https://facebook.com"><i className="fab fa-facebook"></i></a></li>
                <li className="mb-2"><a href="https://twitter.com"><i className="fab fa-twitter"></i></a></li>
                <li className="mb-2"><a href="https://instagram.com"><i className="fab fa-instagram"></i></a></li>
                <li className="mb-2"><a href="https://pinterest.com"><i className="fab fa-pinterest"></i></a></li>
              </ul>
              <a href="#" className="tm-text-gray text-right d-block mb-2">Terms of Use</a>
              <a href="#" className="tm-text-gray text-right d-block">Privacy Policy</a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-7 col-12 px-5 mb-3">
              Copyright 2020 Catalog-Z Company. All rights reserved.
            </div>
            <div className="col-lg-4 col-md-5 col-12 px-5 text-right">
              Designed by <a href="https://templatemo.com" className="tm-text-gray" rel="sponsored" target="_parent">TemplateMo</a>
            </div>
          </div>
        </div>
      </footer>
      <script src="/js/plugins.js"></script>
    </div>
  )
}

export default Layout