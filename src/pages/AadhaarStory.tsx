import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Calendar, Users, Globe, Award, TrendingUp, Shield } from 'lucide-react';

const AadhaarStory: React.FC = () => {
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const milestones = [
    {
      year: 2009,
      title: 'The Vision Begins',
      hindi: 'दृष्टि की शुरुआत',
      description: 'Planning Committee on Aadhaar established under the leadership of Nandan Nilekani',
      icon: Globe,
      color: 'from-blue-400 to-blue-600',
      stats: 'Foundation Year',
      details: 'The Unique Identification Authority of India (UIDAI) was established to provide every resident a unique identity.'
    },
    {
      year: 2010,
      title: 'First Enrollment',
      hindi: 'पहला नामांकन',
      description: 'Ranjana Sonawane from Maharashtra becomes the first person to enroll for Aadhaar',
      icon: Users,
      color: 'from-green-400 to-green-600',
      stats: '1st Enrollment',
      details: 'The historic moment when India began its journey towards digital identity for all.'
    },
    {
      year: 2012,
      title: 'Rapid Expansion',
      hindi: 'तेज़ विस्तार',
      description: 'Aadhaar enrollment crosses 200 million, proving the scalability of the system',
      icon: TrendingUp,
      color: 'from-purple-400 to-purple-600',
      stats: '200M+ Enrollments',
      details: 'Massive infrastructure deployment across India to reach every corner of the nation.'
    },
    {
      year: 2016,
      title: 'Legal Foundation',
      hindi: 'कानूनी आधार',
      description: 'Aadhaar Act passed by Parliament, providing legal framework for the program',
      icon: Shield,
      color: 'from-red-400 to-red-600',
      stats: 'Legal Framework',
      details: 'The Aadhaar Act 2016 established the legal foundation for Aadhaar as a tool for service delivery.'
    },
    {
      year: 2018,
      title: 'Supreme Court Validation',
      hindi: 'सुप्रीम कोर्ट की मान्यता',
      description: 'Supreme Court upholds Aadhaar as constitutionally valid with certain safeguards',
      icon: Award,
      color: 'from-yellow-400 to-yellow-600',
      stats: 'Constitutional Validity',
      details: 'The highest court of India validated Aadhaar while ensuring privacy protections.'
    },
    {
      year: 2025,
      title: 'Digital India Realized',
      hindi: 'डिजिटल इंडिया साकार',
      description: 'Over 1.3 billion Aadhaar numbers issued, transforming India into a digitally empowered society',
      icon: Globe,
      color: 'from-saffron to-orange-500',
      stats: '1.3B+ Enrollments',
      details: 'Aadhaar has become the backbone of Digital India, enabling seamless service delivery.'
    }
  ];

  const playNarration = (milestone: any) => {
    if (window.speechSynthesis) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const text = `In ${milestone.year}, ${milestone.title}. ${milestone.description}. ${milestone.details}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.lang = 'en-IN';
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopNarration = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            The Aadhaar Journey
          </h1>
          <p className="font-poppins text-xl text-saffron mb-2">आधार की कहानी</p>
          <p className="font-barlow text-gray-600 max-w-3xl mx-auto text-lg">
            Discover how Aadhaar transformed from a visionary idea to the world's largest digital identity program,
            empowering over 1.3 billion Indians with a unique digital identity.
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-saffron to-india-green h-full"></div>

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => setCurrentMilestone(index)}
                    className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer border-2 transition-all duration-300 ${
                      currentMilestone === index ? 'border-saffron shadow-xl' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${milestone.color} rounded-lg flex items-center justify-center`}>
                        <milestone.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="font-poppins font-bold text-2xl text-gray-800">{milestone.year}</div>
                        <div className="font-barlow text-sm text-saffron">{milestone.stats}</div>
                      </div>
                    </div>
                    
                    <h3 className="font-poppins font-bold text-xl text-gray-800 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="font-barlow text-sm text-saffron mb-3">{milestone.hindi}</p>
                    <p className="font-barlow text-gray-600 mb-4">{milestone.description}</p>
                    
                    {currentMilestone === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-gray-200 pt-4"
                      >
                        <p className="font-barlow text-sm text-gray-700 mb-4">{milestone.details}</p>
                        <div className="flex items-center space-x-3">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isPlaying) {
                                stopNarration();
                              } else {
                                playNarration(milestone);
                              }
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 bg-gradient-to-r from-saffron to-orange-500 text-white px-4 py-2 rounded-lg font-barlow font-medium text-sm"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span>{isPlaying ? 'Stop' : 'Listen'}</span>
                          </motion.button>
                          <span className="font-barlow text-xs text-gray-500">Click to hear narration</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-6 h-6 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                      currentMilestone === index ? 'bg-saffron' : 'bg-gray-400'
                    }`}
                  />
                  {currentMilestone === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -inset-2 bg-saffron/20 rounded-full"
                    />
                  )}
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-saffron to-india-green rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="font-poppins font-bold text-3xl mb-4">Aadhaar Impact Today</h3>
            <p className="font-barlow text-lg opacity-90">
              Transforming lives across India with digital empowerment
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: '1.3B+', label: 'Enrollments', icon: Users },
              { number: '2.5B+', label: 'Monthly Authentications', icon: Shield },
              { number: '₹2.2L Cr', label: 'Savings from Duplicates', icon: TrendingUp },
              { number: '99.9%', label: 'Uptime Reliability', icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-poppins font-bold text-3xl mb-2">{stat.number}</div>
                <div className="font-barlow text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Place in History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <Calendar className="w-16 h-16 text-saffron mx-auto mb-4" />
            <h3 className="font-poppins font-bold text-2xl text-gray-800 mb-4">
              Your Place in This Journey
            </h3>
            <p className="font-barlow text-gray-600 mb-6">
              By using this portal today, you're part of the continuing Aadhaar story. 
              Every enrollment, every update, every authentication contributes to building 
              a more inclusive and digitally empowered India.
            </p>
            <div className="bg-gradient-to-r from-saffron/10 to-india-green/10 rounded-lg p-4">
              <p className="font-barlow text-sm text-gray-700">
                <strong>Fun Fact:</strong> If you enrolled today, you would be among the 
                1.3+ billion Indians who have embraced digital identity! 🇮🇳
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AadhaarStory;