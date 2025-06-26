"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Phone, Mail, Search, Filter } from "lucide-react"
import { supabase } from "../lib/supabase"

interface LostChild {
  id: number
  name: string
  age: number
  gender: string
  description: string
  last_seen_location: string
  last_seen_date: string
  contact_info: string
  contact_email?: string
  image_url?: string
  additional_info?: string
  posted_date: string
  status: "active" | "found"
}

const LostChildren = () => {
  const [lostChildren, setLostChildren] = useState<LostChild[]>([])
  const [filteredChildren, setFilteredChildren] = useState<LostChild[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [ageFilter, setAgeFilter] = useState<"all" | "0-5" | "6-12" | "13-17" | "18+">("all")
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLostChildren()
  }, [])

  useEffect(() => {
    filterChildren()
  }, [lostChildren, searchTerm, ageFilter, genderFilter])

  const fetchLostChildren = async () => {
    try {
      const { data, error } = await supabase
        .from("lost_children")
        .select("*")
        .eq("status", "active")
        .order("posted_date", { ascending: false })

      if (error) throw error
      setLostChildren(data || [])
    } catch (error) {
      console.error("Failed to fetch lost children:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterChildren = () => {
    let filtered = lostChildren

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (child) =>
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          child.last_seen_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          child.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Age filter
    if (ageFilter !== "all") {
      filtered = filtered.filter((child) => {
        switch (ageFilter) {
          case "0-5":
            return child.age >= 0 && child.age <= 5
          case "6-12":
            return child.age >= 6 && child.age <= 12
          case "13-17":
            return child.age >= 13 && child.age <= 17
          case "18+":
            return child.age >= 18
          default:
            return true
        }
      })
    }

    // Gender filter
    if (genderFilter !== "all") {
      filtered = filtered.filter((child) => child.gender.toLowerCase() === genderFilter)
    }

    setFilteredChildren(filtered)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lost children information...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Missing Children</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Help us bring these children home. If you have any information about any of these missing children, please
              contact us immediately.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Ages</option>
                <option value="0-5">0-5 years</option>
                <option value="6-12">6-12 years</option>
                <option value="13-17">13-17 years</option>
                <option value="18+">18+ years</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              Showing {filteredChildren.length} of {lostChildren.length} children
            </div>
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          className="bg-red-50 border border-red-200 p-4 rounded-lg mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center justify-center space-x-4 text-red-800">
            <Phone className="h-5 w-5" />
            <span className="font-semibold">Emergency Hotline: +254 728 620 614</span>
            <span>•</span>
            <Mail className="h-5 w-5" />
            <span>info@hlctk.org</span>
          </div>
        </motion.div>

        {/* Children Grid */}
        {filteredChildren.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChildren.map((child, index) => (
              <motion.div
                key={child.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {child.image_url && (
                  <div className="h-64 bg-gray-200">
                    <img
                      src={child.image_url || "/placeholder.svg"}
                      alt={child.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                      Missing
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Age:</span> {child.age} years old
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Gender:</span> {child.gender}
                    </p>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Last seen:</span> {child.last_seen_location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-600 text-sm">{new Date(child.last_seen_date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{child.description}</p>
                  </div>

                  {child.additional_info && (
                    <div className="mb-4 p-3 bg-yellow-50 rounded-md">
                      <p className="text-yellow-800 text-sm">
                        <span className="font-medium">Additional Info:</span> {child.additional_info}
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Contact:</span> {child.contact_info}
                    </p>
                    {child.contact_email && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Email:</span> {child.contact_email}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div className="text-center py-12" variants={fadeInUp} initial="initial" animate="animate">
            <div className="bg-white rounded-lg shadow-md p-8">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No children found</h3>
              <p className="text-gray-600">
                {searchTerm || ageFilter !== "all" || genderFilter !== "all"
                  ? "Try adjusting your search criteria."
                  : "No missing children reports at this time."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default LostChildren
