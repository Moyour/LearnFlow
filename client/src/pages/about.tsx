import { Tag, Lightbulb, GraduationCap, Code } from "lucide-react";

export default function About() {
  return (
    <div className="py-20 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            About Me
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Passionate about creating learning experiences that truly make a difference
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">My Journey</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                As an experienced Instructional Designer and Learning Experience Designer, I bring a unique blend of learning strategy and digital creativity to every project. My professional certifications in Instructional Design and Design Thinking enable me to create high-impact learning solutions that drive both engagement and performance across corporate and tech environments.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                Beyond my core responsibilities, I actively create instructional content for broader audiences through digital platforms and video, translating complex topics into clear, accessible learning experiences. This ongoing practice keeps me current with emerging trends and maintains my learner-focused mindset.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                My approach combines proven instructional design methodologies with innovative technologies to create solutions that not only educate but inspire. Whether it's developing immersive VR training simulations, designing mobile microlearning platforms, or implementing AI-powered assessment tools, I'm committed to pushing the boundaries of what's possible in learning and development.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="/src/assets/About us.PNG" 
                alt="Professional instructional designer"
                className="rounded-2xl shadow-2xl w-full h-auto border-4 border-white/20"
                data-testid="about-portrait"
              />
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12 drop-shadow-lg">Certifications & Credentials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Tag className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Certified Instructional Designer</h3>
                <p className="text-sm text-white/80">Professional certification in instructional design principles and practices</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Design Thinking Certified</h3>
                <p className="text-sm text-white/80">Human-centered design approach for innovation and problem-solving</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Learning Science</h3>
                <p className="text-sm text-white/80">Evidence-based approaches to learning and cognitive psychology</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-brand-slate mb-2">eLearning Development</h3>
                <p className="text-sm text-slate-600">Technical expertise in modern eLearning authoring tools and platforms</p>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-slate-50 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-brand-slate text-center mb-8">My Design Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-slate mb-4">Learner-Centered</h3>
                <p className="text-slate-600">Every design decision starts with understanding the learner's needs, context, and goals. I believe in creating experiences that respect the learner's time and cognitive load.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-slate mb-4">Evidence-Based</h3>
                <p className="text-slate-600">I ground my design choices in learning science research and continuously measure and iterate based on data and learner feedback.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-slate mb-4">Innovation-Driven</h3>
                <p className="text-slate-600">While respecting proven methodologies, I'm always exploring new technologies and approaches that can enhance the learning experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
