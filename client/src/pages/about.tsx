import { Quote, Lightbulb, ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { useState, useEffect } from "react";
import aboutMeImage from "../assets/about-me.png";

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const journey = [
    {
      year: "2019",
      title: "Learning & Development Specialist",
      company: "Educational Technology Firm",
      description: "Developed comprehensive training programs for corporate clients, focusing on digital transformation and skill development."
    },
    {
      year: "2021", 
      title: "Senior Instructional Designer",
      company: "Global Learning Solutions",
      description: "Led cross-functional teams in creating scalable learning experiences, achieving 95% learner satisfaction across 50+ projects."
    },
    {
      year: "2023",
      title: "Learning Experience Designer", 
      company: "Independent Consultant",
      description: "Launched consultancy practice specializing in innovative learning solutions for Fortune 500 companies and emerging startups."
    }
  ];

  const insights = [
    {
      question: "What drives exceptional learning design?",
      answer: "Understanding that learning is fundamentally about transformation. Every touchpoint should move learners closer to their goals while respecting their cognitive load and context."
    },
    {
      question: "How do you approach complex subject matter?",
      answer: "I break complexity into progressive layers, using storytelling and visual design to create clear pathways. The goal is mastery, not just consumption."
    },
    {
      question: "What role does technology play in your process?",
      answer: "Technology amplifies great instructional design but never replaces it. I choose tools that serve the learning objectives, not the other way around."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen">
      
      {/* Floating Elements Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-40 right-32 w-48 h-48 bg-pink-400/10 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute bottom-40 left-40 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>

      {/* Hero Section - Minimalist Approach */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Content Side - 7 columns */}
            <div className="lg:col-span-7 space-y-12">
              <div 
                className="space-y-6"
                style={{
                  transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              >
                <div className="space-y-2">
                  <p className="text-white/60 text-sm font-medium tracking-wide uppercase">
                    Instructional Designer
                  </p>
                  <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tight">
                    KAZEEM
                    <br />
                    <span className="text-white/20">SALAU</span>
                  </h1>
                </div>
                
                <div className="max-w-md space-y-6">
                  <p className="text-xl text-white/90 leading-relaxed font-light">
                    Crafting learning experiences that bridge the gap between knowledge and transformation through strategic design and human psychology.
                  </p>
                  
                  <div className="flex items-center gap-6 text-white/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Lagos, Nigeria</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">5+ Years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">50K+ Learners</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side - 5 columns */}
            <div className="lg:col-span-5">
              <div 
                className="relative"
                style={{
                  transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
                }}
              >
                <div className="relative overflow-hidden rounded-3xl">
                  <img 
                    src={aboutMeImage}
                    alt="Kazeem Salau"
                    className="w-full h-auto filter contrast-110 brightness-105"
                    data-testid="about-portrait"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-32 bg-black/20 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              The Journey
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              From educational technology to independent consulting, each role has shaped my approach to learning design.
            </p>
          </div>
          
          <div className="space-y-16">
            {journey.map((item, index) => (
              <div 
                key={index} 
                className="relative grid lg:grid-cols-12 gap-8 items-center group"
              >
                {/* Year */}
                <div className="lg:col-span-2">
                  <div className="text-4xl font-black text-white/30 group-hover:text-white/60 transition-colors duration-300">
                    {item.year}
                  </div>
                </div>
                
                {/* Content */}
                <div className="lg:col-span-10 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-lg text-white/80 font-medium">{item.company}</p>
                    </div>
                    <p className="text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & Insights */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Design Philosophy
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Three key questions that guide every project and inform my approach to creating meaningful learning experiences.
            </p>
          </div>
          
          <div className="space-y-12">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/10 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {insight.question}
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed">
                      {insight.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Let's Create Something Exceptional
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your learning programs? Let's discuss how strategic instructional design can drive real results for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a 
                href="/contact"
                className="group bg-white text-indigo-900 px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/portfolio"
                className="bg-white/10 text-white px-8 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
