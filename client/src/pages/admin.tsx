import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Project, BlogPost, Testimonial, ContactSubmission, Resume, type InsertProject, type InsertBlogPost, type InsertTestimonial, type InsertResume } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Edit, Plus, Save, X, FileText, Users, Mail, FolderOpen, Eye, EyeOff, ImageIcon, Type, List, Quote } from "lucide-react";
import MarkdownContent from "@/components/markdown-content";


export default function Admin() {
  const [activeTab, setActiveTab] = useState("projects");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
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
  const [blogFormData, setBlogFormData] = useState<InsertBlogPost>({
    title: "",
    excerpt: "",
    content: "",
    category: "instructional-design",
    imageUrl: "",
    readTime: "",
    published: false,
  });
  const [testimonialFormData, setTestimonialFormData] = useState<InsertTestimonial>({
    name: "",
    role: "",
    company: "",
    content: "",
    avatarUrl: "",
    rating: "5",
    featured: false,
  });

  const [resumeFormData, setResumeFormData] = useState<InsertResume>({
    filename: "",
    originalName: "",
    fileUrl: "",
    parsedContent: "",
    isActive: false,
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  
  const { data: blogPosts = [], isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog?all=true"],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
  
  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  const { data: contacts = [], isLoading: contactsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contacts"],
  });

  const { data: resumes = [], isLoading: resumesLoading } = useQuery<Resume[]>({
    queryKey: ["/api/resumes"],
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      return await apiRequest("POST", "/api/projects", data);
    },
    onSuccess: () => {
      toast({ title: "Project created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      resetProjectForm();
    },
    onError: (error) => {
      toast({ title: "Error creating project", description: error.message, variant: "destructive" });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProject> }) => {
      return await apiRequest("PATCH", `/api/projects/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Project updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      resetProjectForm();
    },
    onError: (error) => {
      toast({ title: "Error updating project", description: error.message, variant: "destructive" });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Project deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: (error) => {
      toast({ title: "Error deleting project", description: error.message, variant: "destructive" });
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      return await apiRequest("POST", "/api/blog", data);
    },
    onSuccess: () => {
      toast({ title: "Blog post created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/blog?all=true"] });
      resetBlogForm();
    },
    onError: (error) => {
      toast({ title: "Error creating blog post", description: error.message, variant: "destructive" });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) => {
      return await apiRequest("PATCH", `/api/blog/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Blog post updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/blog?all=true"] });
      resetBlogForm();
    },
    onError: (error) => {
      toast({ title: "Error updating blog post", description: error.message, variant: "destructive" });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/blog/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Blog post deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/blog?all=true"] });
    },
    onError: (error) => {
      toast({ title: "Error deleting blog post", description: error.message, variant: "destructive" });
    },
  });

  const createTestimonialMutation = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      return await apiRequest("POST", "/api/testimonials", data);
    },
    onSuccess: () => {
      toast({ title: "Testimonial created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      resetTestimonialForm();
    },
    onError: (error) => {
      toast({ title: "Error creating testimonial", description: error.message, variant: "destructive" });
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/testimonials/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Testimonial deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: (error) => {
      toast({ title: "Error deleting testimonial", description: error.message, variant: "destructive" });
    },
  });

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createProjectMutation.mutate(formData);
    }
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlogPost) {
      updateBlogMutation.mutate({ id: editingBlogPost.id, data: blogFormData });
    } else {
      createBlogMutation.mutate(blogFormData);
    }
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTestimonialMutation.mutate(testimonialFormData);
  };

  const resetProjectForm = () => {
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

  const resetBlogForm = () => {
    setEditingBlogPost(null);
    setShowForm(false);
    setBlogFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "instructional-design",
      imageUrl: "",
      readTime: "",
      published: false,
    });
  };

  const resetTestimonialForm = () => {
    setEditingTestimonial(null);
    setShowForm(false);
    setTestimonialFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      avatarUrl: "",
      rating: "5",
      featured: false,
    });
  };

  const startProjectEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
    setFormData({ ...project });
  };

  const startBlogEdit = (post: BlogPost) => {
    setEditingBlogPost(post);
    setShowForm(true);
    setBlogFormData({ ...post });
  };

  // Resume mutations
  const createResumeMutation = useMutation({
    mutationFn: async (data: InsertResume) => {
      return await apiRequest("POST", "/api/resumes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({ title: "Resume saved successfully!" });
      resetResumeForm();
    },
    onError: () => {
      toast({ title: "Failed to save resume", variant: "destructive" });
    },
  });

  const activateResumeMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("PATCH", `/api/resumes/${id}/activate`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({ title: "Resume activated successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to activate resume", variant: "destructive" });
    },
  });

  const deleteResumeMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/resumes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({ title: "Resume deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete resume", variant: "destructive" });
    },
  });

  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      
      // Create resume record
      createResumeMutation.mutate({
        filename: result.data.filename || file.name,
        originalName: file.name,
        fileUrl: result.data.fileUrl || `/uploads/${file.name}`,
        parsedContent: result.data.rawContent || "",
        isActive: false,
      });

    } catch (error) {
      toast({ title: "Failed to upload resume", variant: "destructive" });
    }
  };

  const resetResumeForm = () => {
    setResumeFormData({
      filename: "",
      originalName: "",
      fileUrl: "",
      parsedContent: "",
      isActive: false,
    });
  };

  const isLoading = projectsLoading || blogLoading || testimonialsLoading || contactsLoading || resumesLoading;

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
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Website Admin</h1>
            <p className="text-white/80">Complete content management system for your portfolio</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="h-10 items-center justify-center rounded-md p-1 grid w-full grid-cols-5 bg-white/10 backdrop-blur-md border-white/20 text-[#ffffff]">
              <TabsTrigger value="projects" className="data-[state=active]:bg-white/20">
                <FolderOpen className="w-4 h-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="blog" className="data-[state=active]:bg-white/20 text-[#ffffff]">
                <FileText className="w-4 h-4 mr-2" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="data-[state=active]:bg-white/20">
                <Users className="w-4 h-4 mr-2" />
                Testimonials
              </TabsTrigger>
              <TabsTrigger value="resumes" className="data-[state=active]:bg-white/20">
                <FileText className="w-4 h-4 mr-2" />
                Resumes
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-white/20">
                <Mail className="w-4 h-4 mr-2" />
                Contact Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Projects Management</h2>
                <Button
                  onClick={() => {setShowForm(true); setActiveTab("projects")}}
                  className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                  data-testid="button-add-project"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              {showForm && activeTab === "projects" && (
                <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {editingProject ? 'Edit Project' : 'Add New Project'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProjectSubmit} className="space-y-6">
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
                        disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                        className="bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-600 hover:to-purple-600"
                        data-testid="button-save"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingProject ? 'Update' : 'Create'} Project
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetProjectForm}
                        className="border-white/20 text-white hover:bg-white/10 bg-[#ff00001a]"
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
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              Interactive Training Available
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startProjectEdit(project)}
                            className="border-white/20 text-white hover:bg-white/10 bg-[#554491]"
                            data-testid={`button-edit-${project.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteProjectMutation.mutate(project.id)}
                            className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-[#57449100]"
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
            </TabsContent>

            <TabsContent value="blog" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Blog Posts Management</h2>
                <Button
                  onClick={() => {setShowForm(true); setActiveTab("blog")}}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Blog Post
                </Button>
              </div>

              {showForm && activeTab === "blog" && (
                <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {editingBlogPost ? 'Edit Blog Post' : 'Add New Blog Post'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBlogSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white text-sm font-medium">Title</label>
                          <Input 
                            value={blogFormData.title}
                            onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Category</label>
                          <Select value={blogFormData.category} onValueChange={(value) => setBlogFormData({...blogFormData, category: value})}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="instructional-design">Instructional Design</SelectItem>
                              <SelectItem value="elearning">E-Learning</SelectItem>
                              <SelectItem value="book-review">Book Review</SelectItem>
                              <SelectItem value="personal-development">Personal Development</SelectItem>
                              <SelectItem value="case-study">Case Study</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-white text-sm font-medium">Excerpt</label>
                        <Textarea 
                          value={blogFormData.excerpt}
                          onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-white text-sm font-medium">Content (Markdown supported)</label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPreview(!showPreview)}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                            {showPreview ? 'Hide Preview' : 'Show Preview'}
                          </Button>
                        </div>

                        {/* Formatting Toolbar */}
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-2">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const textarea = document.querySelector('textarea[placeholder*="Write your blog content"]') as HTMLTextAreaElement;
                                if (textarea) {
                                  const start = textarea.selectionStart;
                                  const end = textarea.selectionEnd;
                                  const text = textarea.value;
                                  const newText = text.substring(0, start) + '![Image description](https://your-image-url.com/image.jpg)\n\n' + text.substring(end);
                                  setBlogFormData({...blogFormData, content: newText});
                                }
                              }}
                              className="text-white/80 hover:bg-white/10 h-8"
                            >
                              <ImageIcon className="w-4 h-4 mr-1" />
                              Image
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const textarea = document.querySelector('textarea[placeholder*="Write your blog content"]') as HTMLTextAreaElement;
                                if (textarea) {
                                  const start = textarea.selectionStart;
                                  const end = textarea.selectionEnd;
                                  const text = textarea.value;
                                  const newText = text.substring(0, start) + '## ' + text.substring(end);
                                  setBlogFormData({...blogFormData, content: newText});
                                }
                              }}
                              className="text-white/80 hover:bg-white/10 h-8"
                            >
                              <Type className="w-4 h-4 mr-1" />
                              Heading
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const textarea = document.querySelector('textarea[placeholder*="Write your blog content"]') as HTMLTextAreaElement;
                                if (textarea) {
                                  const start = textarea.selectionStart;
                                  const end = textarea.selectionEnd;
                                  const text = textarea.value;
                                  const newText = text.substring(0, start) + '- List item\n- List item\n' + text.substring(end);
                                  setBlogFormData({...blogFormData, content: newText});
                                }
                              }}
                              className="text-white/80 hover:bg-white/10 h-8"
                            >
                              <List className="w-4 h-4 mr-1" />
                              List
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const textarea = document.querySelector('textarea[placeholder*="Write your blog content"]') as HTMLTextAreaElement;
                                if (textarea) {
                                  const start = textarea.selectionStart;
                                  const end = textarea.selectionEnd;
                                  const text = textarea.value;
                                  const newText = text.substring(0, start) + '> Your quote here\n\n' + text.substring(end);
                                  setBlogFormData({...blogFormData, content: newText});
                                }
                              }}
                              className="text-white/80 hover:bg-white/10 h-8"
                            >
                              <Quote className="w-4 h-4 mr-1" />
                              Quote
                            </Button>
                          </div>
                          <div className="text-xs text-white/70 space-y-1">
                            <p><strong>Quick reference:</strong></p>
                            <p>**Bold** | *Italic* | [Link](url) | ![Image](url) | ## Heading | &gt; Quote</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {/* Editor */}
                          <div className={showPreview ? "lg:grid lg:grid-cols-2 lg:gap-4" : ""}>
                            <div>
                              <Textarea 
                                value={blogFormData.content}
                                onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                placeholder="Write your blog content here using Markdown formatting..."
                                rows={showPreview ? 20 : 12}
                              />
                            </div>
                            
                            {/* Preview */}
                            {showPreview && (
                              <div className="bg-white rounded-lg p-6 max-h-96 overflow-y-auto">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Preview</h4>
                                <MarkdownContent content={blogFormData.content || "Start typing to see preview..."} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white text-sm font-medium">Image URL</label>
                          <Input 
                            value={blogFormData.imageUrl || ''}
                            onChange={(e) => setBlogFormData({...blogFormData, imageUrl: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                            placeholder="Optional image for the blog post"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Read Time</label>
                          <Input 
                            value={blogFormData.readTime || ''}
                            onChange={(e) => setBlogFormData({...blogFormData, readTime: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                            placeholder="e.g., 5 min read"
                          />
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-between rounded-lg border border-white/20 p-4">
                        <div className="space-y-0.5">
                          <label className="text-white text-sm font-medium">Publish Blog Post</label>
                          <div className="text-sm text-white/60">
                            Make this blog post visible on the blog page
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={blogFormData.published || false}
                          onChange={(e) => setBlogFormData({...blogFormData, published: e.target.checked})}
                          className="h-4 w-4"
                          data-testid="switch-published"
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-gradient-to-r from-green-500 to-purple-500">
                          <Save className="w-4 h-4 mr-2" />
                          {editingBlogPost ? 'Update' : 'Create'} Blog Post
                        </Button>
                        <Button type="button" variant="outline" onClick={resetBlogForm} className="border-red/20 text-white hover:bg-white/10">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6">
                {blogLoading ? (
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-12 text-center">
                      <div className="text-white">Loading blog posts...</div>
                    </CardContent>
                  </Card>
                ) : blogPosts.length === 0 ? (
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-12 text-center">
                      <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">No blog posts yet</h3>
                      <p className="text-white/60 mb-4">Create your first blog post to get started</p>
                      <Button
                        onClick={() => {setShowForm(true); setActiveTab("blog")}}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        data-testid="button-create-first-blog"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Blog Post
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  blogPosts.map((post) => (
                    <Card key={post.id} className="bg-white/10 backdrop-blur-md border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">{post.title}</h3>
                              <Badge variant="outline" className="border-white/30 text-white/80">
                                {post.category}
                              </Badge>
                              {post.published && (
                                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                  Published
                                </Badge>
                              )}
                            </div>
                            <p className="text-white/80 mb-3">{post.excerpt || "No excerpt provided"}</p>
                            <p className="text-white/60 text-sm">
                              Created: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Date unknown'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startBlogEdit(post)}
                              className="border-white/20 text-white hover:bg-white/10 bg-[#554491]"
                              data-testid={`button-edit-blog-${post.id}`}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteBlogMutation.mutate(post.id)}
                              className="border-red-500/20 text-red-300 hover:bg-red-500/10"
                              data-testid={`button-delete-blog-${post.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Testimonials Management</h2>
                <Button
                  onClick={() => {setShowForm(true); setActiveTab("testimonials")}}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </div>

              {showForm && activeTab === "testimonials" && (
                <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Add New Testimonial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white text-sm font-medium">Name</label>
                          <Input 
                            value={testimonialFormData.name}
                            onChange={(e) => setTestimonialFormData({...testimonialFormData, name: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Role</label>
                          <Input 
                            value={testimonialFormData.role}
                            onChange={(e) => setTestimonialFormData({...testimonialFormData, role: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium">Company</label>
                        <Input 
                          value={testimonialFormData.company}
                          onChange={(e) => setTestimonialFormData({...testimonialFormData, company: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white text-sm font-medium">Testimonial Content</label>
                        <Textarea 
                          value={testimonialFormData.content}
                          onChange={(e) => setTestimonialFormData({...testimonialFormData, content: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-gradient-to-r from-green-500 to-purple-500">
                          <Save className="w-4 h-4 mr-2" />
                          Create Testimonial
                        </Button>
                        <Button type="button" variant="outline" onClick={resetTestimonialForm} className="border-white/20 text-white hover:bg-white/10">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                            <Badge variant="outline" className="border-white/30 text-white/80">
                              {testimonial.role} at {testimonial.company}
                            </Badge>
                            {testimonial.featured && (
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-white/80">{testimonial.content}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteTestimonialMutation.mutate(testimonial.id)}
                            className="border-red-500/20 text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resumes" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Resume Management</h2>
                <div>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleResumeUpload(file);
                      }
                    }}
                    className="hidden"
                    id="resume-upload"
                    data-testid="input-resume-upload"
                  />
                  <Button
                    onClick={() => document.getElementById('resume-upload')?.click()}
                    className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                    data-testid="button-upload-resume"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Resume
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-6">
                {resumes.map((resume) => (
                  <Card key={resume.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold text-white">{resume.originalName}</h3>
                            {resume.isActive && (
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                Active
                              </Badge>
                            )}
                          </div>
                          
                          {resume.parsedContent && (
                            <div className="mb-4 p-4 bg-white/5 rounded-lg">
                              <h4 className="text-white font-medium mb-2">Parsed Content Preview:</h4>
                              <div className="text-white/80 text-sm">
                                <p className="line-clamp-3">{resume.parsedContent.substring(0, 200)}...</p>
                              </div>
                            </div>
                          )}
                          
                          <p className="text-white/60 text-sm">
                            Uploaded: {resume.uploadedAt ? new Date(resume.uploadedAt).toLocaleDateString() : 'Date unknown'}
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          {!resume.isActive && (
                            <Button
                              onClick={() => activateResumeMutation.mutate(resume.id)}
                              size="sm"
                              className="bg-green-500/20 hover:bg-green-500/30 text-green-300"
                              data-testid={`button-activate-resume-${resume.id}`}
                            >
                              Set Active
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteResumeMutation.mutate(resume.id)}
                            size="sm"
                            variant="destructive"
                            className="bg-red-500/20 hover:bg-red-500/30"
                            data-testid={`button-delete-resume-${resume.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {resumes.length === 0 && (
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-12 text-center">
                      <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">No resumes uploaded</h3>
                      <p className="text-white/60 mb-4">Upload your first resume to get started</p>
                      <Button
                        onClick={() => document.getElementById('resume-upload')?.click()}
                        className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                        data-testid="button-upload-first-resume"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Resume
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
              
              <div className="grid gap-6">
                {contacts.map((contact) => (
                  <Card key={contact.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{contact.firstName} {contact.lastName}</h3>
                            <Badge variant="outline" className="border-white/30 text-white/80">
                              {contact.email}
                            </Badge>
                            {contact.company && (
                              <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                                {contact.company}
                              </Badge>
                            )}
                          </div>
                          <p className="text-white/80 mb-3">{contact.message}</p>
                          <p className="text-white/60 text-sm">
                            Received: {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'Date unknown'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}