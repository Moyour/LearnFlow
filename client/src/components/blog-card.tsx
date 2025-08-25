import { Link } from "wouter";
import { BlogPost } from "@shared/schema";
import { Clock, MessageCircle, Star } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Mock author data - in a real app this would come from the post data
  const author = {
    name: "Kazeem Salau",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32",
    verified: true
  };

  // Mock engagement data
  const engagement = {
    claps: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 50) + 5,
    readTime: post.readTime || `${Math.floor(Math.random() * 10) + 3} min read`
  };

  return (
    <article className="group border-b border-gray-200 pb-8 last:border-b-0" data-testid={`blog-card-${post.id}`}>
      <div className="flex items-start gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-3">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <img 
              src={author.avatar}
              alt={author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700 font-medium">{author.name}</span>
            {author.verified && (
              <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              in <span className="font-medium text-gray-700">{post.category || 'Design'}</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
            <Link 
              href={`/blog/${post.id}`}
              data-testid={`blog-title-${post.id}`}
              className="hover:underline"
            >
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 text-lg leading-relaxed line-clamp-2" data-testid={`blog-excerpt-${post.id}`}>
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-1 text-gray-500">
              <Star className="w-4 h-4" />
              <span className="text-sm">{new Date(post.createdAt!).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
              })}</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{engagement.readTime}</span>
            </div>

            <div className="flex items-center gap-1 text-gray-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{engagement.comments}</span>
            </div>

            <div className="flex items-center gap-6 ml-auto">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  <circle cx="19" cy="12" r="1" fill="currentColor"/>
                  <circle cx="5" cy="12" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Optional Image */}
        {post.imageUrl && (
          <div className="flex-shrink-0">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-40 h-32 object-cover rounded-lg"
              data-testid={`blog-image-${post.id}`}
            />
          </div>
        )}
      </div>
    </article>
  );
}
