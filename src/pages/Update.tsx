import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Camera, User, CheckCircle, AlertCircle } from 'lucide-react';
import Avatar from '../components/Avatar';

const Update: React.FC = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showPehchanScan, setShowPehchanScan] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Mock user data
  const mockUserData = {
    name: 'Priya Sharma',
    dob: '1995-03-15',
    gender: 'Female',
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    address: '123, MG Road, Bangalore, Karnataka',
    pincode: '560001'
  };

  const handleAadhaarVerification = () => {
    if (aadhaarNumber.length === 12) {
      setIsVerified(true);
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance('Aadhaar verified successfully! Welcome back, Priya!');
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const startPehchanScan = () => {
    setShowPehchanScan(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowPehchanScan(false);
            if (window.speechSynthesis) {
              const utterance = new SpeechSynthesisUtterance('Pehchan scan complete! Identity verified successfully!');
              utterance.rate = 1.1;
              window.speechSynthesis.speak(utterance);
            }
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

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
            Update Aadhaar Details
          </h1>
          <p className="font-poppins text-lg text-saffron mb-1">अपना आधार अपडेट करें</p>
          <p className="font-barlow text-gray-600">
            Keep your information current and secure
          </p>
        </motion.div>

        {!isVerified ? (
          /* Verification Section */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-saffron to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="font-poppins font-semibold text-xl mb-4">Verify Your Aadhaar</h3>
              <p className="font-barlow text-gray-600 mb-6">
                Enter your 12-digit Aadhaar number to proceed
              </p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  placeholder="XXXX XXXX XXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300 text-center text-lg tracking-widest"
                />
                
                <motion.button
                  onClick={handleAadhaarVerification}
                  disabled={aadhaarNumber.length !== 12}
                  whileHover={{ scale: aadhaarNumber.length === 12 ? 1.05 : 1 }}
                  whileTap={{ scale: aadhaarNumber.length === 12 ? 0.95 : 1 }}
                  className={`w-full py-3 rounded-lg font-poppins font-semibold transition-all duration-300 ${
                    aadhaarNumber.length === 12
                      ? 'bg-gradient-to-r from-saffron to-orange-500 text-white hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Verify Aadhaar
                </motion.button>
              </div>
              
              <div className="mt-6 p-4 bg-sky-blue/10 rounded-lg">
                <p className="font-barlow text-xs text-gray-600">
                  🔒 Your data is encrypted and secure. We follow UIDAI guidelines.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Update Form Section */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Avatar & Pehchan Scan */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg text-center sticky top-24">
                <h3 className="font-poppins font-semibold text-lg mb-4">Identity Verified</h3>
                <div className="flex justify-center mb-4">
                  <Avatar
                    type="south-indian"
                    isActive={true}
                    size="lg"
                    emotion="celebrating"
                  />
                </div>
                <p className="font-barlow text-gray-600 text-sm mb-4">
                  Welcome back, {mockUserData.name}!
                </p>
                
                {/* Pehchan Scan Feature */}
                <div className="mt-6 p-4 bg-gradient-to-br from-soft-pink/20 to-sky-blue/20 rounded-lg">
                  <h4 className="font-poppins font-semibold text-sm mb-2">🔍 Pehchan Scan</h4>
                  <p className="font-barlow text-xs text-gray-600 mb-3">
                    Verify your identity with our innovative selfie verification
                  </p>
                  
                  {!showPehchanScan ? (
                    <motion.button
                      onClick={startPehchanScan}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-saffron to-orange-500 text-white py-2 rounded-lg font-barlow font-medium text-sm"
                    >
                      Start Scan
                    </motion.button>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-saffron to-orange-500 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scanProgress}%` }}
                          className="bg-gradient-to-r from-saffron to-orange-500 h-2 rounded-full"
                        />
                      </div>
                      <p className="font-barlow text-xs text-gray-600">
                        Scanning... {scanProgress}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Update Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-poppins font-semibold text-xl">Update Information</h3>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-barlow text-sm">Verified</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-barlow font-medium text-gray-700 mb-2">
                        Full Name | पूरा नाम
                      </label>
                      <input
                        type="text"
                        defaultValue={mockUserData.name}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block font-barlow font-medium text-gray-700 mb-2">
                        Date of Birth | जन्म तिथि
                      </label>
                      <input
                        type="date"
                        defaultValue={mockUserData.dob}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-barlow font-medium text-gray-700 mb-2">
                        Mobile Number | मोबाइल नंबर
                      </label>
                      <input
                        type="tel"
                        defaultValue={mockUserData.phone}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block font-barlow font-medium text-gray-700 mb-2">
                        Email Address | ईमेल पता
                      </label>
                      <input
                        type="email"
                        defaultValue={mockUserData.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block font-barlow font-medium text-gray-700 mb-2">
                      Address | पता
                    </label>
                    <textarea
                      defaultValue={mockUserData.address}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block font-barlow font-medium text-gray-700 mb-2">
                      PIN Code | पिन कोड
                    </label>
                    <input
                      type="text"
                      defaultValue={mockUserData.pincode}
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Update Options */}
                  <div className="bg-gradient-to-r from-saffron/10 to-india-green/10 rounded-lg p-6">
                    <h4 className="font-poppins font-semibold text-lg mb-4">What would you like to update?</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Name', 'Date of Birth', 'Gender', 'Mobile Number',
                        'Email Address', 'Address', 'Photo', 'Biometrics'
                      ].map((option) => (
                        <label key={option} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-saffron border-gray-300 rounded focus:ring-saffron"
                          />
                          <span className="font-barlow text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-barlow text-sm text-yellow-800">
                        <strong>Important:</strong> Some updates may require document verification and biometric authentication at an Aadhaar center.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-saffron to-orange-500 text-white py-4 rounded-lg font-poppins font-semibold text-lg hover:shadow-lg transition-all duration-300"
                  >
                    Submit Update Request
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;