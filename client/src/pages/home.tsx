import Hero from "@/components/hero";
import FeaturedProjects from "@/components/featured-projects";
import SkillsSection from "@/components/skills-section";
import Testimonials from "@/components/testimonials";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog-card";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";

export default function Home() {
  const { data: blogPosts = [] } = useQuery({
    queryKey: ["/api/blog"],
    queryFn: () => fetch("/api/blog?published=true").then(res => res.json()),
  });

  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <div>
      <Hero />
      
      {/* About Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate mb-6">About Me</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  As an experienced Instructional Designer and Learning Experience Designer, I bring a unique blend of learning strategy and digital creativity to every project. My professional certifications in Instructional Design and Design Thinking enable me to create high-impact learning solutions that drive both engagement and performance.
                </p>
                <Link href="/about">
                  <Button 
                    variant="outline"
                    className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                    data-testid="learn-more-about"
                  >
                    Learn More About Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              {/* Certifications */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-brand-slate">Certifications & Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-brand-blue">🎓</span>
                    <span className="text-slate-600">Certified Instructional Designer</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-brand-purple">💡</span>
                    <span className="text-slate-600">Design Thinking Certified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-brand-blue">🎯</span>
                    <span className="text-slate-600">Learning Science</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-brand-purple">💻</span>
                    <span className="text-slate-600">eLearning Development</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
                alt="Professional instructional designer portrait" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="about-image"
              />
              
              {/* Decorative skill badges */}
              <div className="absolute -right-4 top-8 bg-white rounded-xl shadow-lg p-4 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="text-center">
                  <span className="text-2xl text-brand-blue mb-2 block">🧠</span>
                  <p className="text-sm font-semibold text-slate-700">ADDIE Model</p>
                </div>
              </div>
              
              <div className="absolute -left-4 bottom-8 bg-white rounded-xl shadow-lg p-4 transform -rotate-3 hover:rotate-0 transition-transform">
                <div className="text-center">
                  <span className="text-2xl text-brand-purple mb-2 block">👥</span>
                  <p className="text-sm font-semibold text-slate-700">UX Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProjects />
      <SkillsSection />
      <Testimonials />
      
      {/* Blog Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate mb-4">Latest Insights</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Thoughts on instructional design trends, learning technology, and creating effective educational experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button 
                size="lg"
                className="bg-brand-blue hover:bg-blue-600 text-white"
                data-testid="view-all-articles"
              >
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
