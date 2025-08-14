import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import { Project } from "@shared/schema";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "elearning", label: "eLearning" },
  { id: "mobile", label: "Mobile Learning" },
  { id: "corporate", label: "Corporate Training" },
  { id: "assessment", label: "Assessment" },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects.filter((project: Project) => {
    const matchesCategory = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = !searchTerm || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tools?.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-20 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Portfolio
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            A comprehensive showcase of instructional design projects across various industries and learning contexts
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Search and Filter Controls */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60"
                data-testid="project-search"
              />
            </div>
            
            {/* Project Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(category.id)}
                  className={
                    activeFilter === category.id
                      ? "bg-white text-indigo-900 hover:bg-white/90"
                      : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                  }
                  data-testid={`filter-${category.id}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-white/80">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* Results Count */}
          {!isLoading && (
            <div className="text-center mt-12">
              <p className="text-white/70">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
