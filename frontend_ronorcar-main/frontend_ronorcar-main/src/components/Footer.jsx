import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../images/logo/Untitled-1-01.png";


function Footer() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Define the array of footer sections
  const footerSections = [
    {
      title: "About",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Our Team", path: "/team" },
        { label: "Careers", path: "/careers" },
        { label: "Blog", path: "/blog" }
      ]
    },
    {
      title: "Help",
      links: [
        { label: "FAQ", path: "/faq" },
        { label: "Support", path: "/support" },
        { label: "Contact Us", path: "/contact" },
        { label: "Terms & Conditions", path: "/terms" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Car Rental", path: "/rental" },
        { label: "Leasing", path: "/leasing" },
        { label: "Insurance", path: "/insurance" },
        { label: "Maintenance", path: "/maintenance" }
      ]
    },
    {
      title: "Locations",
      links: [
        { label: "AL-Hoceima", path: "/location/AL-Hoceima" },
        { label: "Casablanca", path: "/location/Casablanca" },
        { label: "Rabat", path: "/location/Rabat" },
        { label: "Tanger", path: "/location/Tanger" },
        { label: "More Location > coming soon...", path: "/coming-soon" }
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <div className="logo-name-section">
            <img src={Logo} alt="Logo" />
          <h1>CAR Rental</h1>
          </div>
          <p>Explore our diverse fleet of vehicles, meticulously selected to match your every journey. Discover the ideal ride to suit your style and needs effortlessly.</p>
          <div>
            <Link to="tel:0687654321">
              <i className="fa-solid fa-phone"></i> &nbsp; (+212) 6-87654321
            </Link>
          </div>
          <div>
            <Link to="mailto:RonorCar@gmail.com">
              <i className="fa-solid fa-envelope"></i> &nbsp; RonorCar@gmail.com
            </Link>
          </div>
        </div>

        {/* Map over the footerSections array to render each section */}
        {footerSections.map((section, index) => (
          <div className="footer-section" key={index}>
            <h3>{section.title}</h3>
            <ul>
              {/* Map over the links in each section and render them */}
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={() => {
                      window.scrollTo(0, 0); // Scroll to the top
                      navigate(link.path); // Navigate to the link
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-section">
          <h3>Subscribe</h3>
          <p>Stay in the driver&apos;s seat of our latest offers and updates. Sign up now for exclusive deals and news tailored just for you!</p>
          <div className='email-btn-sbt' style={{ display: 'flex' }}>
          <i className="fa-solid fa-envelope"></i>            
          <input 
              type="email" 
              placeholder="Enter Email Address" 
            />
            <button>Submit</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CAR Rental. All rights reserved.</p>
        <div className="social-links">
          <a href="#"><i className="fa-brands fa-facebook"></i></a>
          <a href="#"><i className="fa-brands fa-twitter"></i></a>
          <a href="#"><i className="fa-brands fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
