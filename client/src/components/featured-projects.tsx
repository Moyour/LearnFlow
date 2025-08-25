import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProjectCard from "./project-card";
import { Project } from "@shared/schema";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "elearning", label: "eLearning" },
  { id: "mobile", label: "Mobile Learning" },
  { id: "corporate", label: "Corporate Training" },
  { id: "assessment", label: "Assessment" },
];

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects.filter((project: Project) => 
    activeFilter === "all" || project.category === activeFilter
  );

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate mb-4">Featured Work</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate mb-4">Featured Work</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A selection of projects showcasing instructional design solutions across various industries and learning contexts.
          </p>
        </div>
        
        {/* Project Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              onClick={() => setActiveFilter(category.id)}
              className={
                activeFilter === category.id
                  ? "bg-brand-purple hover:bg-purple-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }
              data-testid={`filter-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/portfolio">
            <Button 
              size="lg"
              className="bg-brand-purple hover:bg-purple-600 text-white"
              data-testid="view-all-projects"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
