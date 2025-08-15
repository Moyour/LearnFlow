import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import aboutMeImage from "../assets/about-me.png";
import testiImage from "../assets/Tes4.jpg";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    // Scroll-triggered animations
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Testimonials reveal
      if (testimonialsRef.current) {
        const testimonialsTop = testimonialsRef.current.offsetTop;
        const testimonialsOffset = scrollY - testimonialsTop + windowHeight;
        if (testimonialsOffset > 0) {
          const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card');
          testimonialCards.forEach((card: any, index: number) => {
            const delay = index * 200;
            setTimeout(() => {
              card.style.transform = 'translateY(0) scale(1)';
              card.style.opacity = '1';
            }, delay);
          });
        }
      }

      // Projects reveal
      if (projectsRef.current) {
        const projectsTop = projectsRef.current.offsetTop;
        const projectsOffset = scrollY - projectsTop + windowHeight;
        if (projectsOffset > 0) {
          const projectCards = projectsRef.current.querySelectorAll('.project-card');
          projectCards.forEach((card: any, index: number) => {
            const delay = index * 300;
            setTimeout(() => {
              card.style.transform = 'translateY(0) rotateX(0)';
              card.style.opacity = '1';
            }, delay);
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
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
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        ))}
      </div>

      {/* Hero Section with Gradient and Image */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Enhanced Gradient Background with subtle movement */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        
        {/* Profile Image - Full Height Hero Section with parallax */}
        <div 
          className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center"
          style={{ 
            transform: isLoaded 
              ? `translateX(${mousePosition.x * -10}px) scale(1)` 
              : 'translateX(50px) scale(0.9)', 
            opacity: isLoaded ? 1 : 0,
            transition: isLoaded ? 'transform 0.3s ease-out' : 'all 1.5s ease-out 0.5s'
          }}
        >
          <div 
            className="relative w-full h-full overflow-hidden"
            style={{
              transform: `translateY(${mousePosition.y * -5}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <img
              src={aboutMeImage}
              alt="Kazeem Salau"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              style={{
                filter: 'contrast(1.1) brightness(1.0)'
              }}
              data-testid="profile-image"
            />
          </div>
        </div>

        {/* Content Container - Far Left Positioning */}
        <div className="relative z-10 px-8 lg:px-16 py-20 flex items-center min-h-screen">
          <div className="max-w-2xl">
            {/* Large Typography with staggered reveal */}
            <div 
              className="mb-12"
              style={{ 
                transform: isLoaded ? `translateX(${mousePosition.x * 5}px)` : 'translateX(-100px)', 
                opacity: isLoaded ? 1 : 0,
                transition: isLoaded ? 'transform 0.3s ease-out' : 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
              }}
            >
              <h1 className="text-[15vw] lg:text-[12vw] xl:text-[10vw] font-black leading-[0.8] tracking-tighter mb-8 text-white drop-shadow-2xl">
                <span 
                  className="inline-block"
                  style={{
                    animation: isLoaded ? 'slideInLeft 1s ease-out 0.5s both' : 'none'
                  }}
                >
                  FOR
                </span><br />
                <span 
                  className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent inline-block"
                  style={{
                    animation: isLoaded ? 'slideInLeft 1s ease-out 0.8s both, shimmer 3s ease-in-out infinite' : 'none'
                  }}
                >
                  LEARNING
                </span><br />
                <span 
                  className="inline-block"
                  style={{
                    animation: isLoaded ? 'slideInLeft 1s ease-out 1.1s both' : 'none'
                  }}
                >
                  DESIGN
                </span>
              </h1>
              
              {/* Subtitle with reveal animation */}
              <div 
                className="text-white/90 text-xl lg:text-2xl font-bold tracking-wide mb-4"
                style={{
                  animation: isLoaded ? 'fadeInUp 1s ease-out 1.4s both' : 'none'
                }}
              >
                KAZEEM SALAU
              </div>
              <div 
                className="w-20 h-1.5 bg-white/70 rounded-full"
                style={{
                  animation: isLoaded ? 'expandWidth 1s ease-out 1.7s both' : 'none'
                }}
              ></div>
            </div>

            {/* Description Text with floating effect */}
            <div 
              className="max-w-lg"
              style={{ 
                transform: isLoaded ? `translateX(${mousePosition.x * 3}px) translateY(${mousePosition.y * 3}px)` : 'translateX(-50px)', 
                opacity: isLoaded ? 1 : 0,
                transition: isLoaded ? 'transform 0.3s ease-out' : 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
              }}
            >
              <p 
                className="text-xl lg:text-2xl leading-relaxed mb-12 text-white/95 font-light"
                style={{
                  animation: isLoaded ? 'fadeInUp 1s ease-out 2s both' : 'none'
                }}
              >
                An experienced Instructional Designer and Learning Experience Designer specializing in contemporary and functional design. I bring learning solutions to life with purposeful, visually compelling experiences.
              </p>
              

            </div>
          </div>
        </div>


      </section>


      {/* Testimonials Section with testimonial image background */}
      <section ref={testimonialsRef} className="py-32 relative overflow-hidden">
        {/* Background Image with Overlay - Fill entire section */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url(${testiImage})`,
          }}
        ></div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/80"></div>
        {/* Enhanced Abstract geometric patterns covering entire section */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          {/* Large abstract shapes covering full area */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-white/8 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/6 transform rotate-45 blur-2xl"></div>
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-white/7 transform rotate-12 rounded-3xl blur-2xl"></div>
          <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-white/5 transform -rotate-12 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-white/6 rounded-full blur-2xl"></div>
          
          {/* Enhanced grid and geometric patterns */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 1000">
            <defs>
              <pattern id="largeGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                <circle cx="40" cy="40" r="2" fill="rgba(255,255,255,0.03)" />
              </pattern>
              <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="rgba(255,255,255,0.04)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#largeGrid)" />
            <rect width="100%" height="100%" fill="url(#dots)" />
            
            {/* Large flowing abstract lines */}
            <path d="M0,100 Q350,50 700,150 T1400,100" stroke="rgba(255,255,255,0.08)" strokeWidth="3" fill="none" />
            <path d="M0,300 Q400,200 800,350 T1400,250" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
            <path d="M0,500 Q450,400 900,550 T1400,450" stroke="rgba(255,255,255,0.04)" strokeWidth="2" fill="none" />
            <path d="M0,700 Q300,600 600,750 T1400,650" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
            <path d="M0,900 Q500,800 1000,950 T1400,850" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
            
            {/* Large geometric shapes */}
            <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            <rect x="1000" y="150" width="120" height="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" transform="rotate(45 1060 210)" />
            <polygon points="600,800 700,700 800,800 700,900" fill="rgba(255,255,255,0.03)" />
            <circle cx="300" cy="700" r="60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <rect x="900" y="600" width="100" height="100" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" transform="rotate(30 950 650)" />
            
            {/* Additional abstract elements */}
            <path d="M100,400 L300,400 L200,600 Z" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <ellipse cx="1200" cy="400" rx="90" ry="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" transform="rotate(25 1200 400)" />
          </svg>
        </div>

        {/* Enhanced floating elements covering entire background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full"
              style={{
                width: `${Math.random() * 8 + 3}px`,
                height: `${Math.random() * 8 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatSlow ${5 + Math.random() * 5}s ease-in-out infinite, pulse ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
          
          {/* Large geometric accent elements */}
          <div className="absolute top-1/6 left-1/5 w-48 h-48 border border-white/8 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-36 h-36 border border-white/6 transform rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-28 h-28 bg-white/3 rounded-lg transform rotate-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/6 left-1/3 w-40 h-40 border-2 border-white/5 transform rotate-45 animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-3/4 right-1/6 w-32 h-32 border border-white/7 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card mb-32 last:mb-0"
              style={{
                transform: 'translateY(50px) scale(0.9)',
                opacity: '0',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Large Word with perspective effect */}
              <div className="text-center mb-16 perspective-1000">
                <h2 
                  className="text-8xl lg:text-9xl font-black text-white/10 tracking-wider hover:text-white/20 transition-all duration-700"
                  style={{
                    transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
                    transition: 'transform 0.3s ease-out, color 0.7s ease-out',
                  }}
                >
                  {testimonial.word}
                </h2>
              </div>
              
              {/* Testimonial Content */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <Quote className="h-12 w-12 text-white/70" />
                  <blockquote className="text-2xl lg:text-3xl leading-relaxed text-gray-300">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="space-y-2">
                    <div className="text-xl font-bold text-white">{testimonial.name}</div>
                    <div className="text-lg text-white/80">{testimonial.title}</div>
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

      {/* Projects Section with scroll reveal */}
      <section ref={projectsRef} className="py-32 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 
              className="text-5xl lg:text-6xl font-black text-white mb-8 drop-shadow-lg"
              style={{
                animation: 'fadeInUp 1s ease-out both',
              }}
            >
              Featured Projects
            </h2>
            <p 
              className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
              style={{
                animation: 'fadeInUp 1s ease-out 0.3s both',
              }}
            >
              Transformative learning experiences that drive measurable results and engage learners at every level.
            </p>
          </div>

          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card mb-32 last:mb-0"
              style={{
                transform: 'translateY(100px) rotateX(30deg)',
                opacity: '0',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${mousePosition.y * 2}deg)`,
                  transition: 'transform 0.3s ease-out, background 0.5s ease-out',
                }}
              >
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="text-sm uppercase tracking-widest text-white/70 font-semibold">
                        {project.company}
                      </div>
                      <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                        {project.title}
                      </h3>
                      <div className="text-2xl lg:text-3xl font-bold text-white/80">
                        {project.subtitle}
                      </div>
                    </div>
                    
                    <p className="text-xl text-white/90 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium text-white border border-white/30 hover:bg-white/30 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-8 h-80 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <div className="text-white/60 text-lg">Project Visual</div>
                  </div>
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