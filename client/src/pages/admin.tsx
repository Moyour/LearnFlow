import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Project, type InsertProject } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";

export default function Admin() {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<InsertProject>({
    title: "",
    description: "",
    category: "elearning",
    tools: [],
    imageUrl: "",
    caseStudyUrl: "",
    scormUrl: "",
    demoUrl: "",
    featured: false,
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      return await apiRequest("/api/projects", "POST", data);
    },
    onSuccess: () => {
      toast({ title: "Project created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setShowForm(false);
      form.reset();
    },
    onError: (error) => {
      toast({ title: "Error creating project", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProject> }) => {
      return await apiRequest(`/api/projects/${id}`, "PATCH", data);
    },
    onSuccess: () => {
      toast({ title: "Project updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setEditingProject(null);
      form.reset();
    },
    onError: (error) => {
      toast({ title: "Error updating project", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/projects/${id}`, "DELETE");
    },
    onSuccess: () => {
      toast({ title: "Project deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: (error) => {
      toast({ title: "Error deleting project", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
    setFormData({
      ...project,
    });
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setShowForm(false);
    setFormData({
      title: "",
      description: "",
      category: "elearning",
      tools: [],
      imageUrl: "",
      caseStudyUrl: "",
      scormUrl: "",
      demoUrl: "",
      featured: false,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Portfolio Admin</h1>
              <p className="text-white/80">Manage your projects and content</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
              data-testid="button-add-project"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>

          {showForm && (
            <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white text-sm font-medium">Title</label>
                        <Input 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          data-testid="input-title"
                        />
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium">Category</label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white mt-2" data-testid="select-category">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="elearning">E-Learning</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                            <SelectItem value="assessment">Assessment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium">Description</label>
                      <Textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                        rows={4}
                        data-testid="textarea-description"
                      />
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium">Tools (comma-separated)</label>
                      <Input 
                        value={formData.tools?.join(', ') || ''}
                        onChange={(e) => setFormData({...formData, tools: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})}
                        placeholder="Storyline 360, Adobe XD, React"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                        data-testid="input-tools"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white text-sm font-medium">Image URL</label>
                        <Input 
                          value={formData.imageUrl || ''}
                          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          data-testid="input-image-url"
                        />
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium">SCORM URL</label>
                        <Input 
                          value={formData.scormUrl || ''}
                          onChange={(e) => setFormData({...formData, scormUrl: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          data-testid="input-scorm-url"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-between rounded-lg border border-white/20 p-4">
                      <div className="space-y-0.5">
                        <label className="text-white text-sm font-medium">Featured Project</label>
                        <div className="text-sm text-white/60">
                          Display this project prominently on the homepage
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="h-4 w-4"
                        data-testid="switch-featured"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                        data-testid="button-save"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingProject ? 'Update' : 'Create'} Project
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={cancelEdit}
                        className="border-white/20 text-white hover:bg-white/10"
                        data-testid="button-cancel"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        {project.featured && (
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline" className="border-white/30 text-white/80">
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-white/80 mb-3">{project.description}</p>
                      {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tools.map((tool, index) => (
                            <Badge key={index} variant="secondary" className="bg-white/10 text-white/90">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {project.scormUrl && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          Interactive Training Available
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(project)}
                        className="border-white/20 text-white hover:bg-white/10"
                        data-testid={`button-edit-${project.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMutation.mutate(project.id)}
                        className="border-red-500/20 text-red-300 hover:bg-red-500/10"
                        data-testid={`button-delete-${project.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}