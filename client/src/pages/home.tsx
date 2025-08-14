import { Link } from "wouter";
import { ArrowRight, Play, BookOpen, Users, Target, Lightbulb, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BlogPost, Project } from "@shared/schema";

export default function Home() {
  const { data: blogPosts = [] } = useQuery({
    queryKey: ["/api/blog"],
    queryFn: () => fetch("/api/blog?published=true").then(res => res.json()),
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: () => fetch("/api/projects").then(res => res.json()),
  });

  const featuredPosts = blogPosts.slice(0, 2);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Completely New Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                  <Award className="w-4 h-4 mr-2" />
                  Certified Learning Experience Designer
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Hello, I'm{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Kazeem
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                  Transforming complex ideas into engaging learning experiences that drive real behavioral change and performance improvement.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg text-sm font-semibold">
                  Instructional Design
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg text-sm font-semibold">
                  Learning Analytics
                </div>
                <div className="bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 rounded-lg text-sm font-semibold">
                  UX for Learning
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/portfolio">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-xl"
                    data-testid="explore-work-button"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Explore My Work
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                    data-testid="start-project-button"
                  >
                    Start a Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/src/assets/About us.PNG" 
                  alt="Kazeem Salau - Learning Experience Designer" 
                  className="rounded-3xl shadow-2xl w-full h-auto border-4 border-white/20"
                  data-testid="hero-portrait"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-3xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-brand-blue">6+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-brand-purple">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-brand-blue">100K+</div>
              <div className="text-gray-600">Learners Impacted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-brand-purple">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What I Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I specialize in creating learning solutions that bridge the gap between complex content and meaningful understanding.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Curriculum Design</h3>
                <p className="text-gray-600">
                  Strategic learning pathways that align with business objectives and learner needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Experience Design</h3>
                <p className="text-gray-600">
                  User-centered approaches that make learning engaging, accessible, and effective.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Performance Solutions</h3>
                <p className="text-gray-600">
                  Data-driven interventions that drive measurable behavior change and results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Work</h2>
              <p className="text-xl text-gray-600">Recent projects that showcase my approach to learning design.</p>
            </div>
            <Link href="/portfolio">
              <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project: Project) => (
              <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lightbulb className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.split(',').slice(0, 2).map((tech: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Insights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thoughts on learning design, technology trends, and the future of workplace learning.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post: BlogPost) => (
              <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="text-brand-blue text-sm font-medium">{post.category}</div>
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-brand-blue to-brand-purple hover:from-blue-600 hover:to-purple-600 text-white"
                data-testid="view-all-articles"
              >
                Read All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-purple">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning Programs?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's create learning experiences that engage, inspire, and deliver measurable results for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-white text-brand-blue hover:bg-gray-100"
                data-testid="start-conversation-button"
              >
                Start a Conversation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              data-testid="download-portfolio-button"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
