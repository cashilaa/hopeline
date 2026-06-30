import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: January 15, 2024</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the HopeLine Child Tracking Kit platform, you agree to be bound by these 
                Terms of Service and all applicable laws and regulations. If you do not agree with any of these 
                terms, you are prohibited from using this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Service Description</h2>
              <p>
                HopeLine Child Tracking Kit is a platform designed to help locate missing children and reunite 
                them with their families. Our services include:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Missing child report submission and management</li>
                <li>Public database of missing children information</li>
                <li>Coordination with law enforcement and child protection services</li>
                <li>Success story documentation and resources</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Eligibility and User Responsibilities</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">3.1 Eligibility</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>You must be at least 18 years old to submit reports</li>
                <li>You must have legal authority to report the missing child</li>
                <li>You agree to provide accurate and truthful information</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">3.2 User Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Report genuine missing child cases only</li>
                <li>Provide accurate, complete, and up-to-date information</li>
                <li>Notify us immediately when a child is found</li>
                <li>Cooperate with law enforcement investigations</li>
                <li>Respect the privacy and dignity of all families involved</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Prohibited Uses</h2>
              <p className="mb-3">You agree NOT to use this service to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit false or misleading information about missing children</li>
                <li>Harass, threaten, or intimidate other users or families</li>
                <li>Use the platform for commercial or promotional purposes</li>
                <li>Violate any local, state, national, or international laws</li>
                <li>Interfere with the proper functioning of the platform</li>
                <li>Access or attempt to access restricted areas or data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Content and Information</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">5.1 User-Generated Content</h3>
              <p>
                By submitting information, photos, or other content, you grant us permission to use, display, 
                and share this content for the purpose of locating missing children and reuniting families.
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">5.2 Content Accuracy</h3>
              <p>
                While we strive to maintain accurate information, we cannot guarantee the accuracy of all 
                user-submitted content. Users are responsible for verifying information independently.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                use, and protect your information. By using our service, you consent to our data practices as 
                described in the Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Law Enforcement Cooperation</h2>
              <p>
                We work closely with law enforcement agencies and child protection services. We may share 
                information with these authorities as required by law or when necessary for child safety. 
                Users agree to cooperate with legitimate law enforcement investigations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Disclaimers and Limitations</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">8.1 Service Availability</h3>
              <p>
                While we strive to maintain continuous service, we cannot guarantee uninterrupted access. 
                The platform may be temporarily unavailable for maintenance, updates, or technical issues.
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">8.2 No Guarantee of Outcome</h3>
              <p>
                While we are committed to helping locate missing children, we cannot guarantee that every 
                child will be found or that every case will be resolved successfully.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Emergency Situations</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="font-semibold text-red-800">IMPORTANT:</p>
                <p className="text-red-700">
                  In case of a missing child emergency, contact local law enforcement IMMEDIATELY. 
                  Call 999 (Kenya Emergency Services) or your local police station before using our platform.
                </p>
              </div>
              <p>
                Our platform is a supplementary tool and should not replace immediate contact with authorities 
                in emergency situations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Intellectual Property</h2>
              <p>
                The HopeLine Child Tracking Kit platform, including its design, functionality, and content 
                (excluding user-generated content), is protected by intellectual property laws. Users may not 
                copy, modify, or distribute our platform without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to our services for users who violate 
                these terms, provide false information, or engage in activities that may harm children or families.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">12. Changes to Terms</h2>
              <p>
                We may modify these Terms of Service at any time. Users will be notified of significant changes, 
                and continued use of the platform constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">13. Contact Information</h2>
              <p>
                For questions about these Terms of Service or our platform, please contact us:
              </p>
              <div className="mt-3 bg-gray-100 p-4 rounded">
                <p><strong>Email:</strong> hopelinetracingkenya@gmail.com</p>
                <p><strong>Phone:</strong> +254 728 620 614</p>
                <p><strong>Address:</strong> Dagoretti North, Kabiro Ward
Nairobi, Kenya</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">14. Governing Law</h2>
              <p>
                These Terms of Service are governed by the laws of Kenya. Any disputes arising from the use 
                of this platform will be subject to the jurisdiction of Kenyan courts.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;