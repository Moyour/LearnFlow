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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Blog Posts List - Medium Style */}
          {isLoading ? (
            <div className="max-w-4xl mx-auto space-y-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="flex items-center gap-4">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="w-40 h-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No articles found.</p>
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
