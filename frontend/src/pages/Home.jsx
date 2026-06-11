import React from 'react';
import { Link } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';
import { ArrowRight, HeartPulse, UserPlus, Pill, CheckCircle2, ChevronRight, Activity, Users, Building, Map } from 'lucide-react';
import Register from './Register';

const Home = () => {
  return (
    <div className="w-full">
      {/* 2. Hero Section */}
      <SectionWrapper className="bg-bgLight py-[120px]">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-2">
              Trusted Healthcare NGO
            </div>
            <h1 className="text-5xl md:text-[72px] font-bold text-primary leading-[1.1]">
              Healthcare Support,<br />Within Everyone's Reach
            </h1>
            <p className="text-textMuted text-lg leading-relaxed max-w-lg">
              Connecting patients, volunteers, and caregivers across India — because no one should face illness alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="bg-secondary text-white px-8 py-4 rounded-full shadow-soft hover:scale-[1.03] transition-transform duration-300 font-medium text-center">
                Register for Support
              </Link>
              <Link to="/register" className="bg-white text-secondary border border-secondary px-8 py-4 rounded-full shadow-soft hover:scale-[1.03] transition-transform duration-300 font-medium text-center">
                Become a Volunteer
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center">
             <svg className="w-full h-full max-w-md mx-auto drop-shadow-2xl" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="500" height="500" rx="250" fill="#EEF3FA"/>
              <path d="M250 150v200M150 250h200" stroke="#5A7CFF" strokeWidth="40" strokeLinecap="round" opacity="0.5"/>
              <circle cx="250" cy="250" r="120" fill="#2F5EFF" opacity="0.1"/>
              <path d="M250 200v100M200 250h100" stroke="#2F5EFF" strokeWidth="20" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. Support Services */}
      <SectionWrapper className="bg-bgSection py-[100px]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-[48px] font-bold text-primary">How We Support You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-[30px] shadow-soft p-10 hover:-translate-y-1 hover:shadow-medium transition-all duration-300 group">
              <div className="bg-bgLight w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
                <HeartPulse size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Patient Registration</h3>
              <p className="text-textMuted mb-6 line-clamp-3">Fast, simple forms to connect patients with the care they need.</p>
              <Link to="/register" className="text-secondary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={18} />
              </Link>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-[30px] shadow-soft p-10 hover:-translate-y-1 hover:shadow-medium transition-all duration-300 group">
              <div className="bg-bgLight w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
                <UserPlus size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Volunteer Matching</h3>
              <p className="text-textMuted mb-6 line-clamp-3">We pair skilled volunteers with patients based on need and location.</p>
              <Link to="/register" className="text-secondary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={18} />
              </Link>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-[30px] shadow-soft p-10 hover:-translate-y-1 hover:shadow-medium transition-all duration-300 group">
              <div className="bg-bgLight w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
                <Pill size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Medicine Assistance</h3>
              <p className="text-textMuted mb-6 line-clamp-3">Guidance on accessing affordable medicines and government schemes.</p>
              <Link to="/services" className="text-secondary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 4. Community Section */}
      <SectionWrapper className="bg-bgLight py-[100px]">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="w-full h-[500px] rounded-[40px] bg-gradient-to-br from-accent/20 to-secondary/30 relative overflow-hidden shadow-soft flex items-center justify-center">
             <svg className="w-32 h-32 text-secondary opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
              Our Community
            </div>
            <h2 className="text-4xl md:text-[48px] font-bold text-primary leading-tight">
              Building a Network of Care and Compassion
            </h2>
            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-secondary/10 p-1 rounded-full"><CheckCircle2 className="text-secondary" size={20} /></div>
                <p className="text-textMuted text-lg">Connecting generous donors with critical patient needs directly.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-secondary/10 p-1 rounded-full"><CheckCircle2 className="text-secondary" size={20} /></div>
                <p className="text-textMuted text-lg">Organizing local health camps in underserved rural areas.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-secondary/10 p-1 rounded-full"><CheckCircle2 className="text-secondary" size={20} /></div>
                <p className="text-textMuted text-lg">Fostering a community of medical professionals offering free tele-consultations.</p>
              </li>
            </ul>
            <div className="pt-4">
              <Link to="/about" className="bg-secondary text-white px-8 py-4 rounded-full shadow-soft hover:scale-[1.03] transition-transform duration-300 font-medium inline-block">
                Discover Our Impact
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 5. AI Assistant Section */}
      <SectionWrapper className="bg-bgSection py-[100px]">
        <div className="max-w-[800px] mx-auto px-8 text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mx-auto">
            Powered by AI
          </div>
          <h2 className="text-4xl md:text-[48px] font-bold text-primary leading-tight">
            Get Instant Answers, Anytime
          </h2>
          <p className="text-textMuted text-lg leading-relaxed pb-8">
            Our AI Health Assistant answers questions about registration, services, and general health — 24/7, in your language.
          </p>
          
          <div className="max-w-md mx-auto bg-white rounded-[40px] shadow-medium p-6 text-left relative z-10 mb-8 border border-border">
            <div className="flex gap-3 mb-6 items-end justify-end">
              <div className="bg-secondary text-white px-4 py-3 rounded-[20px] rounded-br-sm text-sm shadow-soft">
                How can I volunteer as a nurse?
              </div>
            </div>
            <div className="flex gap-3 items-end justify-start">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white text-xs">🤖</div>
              <div className="bg-bgSection text-textPrimary px-4 py-3 rounded-[20px] rounded-bl-sm text-sm shadow-soft">
                Thank you for your interest! You can register as a nurse by going to our "Get Involved" page and filling out the volunteer form. We'll match you with local patients in need of your skills.
              </div>
            </div>
          </div>

          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-secondary text-white px-8 py-4 rounded-full shadow-soft hover:scale-[1.03] transition-transform duration-300 font-medium inline-block">
            Chat with Assistant
          </button>
        </div>
      </SectionWrapper>

      {/* 6. Impact Statistics */}
      <SectionWrapper className="bg-primary py-[80px]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-white flex justify-center items-center gap-2">
                <Activity className="text-accent hidden sm:block" size={40} /> 2,400+
              </div>
              <p className="text-accent font-medium text-lg">Patients Supported</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-white flex justify-center items-center gap-2">
                <Users className="text-accent hidden sm:block" size={40} /> 380
              </div>
              <p className="text-accent font-medium text-lg">Active Volunteers</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-white flex justify-center items-center gap-2">
                <Building className="text-accent hidden sm:block" size={40} /> 12
              </div>
              <p className="text-accent font-medium text-lg">Partner Clinics</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-white flex justify-center items-center gap-2">
                <Map className="text-accent hidden sm:block" size={40} /> 6
              </div>
              <p className="text-accent font-medium text-lg">States Covered</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 7. Blog Section */}
      <SectionWrapper className="bg-bgLight py-[100px]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">News & Insights</div>
              <h2 className="text-4xl md:text-[48px] font-bold text-primary">Latest from our network</h2>
            </div>
            <Link to="/blogs" className="hidden md:flex text-secondary font-medium items-center gap-2 hover:gap-3 transition-all">
              View all posts <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Post */}
            <div className="lg:col-span-2 bg-white rounded-[32px] shadow-soft overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="h-[300px] md:h-[400px] w-full bg-gradient-to-br from-secondary/40 to-primary/40 relative"></div>
              <div className="p-8 md:p-10">
                <span className="bg-accent/10 text-accent text-xs font-bold rounded-full px-4 py-2 uppercase tracking-wider mb-4 inline-block">Events</span>
                <h3 className="text-3xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">Community Health Camp in Pune</h3>
                <p className="text-textMuted text-lg mb-6 line-clamp-2">Last week, our volunteers organized a free health checkup camp in Pune, reaching over 500 residents with essential screenings and medications.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-textMuted font-medium">May 12, 2026</span>
                  <Link to="/blogs/1" className="text-secondary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read more <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Smaller Posts */}
            <div className="space-y-8">
              <div className="bg-white rounded-[32px] shadow-soft overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="h-[200px] w-full bg-gradient-to-tr from-accent/30 to-bgLight relative"></div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="bg-accent/10 text-accent text-xs font-bold rounded-full px-3 py-1 uppercase tracking-wider mb-3 inline-block">Stories</span>
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2">Volunteer Spotlight: Dr. Meera Shah</h3>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-textMuted font-medium">May 05, 2026</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[32px] shadow-soft overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="h-[200px] w-full bg-gradient-to-bl from-primary/20 to-secondary/20 relative"></div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="bg-accent/10 text-accent text-xs font-bold rounded-full px-3 py-1 uppercase tracking-wider mb-3 inline-block">Guide</span>
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2">Accessing Free Medicines Under PM-JAY</h3>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-textMuted font-medium">April 28, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 8. Contact / Registration Form */}
      <div id="register-section">
        {/* Using Register component to reuse form but it has padding-top from its class. We can wrap it. */}
        <Register />
      </div>

    </div>
  );
};

export default Home;
