"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

interface SuccessStory {
  id: number
  title: string
  description: string
  image_url: string
  image_child_url?: string
  image_reunited_url?: string
  child_name: string
  age: number
  location: string
  date_reunited: string
  story_details: string
  created_at: string
}

const SuccessStories = () => {
  const [stories, setStories] = useState<SuccessStory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Replace the mock data useEffect with real Supabase fetch
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const { data, error } = await supabase
          .from("success_stories")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Failed to fetch success stories:", error)
          throw error
        }

        setStories(data || [])
      } catch (error) {
        console.error("Failed to fetch success stories:", error)
        // Fallback to mock data if database fails
        const mockStories: SuccessStory[] = [
          {
            id: 1,
            title: "Safe Return After 3 Months",
            description: "Young Sarah was successfully reunited with her family after being missing for three months.",
            image_url: "/placeholder.svg?height=300&width=400",
            child_name: "Sarah M.",
            age: 8,
            location: "Nairobi, Kenya",
            date_reunited: "2024-01-15",
            story_details:
              "Sarah went missing from her school in Nairobi. Through our comprehensive tracing network and community outreach, we were able to locate her and ensure her safe return to her family. She is now back in school and receiving counseling support.",
            created_at: "2024-01-16",
          },
          {
            id: 2,
            title: "Family Reunification Success",
            description: "After 6 weeks of intensive search, Michael was found and reunited with his loving family.",
            image_url: "/placeholder.svg?height=300&width=400",
            child_name: "Michael K.",
            age: 12,
            location: "Mombasa, Kenya",
            date_reunited: "2024-02-20",
            story_details:
              "Michael disappeared during a family outing at the market. Our field team worked tirelessly with local authorities and community volunteers to trace his whereabouts. He was found safe and is now receiving trauma counseling.",
            created_at: "2024-02-21",
          },
          {
            id: 3,
            title: "Hope Restored",
            description: "Little Grace's story shows that with determination and community support, miracles happen.",
            image_url: "/placeholder.svg?height=300&width=400",
            child_name: "Grace W.",
            age: 6,
            location: "Kisumu, Kenya",
            date_reunited: "2024-03-10",
            story_details:
              "Grace was separated from her family during a community event. Our hotline received a tip that led to her discovery. She was safely returned to her family within 48 hours and is doing well.",
            created_at: "2024-03-11",
          },
        ]
        setStories(mockStories)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSuccessStories()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading success stories...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hop4.jpg?height=600&width=1200&text=Happy+Family+Reunion')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div className="text-center" variants={staggerContainer} initial="initial" animate="animate">
            <motion.h1 className="text-4xl md:text-6xl font-bold mb-6" variants={fadeInUp}>
              Success Stories
              <span className="block text-yellow-300">Hope Restored</span>
            </motion.h1>
            <motion.p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100" variants={fadeInUp}>
              Every child brought home is a victory. These are the stories of hope, resilience, and the power of
              community working together.
            </motion.p>
            <motion.div className="flex justify-center" variants={fadeInUp}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">{stories.length}</div>
                    <div className="text-gray-200">Children Reunited</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">100%</div>
                    <div className="text-gray-200">Success Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stories of Hope</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each story represents a family reunited, a community strengthened, and hope restored. These successes fuel
              our mission to bring every child home.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stories.map((story) => (
              <motion.div
                key={story.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="flex h-64">
                  <div className="w-1/2 h-full bg-gray-200 overflow-hidden flex items-center justify-center">
                    <img
                      src={story.image_child_url || "/placeholder.svg"}
                      alt={story.title + " (child before reunification)"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-1/2 h-full bg-gray-200 overflow-hidden flex items-center justify-center">
                    <img
                      src={story.image_reunited_url || "/placeholder.svg"}
                      alt={story.title + " (reunited with family)"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Reunited
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(story.date_reunited).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>

                  <p className="text-gray-600 mb-4">{story.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-primary-600" />
                      <span className="font-medium">Child:</span>
                      <span className="ml-1">
                        {story.child_name}, {story.age} years old
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                      <span>{story.location}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-700 line-clamp-3">{story.story_details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every success story represents more than just numbers - it's about families reunited and communities
              strengthened.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="text-center p-6 bg-primary-50 rounded-lg" variants={fadeInUp}>
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-800 mb-2">Families Reunited</h3>
              <p className="text-primary-700">
                Every child returned home strengthens the fabric of our community and restores hope to families.
              </p>
            </motion.div>

            <motion.div className="text-center p-6 bg-blue-50 rounded-lg" variants={fadeInUp}>
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">Community Support</h3>
              <p className="text-blue-700">
                Each success story is made possible by the dedication of our community volunteers and partners.
              </p>
            </motion.div>

            <motion.div className="text-center p-6 bg-yellow-50 rounded-lg" variants={fadeInUp}>
              <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-800 mb-2">Ongoing Support</h3>
              <p className="text-yellow-700">
                Our commitment doesn't end at reunification - we provide ongoing support to ensure lasting recovery.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Help Us Create More Success Stories</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              Every missing child deserves a chance to come home. Your support helps us continue our mission of
              reuniting families.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
              >
                Report Missing Child
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Learn How to Help
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default SuccessStories
