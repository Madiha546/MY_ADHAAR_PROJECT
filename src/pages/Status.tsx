import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, CheckCircle, XCircle, AlertTriangle, Download, RefreshCw } from 'lucide-react';

const Status: React.FC = () => {
  const [eid, setEid] = useState('');
  const [statusData, setStatusData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockStatuses = {
    '1234567890123456': {
      status: 'in-progress',
      title: 'Enrollment In Progress',
      message: 'Your Aadhaar enrollment is being processed',
      timestamp: '2025-01-15 14:30:00',
      estimatedCompletion: '2-3 working days',
      steps: [
        { name: 'Application Received', completed: true },
        { name: 'Biometric Verification', completed: true },
        { name: 'Document Verification', completed: false },
        { name: 'Quality Check', completed: false },
        { name: 'Aadhaar Generation', completed: false }
      ]
    },
    '9876543210987654': {
      status: 'accepted',
      title: 'Aadhaar Generated Successfully!',
      message: 'Your Aadhaar has been generated and is ready for download',
      timestamp: '2025-01-14 16:45:00',
      aadhaarNumber: '1234 5678 9012',
      downloadUrl: '#'
    },
    '5555666677778888': {
      status: 'rejected',
      title: 'Enrollment Rejected',
      message: 'Your enrollment could not be processed due to quality issues',
      timestamp: '2025-01-13 11:20:00',
      reason: 'Biometric quality insufficient',
      nextSteps: [
        'Visit nearest Aadhaar center for re-enrollment',
        'Ensure clean fingers for fingerprint capture',
        'Carry original documents for verification'
      ]
    }
  };

  const handleStatusCheck = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const status = mockStatuses[eid as keyof typeof mockStatuses];
      setStatusData(status || null);
      setIsLoading(false);
      
      if (status) {
        // Voice feedback based on status
        if (window.speechSynthesis) {
          let message = '';
          switch (status.status) {
            case 'in-progress':
              message = 'Your Aadhaar is being processed. Please wait for completion.';
              break;
            case 'accepted':
              message = 'Congratulations! Your Aadhaar has been generated successfully!';
              break;
            case 'rejected':
              message = 'Your enrollment was rejected. Please check the details for next steps.';
              break;
          }
          
          const utterance = new SpeechSynthesisUtterance(message);
          utterance.rate = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      }
    }, 2000);
  };

  const triggerConfetti = () => {
    // Simple confetti effect using CSS animations
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'fixed inset-0 pointer-events-none z-50';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-2 h-2 bg-saffron rounded-full animate-bounce';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 3000);
  };

  React.useEffect(() => {
    if (statusData?.status === 'accepted') {
      triggerConfetti();
    }
  }, [statusData]);

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
            Check Aadhaar Status
          </h1>
          <p className="font-poppins text-lg text-saffron mb-1">आधार स्थिति जांचें</p>
          <p className="font-barlow text-gray-600">
            Track your enrollment or update request progress
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-saffron to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-xl">Enter EID Number</h3>
              <p className="font-barlow text-gray-600 text-sm mt-2">
                Enter your 16-digit Enrollment ID to check status
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={eid}
                onChange={(e) => setEid(e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="XXXX XXXX XXXX XXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300 text-center text-lg tracking-wider"
              />
              
              <motion.button
                onClick={handleStatusCheck}
                disabled={eid.length !== 16 || isLoading}
                whileHover={{ scale: eid.length === 16 && !isLoading ? 1.05 : 1 }}
                whileTap={{ scale: eid.length === 16 && !isLoading ? 0.95 : 1 }}
                className={`w-full py-3 rounded-lg font-poppins font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  eid.length === 16 && !isLoading
                    ? 'bg-gradient-to-r from-saffron to-orange-500 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Checking Status...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Check Status</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Sample EIDs for testing */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="font-barlow text-xs text-gray-600 mb-2">Sample EIDs for testing:</p>
              <div className="space-y-1">
                <button
                  onClick={() => setEid('1234567890123456')}
                  className="block w-full text-left font-mono text-xs text-saffron hover:bg-white px-2 py-1 rounded"
                >
                  1234567890123456 (In Progress)
                </button>
                <button
                  onClick={() => setEid('9876543210987654')}
                  className="block w-full text-left font-mono text-xs text-green-600 hover:bg-white px-2 py-1 rounded"
                >
                  9876543210987654 (Accepted)
                </button>
                <button
                  onClick={() => setEid('5555666677778888')}
                  className="block w-full text-left font-mono text-xs text-red-600 hover:bg-white px-2 py-1 rounded"
                >
                  5555666677778888 (Rejected)
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Results */}
        {statusData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className={`bg-white rounded-xl p-8 shadow-lg border-l-4 ${
              statusData.status === 'accepted' ? 'border-green-500' :
              statusData.status === 'rejected' ? 'border-red-500' :
              'border-saffron'
            }`}>
              {/* Status Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {statusData.status === 'in-progress' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center"
                    >
                      <Clock className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                  {statusData.status === 'accepted' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                  {statusData.status === 'rejected' && (
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-poppins font-bold text-xl text-gray-800">
                      {statusData.title}
                    </h3>
                    <p className="font-barlow text-gray-600">{statusData.message}</p>
                  </div>
                </div>
              </div>

              {/* Status Details */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-barlow font-medium text-gray-700">Last Updated:</span>
                    <p className="font-barlow text-gray-600">{statusData.timestamp}</p>
                  </div>
                  {statusData.estimatedCompletion && (
                    <div>
                      <span className="font-barlow font-medium text-gray-700">Estimated Completion:</span>
                      <p className="font-barlow text-gray-600">{statusData.estimatedCompletion}</p>
                    </div>
                  )}
                </div>

                {/* Progress Steps for In-Progress */}
                {statusData.status === 'in-progress' && statusData.steps && (
                  <div>
                    <h4 className="font-poppins font-semibold text-lg mb-4">Progress Steps</h4>
                    <div className="space-y-3">
                      {statusData.steps.map((step: any, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className={`font-barlow ${
                            step.completed ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {step.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Success Actions */}
                {statusData.status === 'accepted' && (
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-poppins font-semibold text-lg mb-4 text-green-800">
                      🎉 Congratulations! Your Aadhaar is Ready
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-barlow font-medium text-green-700">Aadhaar Number:</span>
                        <p className="font-mono text-lg text-green-800">{statusData.aadhaarNumber}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-green-700 transition-colors duration-300"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download e-Aadhaar</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Rejection Details */}
                {statusData.status === 'rejected' && (
                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-poppins font-semibold text-lg mb-4 text-red-800 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      What Went Wrong?
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <span className="font-barlow font-medium text-red-700">Reason:</span>
                        <p className="font-barlow text-red-600">{statusData.reason}</p>
                      </div>
                      <div>
                        <span className="font-barlow font-medium text-red-700">Next Steps:</span>
                        <ul className="list-disc list-inside space-y-1 mt-2">
                          {statusData.nextSteps.map((step: string, index: number) => (
                            <li key={index} className="font-barlow text-red-600 text-sm">{step}</li>
                          ))}
                        </ul>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-red-700 transition-colors duration-300"
                      >
                        Find Nearest Center
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {eid.length === 16 && statusData === null && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-poppins font-semibold text-xl text-gray-800 mb-2">
                No Records Found
              </h3>
              <p className="font-barlow text-gray-600">
                The EID you entered doesn't match our records. Please check and try again.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Status;