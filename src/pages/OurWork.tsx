import { motion } from 'framer-motion';
import { Search, Heart, Shield, Users, Scale, Phone } from 'lucide-react';

const OurWork = () => {
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

  const services = [
    {
      icon: Search,
      title: "Child Tracing",
      description: "Comprehensive field investigations using advanced tracking methods, community networks, and technology to locate missing children.",
      features: [
        "Field investigations and community outreach",
        "24/7 hotline call management",
        "Media outreach and public awareness campaigns",
        "Advanced data management systems",
        "Collaboration with law enforcement agencies"
      ]
    },
    {
      icon: Heart,
      title: "Reunification Support",
      description: "Ensuring safe and sustainable family reunification through careful planning and ongoing support services.",
      features: [
        "Travel logistics and transportation assistance",
        "Documentation and legal support",
        "Comprehensive safety assessments",
        "Family preparation and counseling",
        "Post-reunification monitoring and support"
      ]
    },
    {
      icon: Shield,
      title: "Psychosocial Care",
      description: "Holistic mental health and emotional support services for children and families affected by separation.",
      features: [
        "Professional trauma healing therapy",
        "Chaplain and spiritual care services",
        "Family mediation and conflict resolution",
        "Individual and group counseling sessions",
        "Community-based psychosocial support"
      ]
    },
    {
      icon: Users,
      title: "Prevention & Education",
      description: "Proactive community engagement to prevent child separation and strengthen family protection systems.",
      features: [
        "Community awareness forums and workshops",
        "School-based safety education programs",
        "Family strengthening initiatives",
        "Child protection training for caregivers",
        "Community volunteer network development"
      ]
    },
    {
      icon: Scale,
      title: "Advocacy & Policy",
      description: "Working to strengthen child protection laws and policies at local and national levels.",
      features: [
        "Legal support and representation",
        "Policy research and development",
        "Lobbying for child protection legislation",
        "Collaboration with government agencies",
        "Rights-based advocacy campaigns"
      ]
    }
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
              Our Work & Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive child protection services designed to trace, rescue, and reunify missing children with their families
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Core Service Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our integrated approach ensures comprehensive support for missing children and their families
            </p>
          </motion.div>

          <motion.div
            className="space-y-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                variants={fadeInUp}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="bg-primary-100 p-4 rounded-lg mr-4">
                      <service.icon className="h-10 w-10 text-primary-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="bg-primary-600 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-lg">
                    <div className="text-center">
                      <div className="bg-primary-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <service.icon className="h-12 w-12 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-primary-800 mb-4">
                        Professional Excellence
                      </h4>
                      <p className="text-primary-700">
                        Our team of trained professionals uses evidence-based approaches 
                        and best practices to ensure the highest quality of service delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
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
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Making a difference in the lives of children and families across Kenya
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Emergency Hotline</div>
              <p className="text-gray-600">
                Round-the-clock support for families reporting missing children
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Commitment</div>
              <p className="text-gray-600">
                Dedicated to every case until successful reunification
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">47</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Counties</div>
              <p className="text-gray-600">
                Nationwide coverage across all counties in Kenya
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Our Help?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              If you have information about a missing child or need our services, 
              contact us immediately. Every moment counts in bringing children home safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+254728620614"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Emergency Hotline
              </a>
              <motion.a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Report Missing Child
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default OurWork;