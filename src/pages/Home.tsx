"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, Users, Shield, Search, ArrowRight, ExternalLink } from "lucide-react"
import MissingChildReportModal from "../components/MissingChildReportModal"

export default function Home() {
  const [showReportModal, setShowReportModal] = useState(false)

  const services = [
    {
      icon: Search,
      title: "Child Tracing",
      description:
        "Field investigations, hotline calls, media outreach, and comprehensive data systems to locate missing children.",
    },
    {
      icon: Heart,
      title: "Reunification Support",
      description:
        "Travel logistics, documentation assistance, and safety assessments to ensure safe family reunification.",
    },
    {
      icon: Shield,
      title: "Psychosocial Care",
      description: "Chaplain services, trauma healing, family mediation, and professional counseling support.",
    },
    {
      icon: Users,
      title: "Prevention & Education",
      description: "Community forums, school outreach programs, and family strengthening initiatives.",
    },
  ]

  return (
    <div>
      {showReportModal && <MissingChildReportModal onClose={() => setShowReportModal(false)} />}
      {/* Facebook Link Section - New Addition */}
      <section className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-semibold text-lg">URGENT: Child Missing</span>
            </div>
            <a
              href="https://www.facebook.com/share/19GBk5i2uy/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200 flex items-center gap-2 shadow-lg"
            >
              View Missing Child Details
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Every Child Deserves
              <span className="block text-blue-200">Safety & Family</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              We trace, rescue, and reunify missing children with their families while providing holistic support
              services across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
<button
  onClick={() => setShowReportModal(true)}
  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
>
  Report Missing Child
  <ArrowRight className="ml-2 h-5 w-5" />
</button>
<Link
  to="/about"
  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
>
  Learn More
</Link>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Vision & Mission</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">Vision</h3>
                  <p className="text-gray-700">A world where every child lives in safety, dignity, and family care.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">Mission</h3>
                  <p className="text-gray-700">
                    To Trace, Rescue, and Reunify Missing, Trafficked, Abducted, or Separated children with their
                    families, while providing holistic support services.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-100 rounded-lg p-8 text-center">
                <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Thousands of Children Need Our Help</h3>
                <p className="text-blue-700">
                  Every year, countless children go missing due to conflict, trafficking, natural disasters, poverty,
                  and neglect. We're here to bring them home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How We Help</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures every missing child has the best chance of being safely reunited with
              their family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-transform"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Help Us Bring Children Home</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              If you have information about a missing child or need our help, don't hesitate to reach out. Every second
              counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
<button
  onClick={() => setShowReportModal(true)}
  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
>
  Report Missing Child
  <ArrowRight className="ml-2 h-5 w-5" />
</button>
              <a
                href="tel:+254728620614"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Call Emergency Hotline
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
