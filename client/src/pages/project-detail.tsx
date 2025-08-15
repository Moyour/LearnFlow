import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Download, Play, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@shared/schema";
import { useState } from "react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [showScormEmbed, setShowScormEmbed] = useState(false);
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-brand-slate mb-4">Project Not Found</h1>
          <p className="text-slate-600 mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/portfolio">
            <Button>Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Back Navigation */}
        <Link href="/portfolio">
          <Button variant="ghost" className="mb-8" data-testid="back-to-portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-slate mb-6" data-testid="project-title">
            {project.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-6" data-testid="project-description">
            {project.description}
          </p>
          
          {/* Tools Used */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tools?.map((tool: string, index: number) => (
              <Badge 
                key={index} 
                variant="secondary"
                data-testid={`project-tool-${index}`}
              >
                {tool}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.demoUrl && (
              <Button 
                asChild
                className="bg-brand-blue hover:bg-blue-600"
                data-testid="demo-button"
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 h-4 w-4" />
                  View Demo
                </a>
              </Button>
            )}
            {project.caseStudyUrl && (
              <Button 
                variant="outline"
                asChild
                data-testid="case-study-button"
              >
                <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Case Study
                </a>
              </Button>
            )}
            {project.scormUrl && (
              <>
                <Button 
                  onClick={() => setShowScormEmbed(!showScormEmbed)}
                  className="bg-green-600 hover:bg-green-700"
                  data-testid="scorm-embed-button"
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  {showScormEmbed ? "Hide" : "Try"} Interactive Training
                </Button>
                <Button 
                  variant="outline"
                  asChild
                  data-testid="scorm-button"
                >
                  <a href={project.scormUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in New Window
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <img 
            src={project.imageUrl || "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"} 
            alt={project.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
            data-testid="project-image"
          />
        </div>

        {/* Embedded SCORM Content */}
        {showScormEmbed && project.scormUrl && (
          <div className="mb-12 bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 rounded-lg p-2">
                    <Monitor className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Interactive Training Module</h3>
                    <p className="text-white/80 text-sm">Try the actual learning content</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowScormEmbed(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="relative bg-gray-50">
              <iframe
                src={project.scormUrl}
                title={`${project.title} - Interactive Training`}
                className="w-full h-[600px] border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="scorm-iframe"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-slate-600">
                Interactive content by {project.title}
              </div>
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-brand-slate mb-4">Project Overview</h2>
          <p className="text-slate-600 leading-relaxed mb-8" data-testid="project-long-description">
            {project.longDescription || project.description}
          </p>

          {/* Project Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-brand-slate mb-4">Challenge</h3>
              <p className="text-slate-600">
                The project addressed the need for an innovative learning solution that could engage learners 
                while delivering measurable performance improvements in a complex organizational environment.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-slate mb-4">Solution</h3>
              <p className="text-slate-600">
                Through careful analysis and user-centered design, we developed a comprehensive learning 
                experience that combines multiple modalities and leverages cutting-edge technology.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-slate mb-4">Process</h3>
              <p className="text-slate-600">
                The project followed proven instructional design methodologies, incorporating stakeholder 
                feedback and iterative testing to ensure optimal learning outcomes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-slate mb-4">Results</h3>
              <p className="text-slate-600">
                The final solution exceeded expectations, demonstrating significant improvements in learner 
                engagement, knowledge retention, and on-the-job performance.
              </p>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="border-t border-slate-200 pt-12">
          <h2 className="text-2xl font-bold text-brand-slate mb-8 text-center">More Projects</h2>
          <div className="text-center">
            <Link href="/portfolio">
              <Button 
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                data-testid="view-more-projects"
              >
                View All Projects
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
