import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-saffron via-white to-india-green py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Spinning Chakra Logo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 bg-chakra-gold rounded-full flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          {/* Made with Love */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-2 text-gray-700 mb-4"
          >
            <span className="font-barlow">Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-red-500 fill-current" />
            </motion.div>
            <span className="font-barlow">by</span>
            <span className="font-poppins font-semibold text-saffron">Madiha Maheen</span>
            <span className="font-barlow">for UIDAI Internship 2025</span>
          </motion.div>

          {/* Digital India */}
          <div className="text-sm text-gray-600 font-barlow">
            <p>Empowering Digital India 🇮🇳</p>
            <p className="mt-1">आत्मनिर्भर भारत | Self-Reliant India</p>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-gray-300 text-xs text-gray-500">
            <p>&copy; 2025 UIDAI. This is a demonstration project for educational purposes.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;