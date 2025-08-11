import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "elearning":
        return "💻";
      case "mobile":
        return "📱";
      case "corporate":
        return "🏢";
      case "assessment":
        return "📝";
      default:
        return "📚";
    }
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      data-testid={`project-card-${project.id}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.imageUrl || "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"} 
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          data-testid={`project-image-${project.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-2xl">{getCategoryIcon(project.category)}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-slate mb-2" data-testid={`project-title-${project.id}`}>
          {project.title}
        </h3>
        <p className="text-slate-600 mb-4" data-testid={`project-description-${project.id}`}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools?.slice(0, 3).map((tool, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs"
              data-testid={`project-tool-${project.id}-${index}`}
            >
              {tool}
            </Badge>
          ))}
          {project.tools && project.tools.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.tools.length - 3} more
            </Badge>
          )}
        </div>
        
        <Link href={`/projects/${project.id}`}>
          <button 
            className="inline-flex items-center text-brand-blue hover:text-brand-purple font-medium transition-colors"
            data-testid={`project-link-${project.id}`}
          >
            View Case Study 
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}