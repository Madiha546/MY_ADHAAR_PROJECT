import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, MapPin, Phone, Mail, Camera, CheckCircle } from 'lucide-react';
import Avatar from '../components/Avatar';

const Enrollment: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    pincode: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [avatarEmotion, setAvatarEmotion] = useState<'happy' | 'excited' | 'thinking' | 'celebrating'>('happy');

  const indianNames = [
    'Aarav Kumar', 'Vivaan Singh', 'Aditya Sharma', 'Vihaan Gupta', 'Arjun Patel',
    'Ananya Devi', 'Diya Kumari', 'Saanvi Sharma', 'Aadhya Singh', 'Kavya Patel'
  ];

  const festivals = [
    { date: '2025-01-26', name: 'Republic Day' },
    { date: '2025-03-14', name: 'Holi' },
    { date: '2025-08-15', name: 'Independence Day' },
    { date: '2025-10-02', name: 'Gandhi Jayanti' },
    { date: '2025-11-01', name: 'Diwali' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Avatar reactions
    if (field === 'name' && value.length > 0) {
      setAvatarEmotion('excited');
    } else if (field === 'pincode' && value.length === 6) {
      setAvatarEmotion('celebrating');
      // Simulate PIN code validation
      setTimeout(() => {
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance('Great! Valid PIN code detected!');
          utterance.rate = 1.2;
          window.speechSynthesis.speak(utterance);
        }
      }, 500);
    } else {
      setAvatarEmotion('thinking');
    }
  };

  const getNameSuggestions = (input: string) => {
    return indianNames.filter(name => 
      name.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 3);
  };

  const steps = [
    { number: 1, title: 'Personal Details', icon: User },
    { number: 2, title: 'Contact Info', icon: Phone },
    { number: 3, title: 'Address', icon: MapPin },
    { number: 4, title: 'Verification', icon: Camera }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-gray-800 mb-2">
            New Aadhaar Enrollment
          </h1>
          <p className="font-poppins text-lg text-saffron mb-1">नया आधार नामांकन</p>
          <p className="font-barlow text-gray-600">
            Let's get you registered with your unique digital identity
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number
                    ? 'bg-saffron border-saffron text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    currentStep > step.number ? 'bg-saffron' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <span key={step.number} className="text-xs font-barlow text-gray-600 text-center">
                {step.title}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg text-center sticky top-24">
              <h3 className="font-poppins font-semibold text-lg mb-4">Your Assistant</h3>
              <div className="flex justify-center mb-4">
                <Avatar
                  type="south-indian"
                  isActive={true}
                  size="lg"
                  emotion={avatarEmotion}
                />
              </div>
              <p className="font-barlow text-gray-600 text-sm">
                I'm here to help you through the enrollment process!
              </p>
              <div className="mt-4 p-3 bg-soft-pink/20 rounded-lg">
                <p className="font-barlow text-xs text-gray-700">
                  💡 Tip: Fill out all fields accurately for faster processing
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="font-poppins font-semibold text-xl mb-6">Personal Information</h3>
                  
                  {/* Name Field with Auto-suggest */}
                  <div>
                    <label className="block font-barlow font-medium text-gray-700 mb-2">
                      Full Name | पूरा नाम *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                      {formData.name && getNameSuggestions(formData.name).length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                          {getNameSuggestions(formData.name).map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleInputChange('name', suggestion)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 font-barlow text-sm"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth with Festival Markers */}
                  <div>
                    <label className="block font-barlow font-medium text-gray-700 mb-2">
                      Date of Birth | जन्म तिथि *
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                    />
                    <div className="mt-2 text-xs text-gray-500 font-barlow">
                      🎉 Upcoming festivals: {festivals.slice(0, 2).map(f => f.name).join(', ')}
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block font-barlow font-medium text-gray-700 mb-2">
                      Gender | लिंग *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Male', 'Female', 'Other'].map((gender) => (
                        <button
                          key={gender}
                          onClick={() => handleInputChange('gender', gender)}
                          className={`px-4 py-3 rounded-lg border transition-all duration-300 font-barlow ${
                            formData.gender === gender
                              ? 'bg-saffron text-white border-saffron'
                              : 'border-gray-300 hover:border-saffron'
                          }`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="font-poppins font-semibold text-xl mb-6">Contact Information</h3>
                  
                  <div>
                    <label className="block font-barlow font-medium text-gray-700 mb-2">
                      Mobile Number | मोबाइल नंबर *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block font-barlow font-medium text-gray-700 mb-2">
                      Email Address | ईमेल पता
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="font-poppins font-semibold text-xl mb-6">Address Details</h3>
                  
                  <div>
                    <label className="block font-barlow font-medium text-gray-700 mb-2">
                      Full Address | पूरा पता *
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                      placeholder="House/Flat No, Street, Area, City, State"
                    />
                  </div>

                  <div>
                    <label className="block font-barlow font-medium text-gray-700 mb-2">
                      PIN Code | पिन कोड *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                      placeholder="XXXXXX"
                    />
                    {formData.pincode.length === 6 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-green-600 text-sm font-barlow flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Valid PIN code detected!
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 text-center">
                  <h3 className="font-poppins font-semibold text-xl mb-6">Biometric Verification</h3>
                  
                  <div className="bg-gradient-to-br from-saffron/10 to-india-green/10 rounded-xl p-8">
                    <Camera className="w-16 h-16 mx-auto text-saffron mb-4" />
                    <h4 className="font-poppins font-semibold text-lg mb-2">Ready for Capture!</h4>
                    <p className="font-barlow text-gray-600 mb-6">
                      Your biometric data will be captured at the enrollment center
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-saffron to-orange-500 text-white px-8 py-3 rounded-full font-poppins font-semibold"
                    >
                      Complete Enrollment
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className={`px-6 py-2 rounded-lg font-barlow font-medium transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                
                <button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  disabled={currentStep === 4}
                  className={`px-6 py-2 rounded-lg font-barlow font-medium transition-all duration-300 ${
                    currentStep === 4
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-saffron text-white hover:bg-orange-500'
                  }`}
                >
                  {currentStep === 4 ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;