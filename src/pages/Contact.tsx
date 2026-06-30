import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import MissingChildReportModal from '../components/MissingChildReportModal';

const Contact = () => {
  const [showReportModal, setShowReportModal] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" className="min-h-screen">
      {showReportModal && <MissingChildReportModal onClose={() => setShowReportModal(false)} />}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" variants={fadeInUp} initial="initial" animate="animate">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Report a missing child or get in touch with our team for assistance
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="bg-white p-8 rounded-lg shadow-lg" variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Emergency Hotline</h3>
                    <p className="text-gray-600">+254728620614</p>
                    <p className="text-gray-600">+254100546840</p>
                    <p className="text-sm text-primary-600 mt-1">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">hopelinetracingkenya@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">Dagoretti North, Kabiro Ward</p>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">Monday - Sunday: 24/7</p>
                    <p className="text-sm text-primary-600 mt-1">Emergency line always open</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Emergency?</h4>
                    <p className="text-sm text-red-700">
                      If this is an emergency, please call our hotline immediately:
                      <strong> +254728620614</strong>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Report Card */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-64 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Report a Missing Child</h2>
              <p className="text-gray-600 mb-8 max-w-md">
                Fill out our official Missing Child Report form. All information is kept confidential
                and used only to help locate the child.
              </p>
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg"
              >
                Open Report Form
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
