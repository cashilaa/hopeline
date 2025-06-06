import { motion } from 'framer-motion';
import { Target, Eye, FileText, Users, Calendar, MapPin } from 'lucide-react';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const objectives = [
    "Establish a national database of missing and found children",
    "Build partnerships with police, social workers, and communities",
    "Launch public awareness campaigns about child safety"
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Hopeline Child Tracing Kenya
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Dedicated to protecting children and reuniting families across Kenya
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg"
              variants={fadeInUp}
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 p-3 rounded-lg mr-4">
                  <Eye className="h-8 w-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                A world where every child lives in safety, dignity, and family care. 
                We envision communities where children are protected, valued, and 
                have the opportunity to thrive in loving family environments.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg"
              variants={fadeInUp}
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 p-3 rounded-lg mr-4">
                  <Target className="h-8 w-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To Trace, Rescue, and Reunify Missing, Trafficked, Abducted, or 
                Separated children with their families, while providing holistic 
                support services that ensure their long-term wellbeing and protection.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Challenge We Face
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                Thousands of children go missing annually due to conflict, trafficking, 
                natural disasters, poverty, and neglect. Many are never found, and those 
                recovered often suffer long-term trauma or re-victimization. There is a 
                critical gap in coordinated tracing and reunification services, especially 
                in under-resourced areas.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Organization Info Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Legal Status & Background
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Legal Status</h3>
                    <p className="text-gray-700">Community Based Organization (CBO)</p>
                    <p className="text-sm text-gray-600">Registration No: DAG/CBO/5/4/2023/305</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-700">Dagoretti North, Kabiro Ward</p>
                    <p className="text-gray-700">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                    <p className="text-gray-700">hopelinetracingkenya@gmail.com</p>
                    <p className="text-gray-700">+254728620614 / +254100546840</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-primary-50 p-8 rounded-lg"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="bg-primary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary-800 mb-4">
                  Established 2023
                </h3>
                <p className="text-primary-700 leading-relaxed">
                  Founded with the mission to address the growing need for specialized 
                  child tracing and reunification services in Kenya, we have been 
                  working tirelessly to bring missing children home safely.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Short-Term Objectives
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our immediate goals to strengthen child protection systems in Kenya
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    {objective}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;