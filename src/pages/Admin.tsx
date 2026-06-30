"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { LogOut, Search, Filter, CheckCircle, Clock, AlertCircle, Plus, Users, FileText, Heart, Bell } from "lucide-react"
import { supabase } from "../lib/supabase"
import AdminPostChild from "../components/admin-post-child"
import AdminPostSuccessStory from "../components/admin-post-success-story"

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
  const [activeTab, setActiveTab] = useState<"publicReports" | "posted" | "successStories">("publicReports")
  const [lostChildren, setLostChildren] = useState<LostChild[]>([])
  const [successStories, setSuccessStories] = useState<any[]>([])
  const [publicReports, setPublicReports] = useState<any[]>([])
  const [selectedPublicReport, setSelectedPublicReport] = useState<any | null>(null)
  const [selectedSuccessStory, setSelectedSuccessStory] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "resolved" | "active" | "found">("all")
  const [selectedChild, setSelectedChild] = useState<LostChild | null>(null)
  const [showPostForm, setShowPostForm] = useState(false)
  const [showPostSuccessStory, setShowPostSuccessStory] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("hlctk_admin_token")
    if (!token) { navigate("/admin/login"); return }
    fetchData()
  }, [navigate])

  const fetchData = async () => {
    try {
      const [{ data: childrenData }, { data: storiesData }, { data: publicReportsData }] = await Promise.all([
        supabase.from("lost_children").select("*").order("posted_date", { ascending: false }),
        supabase.from("success_stories").select("*").order("created_at", { ascending: false }),
        supabase.from("missing_child_reports").select("*").order("submitted_at", { ascending: false }),
      ])
      setLostChildren(childrenData || [])
      setSuccessStories(storiesData || [])
      setPublicReports(publicReportsData || [])
    } catch (error) {
      console.error("Failed to fetch data:", error)
      alert("Failed to load data. Please check your internet connection.")
    } finally {
      setIsLoading(false)
    }
  }

  const updatePublicReportStatus = async (id: number, status: "pending" | "resolved") => {
    const { error } = await supabase.from("missing_child_reports").update({ status }).eq("id", id)
    if (!error) {
      setPublicReports(publicReports.map((r) => (r.id === id ? { ...r, status } : r)))
      if (selectedPublicReport?.id === id) setSelectedPublicReport({ ...selectedPublicReport, status })
    }
  }

  const updateChildStatus = async (id: number, status: "active" | "found") => {
    const { error } = await supabase.from("lost_children").update({ status }).eq("id", id)
    if (!error) {
      setLostChildren(lostChildren.map((c) => (c.id === id ? { ...c, status } : c)))
      if (selectedChild?.id === id) setSelectedChild({ ...selectedChild, status })
    }
  }

  const handleLogout = () => { localStorage.removeItem("hlctk_admin_token"); navigate("/admin/login") }

  const getStatusIcon = (status: string) => {
    if (status === "resolved" || status === "found") return <CheckCircle className="h-4 w-4 text-green-600" />
    if (status === "pending" || status === "active") return <Clock className="h-4 w-4 text-yellow-600" />
    return <AlertCircle className="h-4 w-4 text-gray-600" />
  }

  const getStatusColor = (status: string) => {
    if (status === "resolved" || status === "found") return "bg-green-100 text-green-800"
    if (status === "pending" || status === "active") return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  const Row = ({ label, value }: { label: string; value: string }) =>
    value ? (
      <div>
        <span className="text-xs font-semibold text-gray-500 uppercase">{label}</span>
        <p className="text-sm text-gray-900 mt-0.5">{value}</p>
      </div>
    ) : null

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const pendingCount = publicReports.filter((r) => r.status === "pending").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage reports and missing children posts</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={() => setShowPostForm(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                <Plus className="h-4 w-4" /><span>Post Missing Child</span>
              </button>
              <button onClick={() => setShowPostSuccessStory(true)} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                <Plus className="h-4 w-4" /><span>Post Success Story</span>
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                <LogOut className="h-4 w-4" /><span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Public Reports", value: publicReports.length, color: "bg-blue-100", icon: <Bell className="h-6 w-6 text-blue-600" /> },
            { label: "Pending Reports", value: pendingCount, color: "bg-yellow-100", icon: <Clock className="h-6 w-6 text-yellow-600" /> },
            { label: "Posted Children", value: lostChildren.length, color: "bg-red-100", icon: <Users className="h-6 w-6 text-red-600" /> },
            { label: "Found Children", value: lostChildren.filter((c) => c.status === "found").length, color: "bg-green-100", icon: <CheckCircle className="h-6 w-6 text-green-600" /> },
          ].map((s, i) => (
            <motion.div key={i} className="bg-white p-5 rounded-lg shadow flex items-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className={`${s.color} p-3 rounded-lg`}>{s.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex gap-6">
            <button onClick={() => setActiveTab("publicReports")} className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === "publicReports" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              <Bell className="h-4 w-4" />
              Public Reports ({publicReports.length})
              {pendingCount > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-1.5">{pendingCount}</span>}
            </button>
            <button onClick={() => setActiveTab("posted")} className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === "posted" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              <Users className="h-4 w-4" />Posted Children ({lostChildren.length})
            </button>
            <button onClick={() => setActiveTab("successStories")} className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === "successStories" ? "border-purple-500 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              <Heart className="h-4 w-4" />Success Stories ({successStories.length})
            </button>
          </nav>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm" title="Filter by status">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="active">Active</option>
              <option value="found">Found</option>
            </select>
          </div>
        </div>

        {/* Public Reports Tab */}
        {activeTab === "publicReports" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Child Name", "Age", "Sex", "Area Lost", "Reported By", "Submitted", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {publicReports.length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-500">No public reports yet.</td></tr>
                  ) : (
                    publicReports
                      .filter((r) => !searchTerm || r.child_name?.toLowerCase().includes(searchTerm.toLowerCase()) || r.reported_by?.toLowerCase().includes(searchTerm.toLowerCase()))
                      .filter((r) => statusFilter === "all" || r.status === statusFilter)
                      .map((r) => (
                        <tr key={r.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{r.child_name}</td>
                          <td className="px-4 py-3 text-gray-600">{r.age}</td>
                          <td className="px-4 py-3 text-gray-600">{r.sex}</td>
                          <td className="px-4 py-3 text-gray-600">{r.area_lost}</td>
                          <td className="px-4 py-3 text-gray-600">{r.reported_by}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{new Date(r.submitted_at).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(r.status)}`}>
                              {getStatusIcon(r.status)}{r.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button onClick={() => setSelectedPublicReport(r)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">View</button>
                            {r.status === "pending" && (
                              <button onClick={() => updatePublicReportStatus(r.id, "resolved")} className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200">Resolve</button>
                            )}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Posted Children Tab */}
        {activeTab === "posted" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostChildren.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-8">No posted children found.</div>
            ) : (
              lostChildren
                .filter((c) => !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.last_seen_location.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter((c) => statusFilter === "all" || c.status === statusFilter)
                .map((child) => (
                  <div key={child.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                    <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                      <img src={child.image_url || "/placeholder.svg"} alt={child.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{child.name}</h3>
                    <p className="text-sm text-gray-600">Age: {child.age} • {child.gender}</p>
                    <p className="text-sm text-gray-600 mt-1">{child.last_seen_location}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-2 w-fit ${getStatusColor(child.status)}`}>
                      {getStatusIcon(child.status)}{child.status}
                    </span>
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => setSelectedChild(child)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">View</button>
                      {child.status === "active" && (
                        <button onClick={() => updateChildStatus(child.id, "found")} className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200">Mark Found</button>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* Success Stories Tab */}
        {activeTab === "successStories" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {successStories.length === 0 ? (
              <p className="p-8 text-center text-gray-500">No success stories yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Photo", "Title", "Child", "Date Reunited", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {successStories.map((story) => (
                      <tr key={story.id}>
                        <td className="px-4 py-3"><img src={story.image_child_url || "/placeholder.svg"} alt={story.title} className="w-14 h-14 object-cover rounded" /></td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{story.title}</td>
                        <td className="px-4 py-3 text-gray-600">{story.child_name}, {story.age}</td>
                        <td className="px-4 py-3 text-gray-600">{new Date(story.date_reunited).toLocaleDateString()}</td>
                        <td className="px-4 py-3 flex gap-2">
                          <button onClick={() => { setSelectedSuccessStory(story); setShowPostSuccessStory(true) }} className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200">Edit</button>
                          <button onClick={async () => { if (window.confirm("Delete this story?")) { await supabase.from("success_stories").delete().eq("id", story.id); fetchData() } }} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Public Report Detail Modal */}
      {selectedPublicReport && (
        <div className="fixed inset-0 bg-black/40 overflow-y-auto flex justify-center items-start py-10 px-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Missing Child Report — {selectedPublicReport.child_name}</h3>
              <button onClick={() => setSelectedPublicReport(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Row label="Child's Name" value={selectedPublicReport.child_name} />
              <Row label="Age" value={selectedPublicReport.age} />
              <Row label="Sex" value={selectedPublicReport.sex} />
              <Row label="School" value={selectedPublicReport.school} />
              <Row label="Last Cloth" value={selectedPublicReport.last_cloth} />
              <Row label="Where Child Lives" value={selectedPublicReport.child_lives} />
              <Row label="Area Child Lost" value={selectedPublicReport.area_lost} />
              <Row label="Time Reported Missing" value={selectedPublicReport.time_reported} />
              <Row label="Reported By" value={selectedPublicReport.reported_by} />
              <Row label="Finder Name & Tel" value={selectedPublicReport.finder_name_tel} />
              <Row label="Father Relationship" value={selectedPublicReport.father_relationship} />
              <Row label="Mother ID No" value={selectedPublicReport.mother_id} />
              <Row label="Aunt Telephone" value={selectedPublicReport.aunt_telephone} />
              <Row label="OB Number" value={selectedPublicReport.ob_number} />
              <Row label="Time Reunited" value={selectedPublicReport.time_reunited} />
              <Row label="Receiver Name" value={selectedPublicReport.receiver_name} />
              <Row label="Receiver Telephone" value={selectedPublicReport.receiver_telephone} />
              <Row label="Childrens Home" value={selectedPublicReport.childrens_home} />
              <Row label="Child Received By" value={selectedPublicReport.child_received_by} />
              <Row label="Official Chaplin" value={selectedPublicReport.official_chaplin} />
              <Row label="Complainant Name" value={selectedPublicReport.complainant_name} />
              <Row label="Witness Name" value={selectedPublicReport.witness_name} />
              <div className="sm:col-span-2"><Row label="Description" value={selectedPublicReport.description} /></div>
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPublicReport.status)}`}>
                {getStatusIcon(selectedPublicReport.status)}{selectedPublicReport.status}
              </span>
              {selectedPublicReport.status === "pending" && (
                <button onClick={() => { updatePublicReportStatus(selectedPublicReport.id, "resolved"); setSelectedPublicReport(null) }} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Child Detail Modal */}
      {selectedChild && (
        <div className="fixed inset-0 bg-black/40 overflow-y-auto flex justify-center items-start py-10 px-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Child Details</h3>
              <button onClick={() => setSelectedChild(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            {selectedChild.image_url && <img src={selectedChild.image_url} alt={selectedChild.name} className="w-full h-56 object-cover rounded-lg mb-4" />}
            <div className="grid grid-cols-2 gap-4">
              <Row label="Name" value={selectedChild.name} />
              <Row label="Age" value={String(selectedChild.age)} />
              <Row label="Gender" value={selectedChild.gender} />
              <Row label="Last Seen" value={new Date(selectedChild.last_seen_date).toLocaleDateString()} />
              <div className="col-span-2"><Row label="Location" value={selectedChild.last_seen_location} /></div>
              <div className="col-span-2"><Row label="Description" value={selectedChild.description} /></div>
              <Row label="Contact" value={selectedChild.contact_info} />
              {selectedChild.contact_email && <Row label="Email" value={selectedChild.contact_email} />}
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedChild.status)}`}>
                {getStatusIcon(selectedChild.status)}{selectedChild.status}
              </span>
              {selectedChild.status === "active" && (
                <button onClick={() => { updateChildStatus(selectedChild.id, "found"); setSelectedChild(null) }} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">Mark as Found</button>
              )}
            </div>
          </div>
        </div>
      )}

      {showPostForm && <AdminPostChild onClose={() => setShowPostForm(false)} onSuccess={() => { fetchData(); setShowPostForm(false) }} />}
      {showPostSuccessStory && (
        <AdminPostSuccessStory
          onClose={() => { setShowPostSuccessStory(false); setSelectedSuccessStory(null) }}
          onSuccess={() => { fetchData(); setShowPostSuccessStory(false); setSelectedSuccessStory(null) }}
          story={selectedSuccessStory}
        />
      )}
    </div>
  )
}

export default AdminEnhanced
