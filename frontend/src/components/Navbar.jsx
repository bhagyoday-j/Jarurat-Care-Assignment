import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Get Involved', path: '/register' },
    { name: 'News & Blogs', path: '/blogs' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className="h-[90px] bg-white sticky top-0 z-40 shadow-soft flex items-center">
      <div className="max-w-[1440px] mx-auto w-full px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-primary font-bold text-2xl flex items-center gap-2">
          Jarurat Care
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-textPrimary font-medium transition-colors hover:text-secondary py-2 ${
                location.pathname === link.path ? 'border-b-2 border-secondary text-secondary' : 'border-b-2 border-transparent'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right CTA */}
        <div>
          <Link
            to="/register"
            className="bg-secondary text-white px-6 py-3 rounded-full shadow-soft hover:scale-[1.03] transition-transform duration-300 font-medium inline-block"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
