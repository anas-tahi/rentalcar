import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../images/logo/Untitled-1-01.png";

function Footer() {
  const navigate = useNavigate();

  // Define footer sections with better organization
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Our Fleet", path: "/cars" },
        { label: "Special Offers", path: "/offers" },
        { label: "Customer Support", path: "/support" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Car Rental", path: "/rental" },
        { label: "Long Term Leasing", path: "/leasing" },
        { label: "Insurance Options", path: "/insurance" },
        { label: "Airport Transfer", path: "/transfer" },
        { label: "Chauffeur Service", path: "/chauffeur" }
      ]
    },
    {
      title: "Contact Info",
      links: [
        { label: "24/7 Support", path: "/contact" },
        { label: "Emergency Hotline", path: "/emergency" },
        { label: "WhatsApp Support", path: "/whatsapp" },
        { label: "Email Us", path: "/email" }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-black mb-2">
                <i className="fas fa-envelope mr-2"></i>
                Stay Connected With Exclusive Offers
              </h3>
              <p className="text-black text-opacity-90 mb-4">
                Join our premium membership for special discounts, early access to new vehicles, and personalized travel recommendations.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-black placeholder-gray-400 bg-white bg-opacity-90 backdrop-blur-sm border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button className="bg-black text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <Link to="/" className="flex items-center space-x-3 mb-6 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <img src={Logo} alt="CAR Rental" className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                      CAR Rental
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Premium Vehicle Services
                    </p>
                  </div>
                </Link>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors">
                    <i className="fas fa-phone-alt text-yellow-400"></i>
                    <div>
                      <p className="text-sm">24/7 Hotline</p>
                      <p className="font-semibold">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors">
                    <i className="fas fa-envelope text-yellow-400"></i>
                    <div>
                      <p className="text-sm">Email Support</p>
                      <p className="font-semibold">support@carrental.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors">
                    <i className="fas fa-map-marker-alt text-yellow-400"></i>
                    <div>
                      <p className="text-sm">Head Office</p>
                      <p className="font-semibold">123 Luxury Street, Downtown</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h4 className="text-lg font-semibold text-yellow-400 mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2 group"
                      >
                        <i className="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        <span className="border-l border-gray-600 group-hover:border-yellow-400 transition-colors pl-2"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Media */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-yellow-600 hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-yellow-600 hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <i className="fab fa-twitter text-lg"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-yellow-600 hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-yellow-600 hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <i className="fab fa-linkedin text-lg"></i>
                </a>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-center text-gray-400 text-sm">
                  2024 CAR Rental. All rights reserved. | 
                  <Link to="/privacy" className="text-yellow-400 hover:text-yellow-300 transition-colors">Privacy Policy</Link> | 
                  <Link to="/terms" className="text-yellow-400 hover:text-yellow-300 transition-colors">Terms of Service</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
