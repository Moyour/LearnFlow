import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import aboutMeImage from "../assets/about-me.png";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const testimonials = [
    {
      word: "INNOVATIVE",
      name: "Sarah Johnson",
      title: "Learning Director",
      company: "TechCorp",
      quote: "Kazeem's innovative approach to instructional design transformed our entire training program. His ability to blend technology with pedagogy is exceptional.",
    },
    {
      word: "MASTERFUL",
      name: "David Chen",
      title: "VP of Learning & Development",
      company: "Global Solutions",
      quote: "Working with Kazeem was a game-changer. His masterful understanding of learning psychology and design thinking elevated our content quality.",
    },
    {
      word: "VISIONARY",
      name: "Maria Rodriguez",
      title: "Chief Learning Officer",
      company: "InnovatED",
      quote: "Kazeem's visionary approach to e-learning design helped us achieve a 300% increase in learner engagement and completion rates.",
    },
    {
      word: "DEDICATED",
      name: "James Wilson",
      title: "Training Manager",
      company: "SkillBridge",
      quote: "His dedication to creating meaningful learning experiences is unmatched. Every project delivered exceeded our expectations.",
    },
  ];

  const projects = [
    {
      company: "TECHCORP",
      title: "LEADERSHIP DEVELOPMENT",
      subtitle: "ACCELERATED",
      description: "Designed a comprehensive leadership development program that increased management effectiveness by 85% and reduced training time by 40%.",
      tags: ["Leadership Training", "Interactive Modules", "Assessment Design", "Mobile Learning"],
    },
    {
      company: "GLOBAL SOLUTIONS",
      title: "COMPLIANCE TRAINING",
      subtitle: "STREAMLINED",
      description: "Created an engaging compliance training system that achieved 98% completion rates and improved knowledge retention by 70%.",
      tags: ["Compliance", "SCORM Development", "Gamification", "Progress Tracking"],
    },
    {
      company: "INNOVATED",
      title: "ONBOARDING EXPERIENCE",
      subtitle: "TRANSFORMED",
      description: "Revolutionized the employee onboarding process, reducing time-to-productivity by 50% and increasing satisfaction scores by 90%.",
      tags: ["Onboarding", "User Experience", "Content Strategy", "Digital Learning"],
    },
  ];

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Hero Section with Gradient and Image */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Enhanced Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400"></div>
        
        {/* Profile Image - Full Right Screen */}
        <div 
          className="absolute right-0 w-1/2 h-full flex items-start justify-center"
          style={{ 
            top: '120px', // Start below navbar
            height: 'calc(100vh - 240px)', // End at intro text
            transform: isLoaded ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.9)', 
            opacity: isLoaded ? 1 : 0,
            transition: 'all 1.5s ease-out 0.5s'
          }}
        >
          <img
            src={aboutMeImage}
            alt="Kazeem Salau"
            className="w-full h-full object-cover"
            style={{
              filter: 'contrast(1.1) brightness(1.0)'
            }}
            data-testid="profile-image"
          />
        </div>

        {/* Content Container - Far Left Positioning */}
        <div className="relative z-10 px-8 lg:px-16 py-20 flex items-center min-h-screen">
          <div className="max-w-2xl">
            {/* Large Typography - Bigger and Far Left */}
            <div 
              className="mb-12"
              style={{ 
                transform: isLoaded ? 'translateX(0)' : 'translateX(-100px)', 
                opacity: isLoaded ? 1 : 0,
                transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
              }}
            >
              <h1 className="text-[15vw] lg:text-[12vw] xl:text-[10vw] font-black leading-[0.8] tracking-tighter mb-8 text-white drop-shadow-2xl">
                FOR<br />
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">LEARNING</span><br />
                DESIGN
              </h1>
              
              {/* Subtitle */}
              <div className="text-white/90 text-xl lg:text-2xl font-bold tracking-wide mb-4">
                KAZEEM SALAU
              </div>
              <div className="w-20 h-1.5 bg-white/70 rounded-full"></div>
            </div>

            {/* Description Text */}
            <div 
              className="max-w-lg"
              style={{ 
                transform: isLoaded ? 'translateX(0)' : 'translateX(-50px)', 
                opacity: isLoaded ? 1 : 0,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
              }}
            >
              <p className="text-xl lg:text-2xl leading-relaxed mb-12 text-white/95 font-light">
                An experienced Instructional Designer and Learning Experience Designer specializing in contemporary and functional design. I bring learning solutions to life with purposeful, visually compelling experiences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/portfolio">
                  <Button 
                    size="lg" 
                    className="bg-white text-black hover:bg-white/90 hover:scale-105 px-12 py-6 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl"
                    data-testid="view-work-button"
                  >
                    View My Work
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-white text-white hover:bg-white hover:text-black hover:scale-105 px-12 py-6 rounded-full font-bold text-lg transition-all duration-300 backdrop-blur-sm"
                    data-testid="contact-button"
                  >
                    Let's Connect
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="absolute top-8 left-8 right-8 z-20">
          <div 
            className="flex justify-between items-center backdrop-blur-sm bg-white/5 rounded-2xl px-6 py-4 border border-white/10"
            style={{
              transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
              opacity: isLoaded ? 1 : 0,
              transition: 'all 1s ease-out 0.1s'
            }}
          >
            <div className="text-2xl font-bold text-white tracking-tight">kazeem</div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/portfolio" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105">Design</Link>
              <Link href="/blog" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105">Blog</Link>  
              <Link href="/about" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105">About</Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105">Contact</Link>
              <Link href="/contact" className="bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105">Let's talk ↗</Link>
            </div>
          </div>
        </nav>
      </section>


      {/* Testimonials Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="mb-32 last:mb-0">
              {/* Large Word */}
              <div className="text-center mb-16">
                <h2 className="text-8xl lg:text-9xl font-black text-white/10 tracking-wider">
                  {testimonial.word}
                </h2>
              </div>
              
              {/* Testimonial Content */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <Quote className="h-12 w-12 text-blue-400" />
                  <blockquote className="text-2xl lg:text-3xl leading-relaxed text-gray-300">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="space-y-2">
                    <div className="text-xl font-bold text-white">{testimonial.name}</div>
                    <div className="text-lg text-blue-400">{testimonial.title}</div>
                    <div className="text-gray-400">{testimonial.company}</div>
                  </div>
                </div>
                
                <div className="text-center lg:text-right">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    {testimonial.word}
                  </div>
                  <div className="text-xl text-gray-400">
                    {testimonial.name}
                  </div>
                  <div className="text-lg text-blue-400">
                    {testimonial.title}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {projects.map((project, index) => (
            <div key={index} className="mb-32 last:mb-0">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="text-sm uppercase tracking-widest text-blue-400 font-semibold">
                      {project.company}
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                    <div className="text-2xl lg:text-3xl font-bold text-blue-400">
                      {project.subtitle}
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-gray-300 border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-2xl p-8 h-80 flex items-center justify-center">
                  <div className="text-gray-500 text-lg">Project Visual</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-6xl lg:text-7xl font-bold text-white mb-16 leading-tight">
            Let's Start a<br />Conversation
          </h2>
          
          <p className="text-2xl lg:text-3xl text-gray-300 mb-16 leading-relaxed">
            Drop me a message, let's make something learners will love.
          </p>
          
          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-xl text-blue-400 font-semibold">
                Let's create something that actually works.
              </h3>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105"
                  data-testid="contact-cta-button"
                >
                  Get In Touch
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl text-blue-400 font-semibold">
                See how UX meets learning - connect with me.
              </h3>
              <Link href="/portfolio">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-black px-12 py-6 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105"
                  data-testid="portfolio-cta-button"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}