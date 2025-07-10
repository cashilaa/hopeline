"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  LogOut,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Users,
  FileText,
  Heart,
} from "lucide-react"
import { supabase } from "../lib/supabase"
import AdminPostChild from "../components/admin-post-child"
import AdminPostSuccessStory from "../components/admin-post-success-story"

interface Report {
  id: number
  childName: string
  age: number
  gender: string
  lastSeenLocation: string
  dateMissing: string
  description: string
  reporterName: string
  reporterContact: string
  reporterEmail?: string
  status: "pending" | "resolved"
  dateReported: string
}

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

const AdminEnhanced = () => {
  const [activeTab, setActiveTab] = useState<"reports" | "posted" | "successStories">("reports")
  const [reports, setReports] = useState<Report[]>([])
  const [lostChildren, setLostChildren] = useState<LostChild[]>([])
  // Removed unused filteredReports and filteredChildren
  const [successStories, setSuccessStories] = useState<any[]>([])
  const [selectedSuccessStory, setSelectedSuccessStory] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "resolved" | "active" | "found">("all")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [selectedChild, setSelectedChild] = useState<LostChild | null>(null)
  const [showPostForm, setShowPostForm] = useState(false)
  const [showPostSuccessStory, setShowPostSuccessStory] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("hlctk_admin_token")
    if (!token) {
      navigate("/admin/login")
      return
    }

    fetchData()
  }, [navigate])

  // Removed useEffect for filtering reports/children as filtered state is no longer used

  const fetchData = async () => {
    try {
      console.log("Fetching data from Supabase...")
      
      // Fetch reports
      const { data: reportsData, error: reportsError } = await supabase.from("reports").select("*")

      if (reportsError) {
        console.error("Reports fetch error:", reportsError)
        throw reportsError
      }
      setReports(reportsData || [])
      console.log("Reports fetched successfully:", reportsData?.length || 0)

      // Fetch posted lost children
      const { data: childrenData, error: childrenError } = await supabase
        .from("lost_children")
        .select("*")
        .order("posted_date", { ascending: false })

      if (childrenError) {
        console.error("Children fetch error:", childrenError)
        throw childrenError
      }
      setLostChildren(childrenData || [])
      console.log("Lost children fetched successfully:", childrenData?.length || 0)

      // Fetch success stories
      const { data: storiesData, error: storiesError } = await supabase
        .from("success_stories")
        .select("*")
        .order("created_at", { ascending: false })

      if (storiesError) {
        console.error("Success stories fetch error:", storiesError)
        throw storiesError
      }
      setSuccessStories(storiesData || [])
      console.log("Success stories fetched successfully:", storiesData?.length || 0)
    } catch (error) {
      console.error("Failed to fetch data:", error)
      alert("Failed to load data. Please check your internet connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Removed filterReports and filterChildren functions as filtered state is no longer used

  const updateReportStatus = async (id: number, status: "pending" | "resolved") => {
    try {
      const { error } = await supabase.from("reports").update({ status }).eq("id", id)

      if (!error) {
        setReports(reports.map((report) => (report.id === id ? { ...report, status } : report)))
        if (selectedReport && selectedReport.id === id) {
          setSelectedReport({ ...selectedReport, status })
        }
      }
    } catch (error) {
      console.error("Failed to update report status:", error)
    }
  }

  const updateChildStatus = async (id: number, status: "active" | "found") => {
    try {
      const { error } = await supabase.from("lost_children").update({ status }).eq("id", id)

      if (!error) {
        setLostChildren(lostChildren.map((child) => (child.id === id ? { ...child, status } : child)))
        if (selectedChild && selectedChild.id === id) {
          setSelectedChild({ ...selectedChild, status })
        }
      }
    } catch (error) {
      console.error("Failed to update child status:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("hlctk_admin_token")
    navigate("/admin/login")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
      case "found":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
      case "active":
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
      case "found":
        return "bg-green-100 text-green-800"
      case "pending":
      case "active":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage reports and missing children posts</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPostForm(true)}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Post Missing Child</span>
              </button>
              <button
                onClick={() => setShowPostSuccessStory(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Post Success Story</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("reports")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "reports"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Reports ({reports.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("posted")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "posted"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Posted Children ({lostChildren.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("successStories")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "successStories"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-purple-600" />
                  <span>Success Stories ({successStories.length})</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white p-6 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter((r) => r.status === "pending").length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Posted Children</p>
                <p className="text-2xl font-bold text-gray-900">{lostChildren.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Found Children</p>
                <p className="text-2xl font-bold text-gray-900">
                  {lostChildren.filter((c) => c.status === "found").length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                  title="Status Filter"
                >
                  <option value="all">All Status</option>
        {activeTab === "reports" ? (
          /* Reports Table - Same as before */
          <div className="bg-white rounded-lg shadow overflow-hidden">
            ...
          </div>
        ) : activeTab === "posted" ? (
          /* Posted Children Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ...
          </div>
        ) : (
          /* Success Stories List */
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-700">Success Stories</h2>
            {successStories.length === 0 ? (
              <p className="text-gray-500">No success stories posted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Child Image</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reunited Image</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Child</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date Reunited</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {successStories.map((story) => (
                      <tr key={story.id}>
                        <td className="px-4 py-2">
                          <img src={story.image_child_url || "/placeholder.svg"} alt="Child" className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="px-4 py-2">
                          <img src={story.image_reunited_url || "/placeholder.svg"} alt="Reunited" className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="px-4 py-2 font-semibold">{story.title}</td>
                        <td className="px-4 py-2">{story.child_name}, {story.age}</td>
                        <td className="px-4 py-2">{new Date(story.date_reunited).toLocaleDateString()}</td>
                        <td className="px-4 py-2 space-x-2">
                          <button
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                            onClick={() => {
                              setSelectedSuccessStory(story);
                              setShowPostSuccessStory(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                            onClick={async () => {
                              if (window.confirm("Are you sure you want to delete this success story?")) {
                                const { error } = await supabase.from("success_stories").delete().eq("id", story.id);
                                if (!error) {
                                  fetchData();
                                } else {
                                  alert("Failed to delete story.");
                                }
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "reports" ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Child Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Seen Location</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date Missing</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                        No reports found.
                      </td>
                    </tr>
                  ) : (
                    reports
                      .filter((r) =>
                        r.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.lastSeenLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.reporterName.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .filter((r) => statusFilter === "all" || r.status === statusFilter)
                      .map((report) => (
                        <tr key={report.id}>
                          <td className="px-4 py-2">{report.childName}</td>
                          <td className="px-4 py-2">{report.age}</td>
                          <td className="px-4 py-2">{report.gender}</td>
                          <td className="px-4 py-2">{report.lastSeenLocation}</td>
                          <td className="px-4 py-2">{new Date(report.dateMissing).toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                              {getStatusIcon(report.status)}
                              <span className="ml-1 capitalize">{report.status}</span>
                            </span>
                          </td>
                          <td className="px-4 py-2 space-x-2">
                            <button
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                              onClick={() => setSelectedReport(report)}
                            >
                              View
                            </button>
                            {report.status === "pending" && (
                              <button
                                className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                                onClick={() => updateReportStatus(report.id, "resolved")}
                              >
                                Mark as Resolved
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "posted" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostChildren.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-8">
                No posted children found.
              </div>
            ) : (
              lostChildren
                .filter((child) =>
                  child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  child.last_seen_location.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .filter((child) => statusFilter === "all" || child.status === statusFilter)
                .map((child) => (
                  <div
                    key={child.id}
                    className="bg-white rounded-lg shadow p-6 flex flex-col"
                  >
                    <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                      <img
                        src={child.image_url || "/placeholder.svg"}
                        alt={child.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{child.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">Age: {child.age}</p>
                      <p className="text-sm text-gray-600 mb-1">Gender: {child.gender}</p>
                      <p className="text-sm text-gray-600 mb-1">
                        Last Seen: {child.last_seen_location} on {new Date(child.last_seen_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">{child.description}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(child.status)}`}>
                        {getStatusIcon(child.status)}
                        <span className="ml-1 capitalize">{child.status}</span>
                      </span>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        onClick={() => setSelectedChild(child)}
                      >
                        View
                      </button>
                      {child.status === "active" && (
                        <button
                          className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                          onClick={() => updateChildStatus(child.id, "found")}
                        >
                          Mark as Found
                        </button>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        ) : activeTab === "successStories" ? (
          /* Success Stories List */
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-700">Success Stories</h2>
            {successStories.length === 0 ? (
              <p className="text-gray-500">No success stories posted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Child</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date Reunited</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {successStories.map((story) => (
                      <tr key={story.id}>
                        <td className="px-4 py-2">
                          <img src={story.image_child_url || "/placeholder.svg"} alt={story.title} className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="px-4 py-2 font-semibold">{story.title}</td>
                        <td className="px-4 py-2">{story.child_name}, {story.age}</td>
                        <td className="px-4 py-2">{new Date(story.date_reunited).toLocaleDateString()}</td>
                        <td className="px-4 py-2 space-x-2">
                          <button
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                            onClick={() => {
                              setSelectedSuccessStory(story);
                              setShowPostSuccessStory(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                            onClick={async () => {
                              if (window.confirm("Are you sure you want to delete this success story?")) {
                                const { error } = await supabase.from("success_stories").delete().eq("id", story.id);
                                if (!error) {
                                  fetchData();
                                } else {
                                  alert("Failed to delete story.");
                                }
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Post Child Form Modal */}
      {showPostForm && (
        <AdminPostChild
          onClose={() => setShowPostForm(false)}
          onSuccess={() => {
            fetchData()
            setShowPostForm(false)
          }}
        />
      )}
      {/* Post Success Story Modal */}
      {showPostSuccessStory && (
        <AdminPostSuccessStory
          onClose={() => {
            setShowPostSuccessStory(false);
            setSelectedSuccessStory(null);
          }}
          onSuccess={() => {
            fetchData();
            setShowPostSuccessStory(false);
            setSelectedSuccessStory(null);
          }}
          story={selectedSuccessStory}
        />
      )}

      {/* Report Detail Modal - Same as before */}
      {selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
                <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Child's Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedReport.childName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedReport.age} years old</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedReport.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Missing</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedReport.dateMissing).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Seen Location</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReport.lastSeenLocation}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReport.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reporter Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedReport.reporterName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reporter Contact</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedReport.reporterContact}</p>
                  </div>
                </div>

                {selectedReport.reporterEmail && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reporter Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedReport.reporterEmail}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}
                    >
                      {getStatusIcon(selectedReport.status)}
                      <span className="ml-1 capitalize">{selectedReport.status}</span>
                    </span>
                  </div>

                  {selectedReport.status === "pending" && (
                    <button
                      onClick={() => {
                        updateReportStatus(selectedReport.id, "resolved")
                        setSelectedReport(null)
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Child Detail Modal */}
      {selectedChild && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white mb-10">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Missing Child Details</h3>
                <button onClick={() => setSelectedChild(null)} className="text-gray-400 hover:text-gray-600 text-2xl">
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {selectedChild.image_url && (
                  <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={selectedChild.image_url || "/placeholder.svg"}
                      alt={selectedChild.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Child's Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedChild.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedChild.age} years old</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedChild.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Seen Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedChild.last_seen_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Seen Location</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedChild.last_seen_location}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedChild.description}</p>
                </div>

                {selectedChild.additional_info && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedChild.additional_info}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedChild.contact_info}</p>
                  </div>
                  {selectedChild.contact_email && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedChild.contact_email}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedChild.status)}`}
                    >
                      {getStatusIcon(selectedChild.status)}
                      <span className="ml-1 capitalize">{selectedChild.status}</span>
                    </span>
                  </div>

                  {selectedChild.status === "active" && (
                    <button
                      onClick={() => {
                        updateChildStatus(selectedChild.id, "found")
                        setSelectedChild(null)
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Mark as Found
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEnhanced
