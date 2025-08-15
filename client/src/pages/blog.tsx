import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/blog-card";
import { BlogPost } from "@shared/schema";
import testiImage from "../assets/Tes4.jpg";

export default function Blog() {

  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ["/api/blog"],
    queryFn: () => fetch("/api/blog?published=true").then(res => res.json()),
  });

  return (
    <div className="py-20 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Blog & Insights
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Thoughts on instructional design trends, learning technology, and creating effective educational experiences
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image with Overlay - Fill entire section */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url(${testiImage})`,
          }}
        ></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/80"></div>
        
        {/* Abstract geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-tl from-indigo-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Blog Posts List - Medium Style */}
          {isLoading ? (
            <div className="max-w-4xl mx-auto space-y-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                        <div className="h-3 bg-white/20 rounded w-32"></div>
                      </div>
                      <div className="h-8 bg-white/20 rounded mb-3"></div>
                      <div className="h-4 bg-white/20 rounded mb-2"></div>
                      <div className="h-4 bg-white/20 rounded w-3/4 mb-4"></div>
                      <div className="flex items-center gap-4">
                        <div className="h-3 bg-white/20 rounded w-16"></div>
                        <div className="h-3 bg-white/20 rounded w-12"></div>
                        <div className="h-3 bg-white/20 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="w-40 h-32 bg-white/20 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-white/80">No articles found.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-12">
              {blogPosts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
