import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group" data-testid={`blog-card-${post.id}`}>
      <div className="relative overflow-hidden rounded-2xl mb-6">
        <img 
          src={post.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"} 
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          data-testid={`blog-image-${post.id}`}
        />
        <div className="absolute top-4 left-4">
          <Badge 
            className="bg-white/90 backdrop-blur-sm text-brand-slate"
            data-testid={`blog-category-${post.id}`}
          >
            {post.category}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-brand-slate group-hover:text-brand-blue transition-colors">
          <Link 
            href={`/blog/${post.id}`}
            data-testid={`blog-title-${post.id}`}
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-slate-600" data-testid={`blog-excerpt-${post.id}`}>
          {post.excerpt}
        </p>
        <div className="flex items-center text-sm text-slate-500">
          <span data-testid={`blog-date-${post.id}`}>
            {new Date(post.createdAt!).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </span>
          {post.readTime && (
            <>
              <span className="mx-2">•</span>
              <span data-testid={`blog-readtime-${post.id}`}>{post.readTime}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
