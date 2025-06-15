import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Flag, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', hindi: 'घर' },
    { path: '/enrollment', label: 'New Aadhaar', hindi: 'नया आधार' },
    { path: '/update', label: 'Update', hindi: 'अपडेट' },
    { path: '/status', label: 'Status', hindi: 'स्थिति' },
    { path: '/story', label: 'Aadhaar Story', hindi: 'आधार कहानी' },
  ];

  const playNationalAnthem = () => {
    // Easter egg: Play national anthem on Ctrl+Click
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance('Jana Gana Mana Adhinayaka Jaya He');
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-4 border-saffron shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-saffron to-india-green rounded-full flex items-center justify-center"
            >
              <Flag 
                className="w-6 h-6 text-white cursor-pointer" 
                onMouseDown={(e) => {
                  if (e.ctrlKey) playNationalAnthem();
                }}
              />
            </motion.div>
            <div>
              <h1 className="font-poppins font-bold text-xl text-gray-800">
                My Aadhaar My Pehchan
              </h1>
              <p className="font-barlow text-sm text-gray-600">मेरा आधार मेरी पहचान</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative group px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-saffron text-white'
                    : 'text-gray-700 hover:bg-saffron/10'
                }`}
              >
                <span className="font-barlow font-medium">{item.label}</span>
                <span className="block text-xs opacity-70">{item.hindi}</span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-saffron rounded-lg -z-10"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-200"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg mt-2 transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-saffron text-white'
                    : 'text-gray-700 hover:bg-saffron/10'
                }`}
              >
                <span className="font-barlow font-medium">{item.label}</span>
                <span className="block text-xs opacity-70">{item.hindi}</span>
              </Link>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;