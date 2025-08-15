import { ArrowRight, Monitor, Smartphone, Building2, FileText, BookOpen } from "lucide-react";
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
        return <Monitor className="w-12 h-12" />;
      case "mobile":
        return <Smartphone className="w-12 h-12" />;
      case "corporate":
        return <Building2 className="w-12 h-12" />;
      case "assessment":
        return <FileText className="w-12 h-12" />;
      default:
        return <BookOpen className="w-12 h-12" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "elearning":
        return "E-LEARNING";
      case "mobile":
        return "MOBILE LEARNING";
      case "corporate":
        return "CORPORATE TRAINING";
      case "assessment":
        return "ASSESSMENT";
      default:
        return "LEARNING DESIGN";
    }
  };

  return (
    <div 
      className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden p-8 min-h-[400px] flex flex-col"
      data-testid={`project-card-${project.id}`}
    >
      {/* Icon Section */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-white">
          {getCategoryIcon(project.category)}
        </div>
      </div>
      
      {/* Category Label */}
      <div className="text-center mb-4">
        <span className="text-white/70 text-sm font-medium tracking-wider">
          {getCategoryLabel(project.category)}
        </span>
      </div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold text-white text-center mb-4 leading-tight" data-testid={`project-title-${project.id}`}>
        {project.title}
      </h3>
      
      {/* Description */}
      <p className="text-white/80 text-center mb-6 flex-grow leading-relaxed" data-testid={`project-description-${project.id}`}>
        {project.description}
      </p>
      
      {/* Tools */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {project.tools?.slice(0, 3).map((tool, index) => (
          <Badge 
            key={index} 
            className="bg-white/20 text-white border-white/30 text-xs hover:bg-white/30"
            data-testid={`project-tool-${project.id}-${index}`}
          >
            {tool}
          </Badge>
        ))}
        {project.tools && project.tools.length > 3 && (
          <Badge className="bg-white/20 text-white border-white/30 text-xs">
            +{project.tools.length - 3} more
          </Badge>
        )}
      </div>
      
      {/* Action Button */}
      <div className="text-center">
        <Link href={`/projects/${project.id}`}>
          <button 
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-900 hover:bg-white/90 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
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