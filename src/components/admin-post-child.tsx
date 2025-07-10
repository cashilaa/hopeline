"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Save, ImageIcon } from "lucide-react"
import { supabase } from "../lib/supabase"

interface PostChildFormData {
  name: string
  age: number
  gender: string
  description: string
  last_seen_location: string
  last_seen_date: string
  contact_info: string
  contact_email: string
  additional_info: string
}

interface AdminPostChildProps {
  onClose: () => void
  onSuccess: () => void
}

const AdminPostChild = ({ onClose, onSuccess }: AdminPostChildProps) => {
  const [formData, setFormData] = useState<PostChildFormData>({
    name: "",
    age: 0,
    gender: "male",
    description: "",
    last_seen_location: "",
    last_seen_date: "",
    contact_info: "",
    contact_email: "",
    additional_info: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [imageFile2, setImageFile2] = useState<File | null>(null)
  const [imagePreview2, setImagePreview2] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, which: "first" | "second" = "first") => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        if (which === "first") {
          setImageFile(file)
          setImagePreview(ev.target?.result as string)
        } else {
          setImageFile2(file)
          setImagePreview2(ev.target?.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    
    if (!cloudName) {
      throw new Error("Cloudinary cloud name is not configured")
    }

    console.log("Uploading to Cloudinary with cloud name:", cloudName)

    // Try with the preset first, then fallback to a default one
    const formData = new FormData()
    formData.append("file", file)

    // Use a single preset, configurable via env
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "hlctk_missing_children"
    formData.append("upload_preset", uploadPreset)
    formData.append("folder", "missing_children")

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Cloudinary error response:", errorText)
        
        // If the preset doesn't exist, provide helpful error message
        if (errorText.includes("Invalid upload preset")) {
          throw new Error("Upload preset 'hlctk_missing_children' not found. Please create it in your Cloudinary dashboard.")
        }
        
        throw new Error(`Failed to upload image: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Upload successful:", data.secure_url)
      return data.secure_url
    } catch (error) {
      console.error("Cloudinary upload error:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      let imageUrl = ""
      let imageUrl2 = ""

      if (imageFile) {
        setUploadProgress(20)
        imageUrl = await uploadToCloudinary(imageFile)
        setUploadProgress(40)
      }
      if (imageFile2) {
        setUploadProgress(60)
        imageUrl2 = await uploadToCloudinary(imageFile2)
        setUploadProgress(80)
      }

      setUploadProgress(90)

      const { error } = await supabase.from("lost_children").insert([
        {
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          description: formData.description,
          last_seen_location: formData.last_seen_location,
          last_seen_date: formData.last_seen_date,
          contact_info: formData.contact_info,
          contact_email: formData.contact_email,
          additional_info: formData.additional_info,
          image_url: imageUrl,
          image_url2: imageUrl2,
          posted_date: new Date().toISOString(),
          status: "active"
        },
      ])

      if (error) throw error

      setUploadProgress(100)
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Failed to post missing child:", error)
      alert("Failed to post missing child. Please try again.")
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  const removeImage = (which: "first" | "second" = "first") => {
    if (which === "first") {
      setImageFile(null)
      setImagePreview("")
    } else {
      setImageFile2(null)
      setImagePreview2("")
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-white mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Post Missing Child</h3>
<button
  onClick={onClose}
  className="text-gray-400 hover:text-gray-600 text-2xl"
  title="Close dialog"
  aria-label="Close dialog"
>
  <X className="h-6 w-6" />
</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Uploads */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Child's Photo 1</label>
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "first")}
                    className="hidden"
                    id="image-upload"
                    placeholder="Upload child's photo"
                    title="Upload child's photo"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to upload a photo</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
  type="button"
  onClick={() => removeImage("first")}
  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
  title="Remove first image"
  aria-label="Remove first image"
>
  <X className="h-4 w-4" />
</button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Child's Photo 2</label>
              {!imagePreview2 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "second")}
                    className="hidden"
                    id="image-upload-2"
                    placeholder="Upload child's photo 2"
                    title="Upload child's photo 2"
                  />
                  <label htmlFor="image-upload-2" className="cursor-pointer">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to upload a second photo</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview2 || "/placeholder.svg"}
                    alt="Preview 2"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
  type="button"
  onClick={() => removeImage("second")}
  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
  title="Remove second image"
  aria-label="Remove second image"
>
  <X className="h-4 w-4" />
</button>
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Child's Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="100"
                  placeholder="Enter age"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Seen Date *</label>
                <input
                  type="date"
                  name="last_seen_date"
                  value={formData.last_seen_date}
                  onChange={handleInputChange}
                  required
                  placeholder="Select last seen date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Seen Location *</label>
              <input
                type="text"
                name="last_seen_location"
                value={formData.last_seen_location}
                onChange={handleInputChange}
                required
                placeholder="e.g., Nairobi CBD, near Kencom Bus Station"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Physical description, clothing worn when last seen, distinguishing features..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
              <textarea
                name="additional_info"
                value={formData.additional_info}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any other relevant information..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  name="contact_info"
                  value={formData.contact_info}
                  onChange={handleInputChange}
                  required
                  placeholder="+254 xxx xxx xxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  placeholder="contact@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Progress Bar */}
            {isSubmitting && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Post Missing Child</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminPostChild
