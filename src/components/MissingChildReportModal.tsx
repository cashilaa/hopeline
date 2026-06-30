import { useState } from "react"
import { X } from "lucide-react"
import { supabase } from "../lib/supabase"

interface Props {
  onClose: () => void
}

const Field = ({
  label,
  id,
  value,
  onChange,
}: {
  label: string
  id: string
  value: string
  onChange: (id: string, val: string) => void
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
      {label}
    </label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className="border-b-2 border-gray-400 focus:border-blue-600 outline-none py-1 px-0 bg-white text-gray-900 text-sm"
    />
  </div>
)

const initialState: Record<string, string> = {
  childrens_home: "",
  child_received_by: "",
  header_telephone: "",
  official_chaplin: "",
  header_date: "",
  header_sign: "",
  child_name: "",
  school: "",
  last_cloth: "",
  finder_name_tel: "",
  age: "",
  sex: "",
  child_lives: "",
  area_lost: "",
  description: "",
  time_reported: "",
  reported_by: "",
  father_relationship: "",
  mother_id: "",
  aunt_telephone: "",
  ob_number: "",
  time_reunited: "",
  receiver_name: "",
  receiver_telephone: "",
  complainant_name: "",
  complainant_sign: "",
  witness_name: "",
  witness_sign: "",
}

const MissingChildReportModal = ({ onClose }: Props) => {
  const [fields, setFields] = useState<Record<string, string>>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (id: string, val: string) => {
    setFields((prev) => ({ ...prev, [id]: val }))
  }

  const handleSubmit = async () => {
    if (!fields.child_name.trim()) {
      alert("Please enter the child's name.")
      return
    }
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from("missing_child_reports").insert([{
        childrens_home: fields.childrens_home,
        child_received_by: fields.child_received_by,
        header_telephone: fields.header_telephone,
        official_chaplin: fields.official_chaplin,
        header_date: fields.header_date,
        header_sign: fields.header_sign,
        child_name: fields.child_name,
        school: fields.school,
        last_cloth: fields.last_cloth,
        finder_name_tel: fields.finder_name_tel,
        age: fields.age,
        sex: fields.sex,
        child_lives: fields.child_lives,
        area_lost: fields.area_lost,
        description: fields.description,
        time_reported: fields.time_reported,
        reported_by: fields.reported_by,
        father_relationship: fields.father_relationship,
        mother_id: fields.mother_id,
        aunt_telephone: fields.aunt_telephone,
        ob_number: fields.ob_number,
        time_reunited: fields.time_reunited,
        receiver_name: fields.receiver_name,
        receiver_telephone: fields.receiver_telephone,
        complainant_name: fields.complainant_name,
        complainant_sign: fields.complainant_sign,
        witness_name: fields.witness_name,
        witness_sign: fields.witness_sign,
        status: "pending",
        submitted_at: new Date().toISOString(),
      }])
      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert("Failed to submit report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-2xl p-10 max-w-md w-full text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Report Submitted</h2>
          <p className="text-gray-600 mb-6">Your report has been received. Our team will follow up shortly.</p>
          <button onClick={onClose} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 overflow-y-auto flex justify-center py-8 px-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close"
          title="Close"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 sm:p-10 bg-white rounded-lg">
          {/* Title */}
          <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-widest uppercase">
              Missing Child Report
            </h2>
          </div>

          {/* Header Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <Field label="Childrens Home Child Was Taken:" id="childrens_home" value={fields.childrens_home} onChange={handleChange} />
            <Field label="Child Received By:" id="child_received_by" value={fields.child_received_by} onChange={handleChange} />
            <Field label="Telephone:" id="header_telephone" value={fields.header_telephone} onChange={handleChange} />
            <Field label="Official Chaplin of Hope CBO:" id="official_chaplin" value={fields.official_chaplin} onChange={handleChange} />
            <Field label="Date:" id="header_date" value={fields.header_date} onChange={handleChange} />
            <Field label="Sign:" id="header_sign" value={fields.header_sign} onChange={handleChange} />
          </div>

          <hr className="border-gray-300 mb-8" />

          {/* Main Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <Field label="Name of Child" id="child_name" value={fields.child_name} onChange={handleChange} />
            <Field label="School That Child Goes To" id="school" value={fields.school} onChange={handleChange} />
            <Field label="Last Cloth That Child Had On" id="last_cloth" value={fields.last_cloth} onChange={handleChange} />
            <Field label="Name & Telephone No of Person That Found the Child" id="finder_name_tel" value={fields.finder_name_tel} onChange={handleChange} />
            <Field label="Age of Child" id="age" value={fields.age} onChange={handleChange} />
            <Field label="Sex of Child" id="sex" value={fields.sex} onChange={handleChange} />
            <Field label="Where Child Lives" id="child_lives" value={fields.child_lives} onChange={handleChange} />
            <Field label="Area Child Lost" id="area_lost" value={fields.area_lost} onChange={handleChange} />
            <div className="sm:col-span-2">
              <label htmlFor="description" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={fields.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full border-b-2 border-gray-400 focus:border-blue-600 outline-none py-1 bg-white text-gray-900 text-sm resize-none mt-1"
              />
            </div>
            <Field label="Time Reported Missing" id="time_reported" value={fields.time_reported} onChange={handleChange} />
            <Field label="Reported By" id="reported_by" value={fields.reported_by} onChange={handleChange} />
            <Field label="Father: Relationship" id="father_relationship" value={fields.father_relationship} onChange={handleChange} />
            <Field label="Mother: Identification No" id="mother_id" value={fields.mother_id} onChange={handleChange} />
            <Field label="Aunt Telephone" id="aunt_telephone" value={fields.aunt_telephone} onChange={handleChange} />
            <Field label="OB Number" id="ob_number" value={fields.ob_number} onChange={handleChange} />
            <Field label="Time Reunited" id="time_reunited" value={fields.time_reunited} onChange={handleChange} />
            <Field label="Name of Person Receiving Child" id="receiver_name" value={fields.receiver_name} onChange={handleChange} />
            <Field label="Telephone" id="receiver_telephone" value={fields.receiver_telephone} onChange={handleChange} />
          </div>

          <hr className="border-gray-300 mb-8" />

          {/* Consent Section */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Statement of Truth & Informed Consent Declaration:
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              I state that the above declarations are true and correct to the best of my information, knowledge, and belief. I hereby give my permission for PICTURES/ PHOTOS of my child to be shared on social media by HopeLine Child Tracing Kenya to share information about the incident I have reported to them as explained above: I understand that in giving my authorization, I am giving HopeLine Child Tracing Kenya To share the specific case information with relevant government agencies and civil society organizations, so that I can receive help with safety, health, psycho-social or legal needs. I understand that shared information will be treated with confidentiality and respect, and shared only as needed to provide the assistance I request.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
            <Field label="Name:" id="complainant_name" value={fields.complainant_name} onChange={handleChange} />
            <Field label="Sign:" id="complainant_sign" value={fields.complainant_sign} onChange={handleChange} />
          </div>
          <p className="text-xs text-gray-600 italic mb-6">
            Name, ID photocopy and signature (thumb print) of the complainant/ person reporting
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
            <Field label="Name:" id="witness_name" value={fields.witness_name} onChange={handleChange} />
            <Field label="Sign:" id="witness_sign" value={fields.witness_sign} onChange={handleChange} />
          </div>
          <p className="text-xs text-gray-600 italic mb-8">
            Name and Signature (thumb print) of the witness HopeLine Child Tracing Kenya of the interview
          </p>

          {/* Footer */}
          <div className="text-center border-t-2 border-gray-800 pt-4">
            <p className="text-sm font-bold text-gray-900 tracking-widest uppercase">
              -BRINGING EVERY CHILD HOME-
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissingChildReportModal
