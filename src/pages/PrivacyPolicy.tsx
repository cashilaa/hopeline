import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: January 15, 2024</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
              <p>
                HopeLine Child Tracking Kit ("we," "our," or "us") is committed to protecting the privacy and safety of 
                children and families using our platform. This Privacy Policy explains how we collect, use, and protect 
                information when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">2.1 Information About Missing Children</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Child's name, age, and physical description</li>
                <li>Recent photographs</li>
                <li>Location where child was last seen</li>
                <li>Circumstances of disappearance</li>
                <li>Guardian/parent contact information</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">2.2 Contact Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name and contact details of reporting person</li>
                <li>Relationship to the missing child</li>
                <li>Emergency contact information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. How We Use Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To help locate and reunite missing children with their families</li>
                <li>To coordinate with law enforcement and child protection services</li>
                <li>To provide updates to families and relevant authorities</li>
                <li>To maintain records for successful reunifications</li>
                <li>To improve our services and platform effectiveness</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Information Sharing</h2>
              <p className="mb-3">We may share information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Law enforcement agencies investigating missing child cases</li>
                <li>Child protection services and social welfare organizations</li>
                <li>Medical professionals when child safety is at risk</li>
                <li>Court orders or legal requirements</li>
              </ul>
              <p className="mt-3 font-medium">
                We do NOT share information with unauthorized third parties or for commercial purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All sensitive data is encrypted and stored securely</li>
                <li>Access is restricted to authorized personnel only</li>
                <li>Regular security audits and updates</li>
                <li>Secure data transmission protocols</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Data Retention</h2>
              <p>
                Missing child information is retained until the child is safely located and reunited with family, 
                or as required by law enforcement investigations. Success stories may be retained (with consent) 
                to help other families and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request updates on your case status</li>
                <li>Request correction of inaccurate information</li>
                <li>Withdraw consent (where legally permissible)</li>
                <li>Request deletion of data after case resolution</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Children's Privacy</h2>
              <p>
                We take special care to protect children's privacy and safety. All child information is handled 
                with the utmost sensitivity and in compliance with child protection laws. We work closely with 
                child welfare authorities to ensure appropriate handling of all cases.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <div className="mt-3 bg-gray-100 p-4 rounded">
                <p><strong>Email:</strong> privacy@hopelinechildtracing.co.ke</p>
                <p><strong>Phone:</strong> +254 XXX XXX XXX</p>
                <p><strong>Address:</strong> [Your Organization Address]</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify users of significant changes 
                and post the updated policy on our website with a new "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;