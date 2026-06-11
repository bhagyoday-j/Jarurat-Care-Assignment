import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto w-full px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-2xl flex items-center gap-2">
              🏥 Jarurat Care
            </h3>
            <p className="text-accent text-sm leading-relaxed">
              Connecting patients, volunteers, and caregivers across India — because no one should face illness alone.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-white hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-white hover:text-accent transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-white hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white hover:text-accent transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-accent hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-accent hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/register" className="text-accent hover:text-white transition-colors text-sm">Get Involved</Link></li>
              <li><Link to="/blogs" className="text-accent hover:text-white transition-colors text-sm">News & Blogs</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-accent hover:text-white transition-colors text-sm">Patient Support</Link></li>
              <li><Link to="/register" className="text-accent hover:text-white transition-colors text-sm">Volunteer Registration</Link></li>
              <li><Link to="/services" className="text-accent hover:text-white transition-colors text-sm">Medicine Assistance</Link></li>
              <li><Link to="/services" className="text-accent hover:text-white transition-colors text-sm">Health Schemes</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-accent text-sm">123 Health Avenue, New Delhi, India 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span className="text-accent text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <span className="text-accent text-sm">support@jarurat.care</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-accent">
          <p>© 2026 Jarurat Care Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Facebook = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Twitter = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Instagram = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Linkedin = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

export default Footer;
