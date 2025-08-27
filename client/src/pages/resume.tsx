import * as React from "react";
import { Download, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resume() {
  return (
    <div className="py-20 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Resume
          </h1>
          <p className="text-xl text-white/90 leading-relaxed mb-8">
            Experienced Instructional Designer & Learning Experience Designer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/Kazeem_Salau_Resume.pdf" download>
              <Button
                className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                data-testid="download-resume"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Contact Information */}
          <div className="mb-12 p-8 bg-gray-50 rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Kazeem Salau</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-600" />
                <span>kazeem.salau@email.com</span>
              </div>
              <div className="flex ITEMS-center gap-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-600" />
                <span>kzeemsalau.com</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Results孝2Results-driven Instructional Designer with 8+ years of experience creating engaging,
              learner-centered educational experiences. Expert in applying learning science principles,
              design thinking methodologies, and cutting-edge educational technologies to deliver
              measurable learning outcomes. Proven track record of improving learner engagement by
              40% and knowledge retention by 35% through innovative design approaches.
            </p>
          </div>

          {/* Core Competencies */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Core Competencies
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Design & Development</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Instructional Design (ADDIE, SAM)</li>
                  <li>• Learning Experience Design</li>
                  <li>• Curriculum Development</li>
                  <li>• Assessment Design</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Technology & Tools</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Articulate Storyline 360</li>
                  <li>• Adobe Creative Suite</li>
                  <li>• LMS Administration</li>
                  <li>• xAPI/SCORM</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Research & Analysis</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Learning Analytics</li>
                  <li>• User Experience Research</li>
                  <li>• Performance Analysis</li>
                  <li>• Needs Assessment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Professional Experience
            </h3>
            <div className="space-y-8">
              {/* Job 1 */}
              <div className="border-l-4 border-purple-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-900">Senior Learning Experience Designer</h4>
                  <span className="text-gray-500 font-medium">2021 - Present</span>
                </div>
                <p className="text-purple-600 font-medium mb-3">TechCorp Solutions | San Francisco, CA</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lead design and development of enterprise-wide learning programs serving 5,000+ employees</li>
                  <li>• Implemented microlearning strategy resulting in 40% increase in course completion rates</li>
                  <li>• Collaborated with cross-functional teams to align learning objectives with business goals</li>
                  <li>• Mentored junior designers and established design standards and best practices</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="border-l-4 border-purple-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-900">Instructional Designer</h4>
                  <span className="text-gray-500 font-medium">2019 - 2021</span>
                </div>
                <p className="text-purple-600 font-medium mb-3">EduTech Innovations | Remote</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Designed and developed 50+ interactive e-learning modules using Articulate Storyline</li>
                  <li>• Conducted learner analysis and usability testing to optimize learning experiences</li>
                  <li>• Improved learner satisfaction scores by 35% through user-centered design approaches</li>
                  <li>• Created comprehensive style guides and design documentation</li>
                </ul>
              </div>

              {/* Job 3 */}
              <div className="border-l-4 border-purple-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-900">Learning Specialist</h4>
                  <span className="text-gray-500 font-medium">2017 - 2019</span>
                </div>
                <p className="text-purple-600 font-medium mb-3">Global Learning Institute | New York, NY</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Developed curriculum for professional development programs in healthcare sector</li>
                  <li>• Facilitated training sessions for 200+ healthcare professionals annually</li>
                  <li>• Implemented learning analytics to track and improve program effectiveness</li>
                  <li>• Collaborated with subject matter experts to ensure content accuracy and relevance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Education
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-200 pl-6">
                <h4 className="text-xl font-semibold text-gray-900">Master of Education (M.Ed.)</h4>
                <p className="text-purple-600 font-medium">Instructional Technology | Stanford University</p>
                <p className="text-gray-500">2017 | Magna Cum Laude</p>
              </div>
              <div className="border-l-4 border-purple-200 pl-6">
                <h4 className="text-xl font-semibold text-gray-900">Bachelor of Science (B.S.)</h4>
                <p className="text-purple-600 font-medium">Educational Psychology | UC Berkeley</p>
                <p className="text-gray-500">2015 | Summa Cum Laude</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Certifications & Awards
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Professional Certifications</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Certified Professional in Learning and Performance (CPLP)</li>
                  <li>• Google UX Design Certificate</li>
                  <li>• Articulate Storyline 360 Expert</li>
                  <li>• Adobe Certified Expert (ACE)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Awards & Recognition</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Learning Innovation Award 2023</li>
                  <li>• Best E-Learning Course Design 2022</li>
                  <li>• Outstanding Graduate Student Award 2017</li>
                  <li>• Dean's List (2013-2015)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Key Projects
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Onboarding Transformation</h4>
                <p className="text-gray-700 mb-3">
                  Complete redesign of company-wide onboarding program using design thinking methodology.
                  Reduced time-to-productivity by 45% and increased new hire satisfaction by 60%.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">Design Thinking</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">Microlearning</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">Analytics</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-Enhanced Learning Platform</h4>
                <p className="text-gray-700 mb-3">
                  Pioneered integration of AI-powered personalization features in corporate LMS,
                  resulting in 50% improvement in learning path completion and 30% increase in knowledge retention.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">AI Integration</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">Personalization</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">LMS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}