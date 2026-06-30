"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Upload, Calendar, MapPin, User, FileText, ImageIcon } from "lucide-react"
import { supabase } from "../lib/supabase"
import { uploadToR2 } from "../lib/r2"

interface AdminPostSuccessStoryProps {
  onClose: () => void
  onSuccess: () => void
  story?: any // For editing existing stories
}

const AdminPostSuccessStory = ({ onClose, onSuccess, story }: AdminPostSuccessStoryProps) => {
  const [formData, setFormData] = useState({
    title: story?.title || "",
    description: story?.description || "",
    child_name: story?.child_name || "",
    age: story?.age || "",
    location: story?.location || "",
    date_reunited: story?.date_reunited || "",
    story_details: story?.story_details || "",
    image_child_url: story?.image_child_url || "",
    image_reunited_url: story?.image_reunited_url || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageChildFile, setImageChildFile] = useState<File | null>(null)
  const [imageReunitedFile, setImageReunitedFile] = useState<File | null>(null)
  const [imageChildPreview, setImageChildPreview] = useState<string>(story?.image_child_url || "")
  const [imageReunitedPreview, setImageReunitedPreview] = useState<string>(story?.image_reunited_url || "")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: "child" | "reunited") => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === "child") {
          setImageChildFile(file)
          setImageChildPreview(reader.result as string)
        } else {
          setImageReunitedFile(file)
          setImageReunitedPreview(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File, type: "child" | "reunited"): Promise<string | null> => {
    try {
      return await uploadToR2(file, "success-stories")
    } catch (error) {
      console.error("Error uploading image:", error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imageChildUrl = formData.image_child_url
      let imageReunitedUrl = formData.image_reunited_url

      // Upload new images if selected
      if (imageChildFile) {
        const uploadedUrl = await uploadImage(imageChildFile, "child")
        if (uploadedUrl) {
          imageChildUrl = uploadedUrl
        }
      }
      if (imageReunitedFile) {
        const uploadedUrl = await uploadImage(imageReunitedFile, "reunited")
        if (uploadedUrl) {
          imageReunitedUrl = uploadedUrl
        }
      }

      const storyData = {
        ...formData,
        age: Number.parseInt(formData.age),
        image_child_url: imageChildUrl,
        image_reunited_url: imageReunitedUrl,
        updated_at: new Date().toISOString(),
      }

      let error
      if (story) {
        // Update existing story
        const { error: updateError } = await supabase.from("success_stories").update(storyData).eq("id", story.id)
        error = updateError
      } else {
        // Create new story
        const { error: insertError } = await supabase.from("success_stories").insert([storyData])
        error = insertError
      }

      if (error) {
        console.error("Database error:", error)
        alert("Failed to save success story. Please try again.")
        return
      }

      alert(story ? "Success story updated successfully!" : "Success story posted successfully!")
      onSuccess()
    } catch (error) {
      console.error("Error saving success story:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-white mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="mt-3"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {story ? "Edit Success Story" : "Post New Success Story"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
              aria-label="Close"
              title="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Uploads */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ImageIcon className="inline h-4 w-4 mr-1" />
                Child's Photo (before reunification)
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "child")}
                    placeholder="Upload child image"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
                {imageChildPreview && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={imageChildPreview || "/placeholder.svg"}
                      alt="Child Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ImageIcon className="inline h-4 w-4 mr-1" />
                Reunited Photo (with family)
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "reunited")}
                    placeholder="Upload reunited image"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
                {imageReunitedPreview && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={imageReunitedPreview || "/placeholder.svg"}
                      alt="Reunited Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline h-4 w-4 mr-1" />
                Story Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Safe Return After 3 Months"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Brief description for the story card"
              />
            </div>

            {/* Child Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Child's Name *
                </label>
                <input
                  type="text"
                  name="child_name"
                  value={formData.child_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Sarah M."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="18"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date Reunited *
                </label>
                <input
                  type="date"
                  name="date_reunited"
                  value={formData.date_reunited}
                  onChange={handleInputChange}
                  required
                  placeholder="Select date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Nairobi, Kenya"
              />
            </div>

            {/* Full Story */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Story Details *</label>
              <textarea
                name="story_details"
                value={formData.story_details}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell the complete story of how the child was found and reunited with their family..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {story ? "Updating..." : "Publishing..."}
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    {story ? "Update Story" : "Publish Story"}
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

export default AdminPostSuccessStory
