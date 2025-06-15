import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Shield, Globe, ChevronRight } from 'lucide-react';
import Avatar from '../components/Avatar';

const Home: React.FC = () => {
  const [currentAvatar, setCurrentAvatar] = useState(0);
  const [currentTrivia, setCurrentTrivia] = useState(0);
  const [hasGreeted, setHasGreeted] = useState(false);

  const avatars = ['punjabi', 'south-indian', 'northeast', 'farmer'] as const;
  
  const triviaFacts = [
    "Aadhaar is the world's largest biometric ID system with over 1.3 billion enrollments! 🌍",
    "The word 'Aadhaar' means 'foundation' or 'support' in Hindi 🏗️",
    "Aadhaar authentication happens 2.5 billion times per month! ⚡",
    "It takes less than 10 minutes to enroll for Aadhaar 🕐",
    "Aadhaar has helped save over ₹2.2 lakh crores by eliminating duplicates 💰"
  ];

  const services = [
    {
      title: 'New Enrollment',
      hindi: 'नया नामांकन',
      description: 'Get your first Aadhaar card',
      icon: Users,
      color: 'from-green-400 to-green-600',
      path: '/enrollment'
    },
    {
      title: 'Update Details',
      hindi: 'विवरण अपडेट करें',
      description: 'Modify your existing information',
      icon: Shield,
      color: 'from-blue-400 to-blue-600',
      path: '/update'
    },
    {
      title: 'Check Status',
      hindi: 'स्थिति जांचें',
      description: 'Track your application progress',
      icon: Globe,
      color: 'from-purple-400 to-purple-600',
      path: '/status'
    }
  ];

  // Voice greeting on component mount
  useEffect(() => {
    if (!hasGreeted && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance('Namaste! Welcome to your Aadhaar services portal!');
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.lang = 'en-IN';
      
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
        setHasGreeted(true);
      }, 1000);
    }
  }, [hasGreeted]);

  // Avatar carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAvatar((prev) => (prev + 1) % avatars.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Trivia rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrivia((prev) => (prev + 1) % triviaFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="font-poppins font-bold text-4xl md:text-6xl text-gray-800 mb-4">
              <span className="text-saffron">आपका स्वागत है!</span>
            </h1>
            <h2 className="font-poppins font-semibold text-2xl md:text-4xl text-gray-700 mb-2">
              Welcome to Your Aadhaar Portal
            </h2>
            <p className="font-barlow text-lg text-gray-600 max-w-2xl mx-auto">
              Your digital identity, simplified. Experience the future of secure, convenient Aadhaar services.
            </p>
          </motion.div>

          {/* Avatar Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex justify-center items-center space-x-4 mb-4">
              {avatars.map((avatar, index) => (
                <div key={avatar} className="group relative">
                  <Avatar
                    type={avatar}
                    isActive={index === currentAvatar}
                    size="lg"
                    emotion={index === currentAvatar ? 'excited' : 'happy'}
                  />
                </div>
              ))}
            </div>
            <motion.p
              key={currentAvatar}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-barlow text-gray-600"
            >
              Serving all of India with pride and inclusivity
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/enrollment"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron to-orange-500 text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-saffron/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-india-green/20 rounded-full blur-xl"></div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="font-poppins font-bold text-3xl text-gray-800 mb-4">
              Our Services | हमारी सेवाएं
            </h3>
            <p className="font-barlow text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of Aadhaar services designed for your convenience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={service.path}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-poppins font-semibold text-xl text-gray-800 mb-2">
                      {service.title}
                    </h4>
                    <p className="font-barlow text-sm text-saffron mb-2">{service.hindi}</p>
                    <p className="font-barlow text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center text-saffron group-hover:translate-x-2 transition-transform duration-300">
                      <span className="font-barlow font-medium">Learn More</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-saffron/10 via-white to-india-green/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-saffron mr-3" />
              <h3 className="font-poppins font-bold text-2xl text-gray-800">
                Did You Know? | क्या आप जानते हैं?
              </h3>
              <Sparkles className="w-8 h-8 text-saffron ml-3" />
            </div>
            
            <motion.div
              key={currentTrivia}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-saffron"
            >
              <p className="font-barlow text-lg text-gray-700 leading-relaxed">
                {triviaFacts[currentTrivia]}
              </p>
            </motion.div>

            <div className="flex justify-center mt-6 space-x-2">
              {triviaFacts.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTrivia ? 'bg-saffron' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Aadhaar Story CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-saffron to-india-green rounded-2xl p-8 text-white"
          >
            <h3 className="font-poppins font-bold text-3xl mb-4">
              Discover the Aadhaar Journey
            </h3>
            <p className="font-barlow text-lg mb-6 opacity-90">
              Explore the incredible story of how Aadhaar transformed India's digital landscape
            </p>
            <Link
              to="/story"
              className="inline-flex items-center space-x-2 bg-white text-saffron px-6 py-3 rounded-full font-poppins font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span>Explore Timeline</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;