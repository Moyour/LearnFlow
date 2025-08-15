import { Brain, Users, Target, Sparkles, Award, BookOpen, Lightbulb, Zap, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import aboutMeImage from "../assets/about-me.png";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { icon: Brain, title: "Learning Psychology", level: 95 },
    { icon: Users, title: "Stakeholder Management", level: 90 },
    { icon: Target, title: "Learning Objectives", level: 98 },
    { icon: Sparkles, title: "Creative Design", level: 92 },
  ];

  const achievements = [
    { number: "150+", label: "Projects Delivered", icon: Target },
    { number: "98%", label: "Client Satisfaction", icon: Heart },
    { number: "5+", label: "Years Experience", icon: Award },
    { number: "50K+", label: "Learners Impacted", icon: Users },
  ];

  const philosophy = [
    {
      title: "Human-Centered",
      description: "Every learning experience starts with understanding the learner's needs, motivations, and context.",
      icon: Heart,
      color: "from-pink-400 to-purple-500"
    },
    {
      title: "Evidence-Based",
      description: "Grounding design decisions in learning science and measurable outcomes drives effectiveness.",
      icon: Brain,
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Innovation-Driven",
      description: "Embracing emerging technologies and methodologies to push the boundaries of what's possible.",
      icon: Zap,
      color: "from-amber-400 to-orange-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen">
      
      {/* Hero Section with Split Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Content Side */}
            <div 
              className="space-y-8"
              style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
              }}
            >
              <div className="space-y-4">
                <div className="text-white/70 text-sm uppercase tracking-widest font-semibold">
                  About Kazeem
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                  CRAFTING
                  <br />
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    LEARNING
                  </span>
                  <br />
                  EXPERIENCES
                </h1>
              </div>
              
              <p className="text-xl text-white/90 leading-relaxed font-light max-w-lg">
                An experienced Instructional Designer passionate about transforming complex concepts into engaging, memorable learning journeys that drive real behavioral change.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
                  <span className="text-white font-medium">🎓 Certified ID</span>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
                  <span className="text-white font-medium">💡 Design Thinking</span>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
                  <span className="text-white font-medium">🧠 Learning Science</span>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div 
              className="relative"
              style={{
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.9)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
              }}
            >
              <div className="relative">
                <img 
                  src={aboutMeImage}
                  alt="Kazeem Salau - Instructional Designer"
                  className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white/20"
                  data-testid="about-portrait"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:scale-105 transition-all duration-300"
              >
                <achievement.icon className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-4xl font-black text-white mb-2">{achievement.number}</div>
                <div className="text-white/80 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Core Expertise</h2>
            <p className="text-xl text-white/80">Areas where I deliver exceptional results</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <skill.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{skill.title}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-white/80">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-white to-white/80 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Design Philosophy</h2>
            <p className="text-xl text-white/80">The principles that guide every learning experience I create</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {philosophy.map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`w-24 h-24 bg-gradient-to-r ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}>
                  <item.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <BookOpen className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Learning?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Let's collaborate to create learning experiences that don't just inform, but inspire and transform your learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-white text-indigo-900 px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Start a Conversation
              </a>
              <a 
                href="/portfolio"
                className="bg-white/20 text-white px-8 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
