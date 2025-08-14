import { type Project, type InsertProject, type BlogPost, type InsertBlogPost, type Testimonial, type InsertTestimonial, type ContactSubmission, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Contact
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private blogPosts: Map<string, BlogPost>;
  private testimonials: Map<string, Testimonial>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.projects = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed some initial data
    const sampleProjects: Project[] = [
      {
        id: "1",
        title: "xAPI-Enabled Language Learning App",
        description: "A data-driven mobile learning solution for an international language school, leveraging xAPI for performance analytics.",
        longDescription: "This comprehensive mobile learning platform was designed for an international language school to track learner progress and improve performance through data-driven insights. The solution integrates xAPI standards to capture detailed learning analytics, enabling instructors to personalize learning paths and identify areas for improvement.",
        category: "elearning",
        tools: ["Storyline 360", "Adobe XD", "xAPI", "Adobe Illustrator"],
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: null,
        scormUrl: null,
        demoUrl: "https://example.com/demo/xapi-app",
        featured: true,
        createdAt: new Date("2024-12-01"),
      },
      {
        id: "2",
        title: "Healthcare Policy Rollout",
        description: "Comprehensive training program for 13,000+ healthcare employees on new suicide prevention policies.",
        longDescription: "A large-scale training initiative designed to educate over 13,000 healthcare professionals on new suicide prevention policies. The program utilized multiple modalities including interactive eLearning, video content, and assessment tools to ensure consistent understanding and application across the organization.",
        category: "corporate",
        tools: ["Articulate Rise", "Storyline 360", "Vyond", "Premier Pro", "Adobe InDesign", "Audacity"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "https://example.com/case-studies/healthcare-policy",
        scormUrl: "https://example.com/scorm/healthcare-training.zip",
        demoUrl: null,
        featured: true,
        createdAt: new Date("2024-11-15"),
      },
      {
        id: "3",
        title: "Microlearning for Professionals",
        description: "Mobile-first microlearning platform designed for busy professionals requiring just-in-time training.",
        longDescription: "A mobile-optimized microlearning platform that delivers bite-sized learning modules for busy professionals. The solution focuses on just-in-time learning delivery, allowing users to access relevant content quickly and efficiently during their workflow.",
        category: "mobile",
        tools: ["Adobe XD", "UX Design", "Responsive Design"],
        imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: null,
        scormUrl: null,
        demoUrl: "https://example.com/demo/microlearning-app",
        featured: true,
        createdAt: new Date("2024-10-20"),
      },
      {
        id: "4",
        title: "AI-Powered Skills Assessment",
        description: "Adaptive assessment platform using AI to provide personalized feedback and learning pathways.",
        longDescription: "An innovative assessment platform that leverages artificial intelligence to provide adaptive testing experiences. The system analyzes learner responses in real-time to adjust difficulty levels and provide personalized feedback and learning recommendations.",
        category: "assessment",
        tools: ["Machine Learning", "Data Analytics", "Adaptive Learning"],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "https://example.com/case-studies/ai-assessment",
        scormUrl: null,
        demoUrl: "https://example.com/demo/ai-assessment",
        featured: false,
        createdAt: new Date("2024-09-10"),
      },
      {
        id: "5",
        title: "VR Safety Training",
        description: "Immersive virtual reality training program for high-risk workplace safety scenarios.",
        longDescription: "A cutting-edge VR training solution designed for high-risk workplace environments. The immersive experience allows employees to practice safety procedures in realistic scenarios without actual risk, improving retention and practical application of safety protocols.",
        category: "corporate",
        tools: ["VR Development", "3D Design", "Simulation"],
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "https://example.com/case-studies/vr-safety",
        scormUrl: "https://example.com/scorm/vr-safety.zip",
        demoUrl: null,
        featured: false,
        createdAt: new Date("2024-08-25"),
      },
      {
        id: "6",
        title: "AI Coaching for Retail",
        description: "Interactive scenario-based training with AI coaching to improve retail performance and customer service.",
        longDescription: "A comprehensive retail training solution that combines scenario-based learning with AI-powered coaching. The platform provides real-time feedback and coaching suggestions to help retail employees improve their customer service skills and sales performance.",
        category: "corporate",
        tools: ["Storyline 360", "Custom API", "AI Integration"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: null,
        scormUrl: "https://example.com/scorm/retail-coaching.zip",
        demoUrl: "https://example.com/demo/retail-coaching",
        featured: true,
        createdAt: new Date("2024-07-15"),
      }
    ];

    const sampleBlogPosts: BlogPost[] = [
      {
        id: "1",
        title: "The Future of Microlearning in Corporate Training",
        excerpt: "Exploring how bite-sized learning experiences are revolutionizing workplace education and driving better retention rates...",
        content: "Microlearning has emerged as one of the most effective approaches to corporate training...",
        category: "Design Thinking",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        readTime: "5 min read",
        published: true,
        createdAt: new Date("2025-01-15"),
        updatedAt: new Date("2025-01-15"),
      },
      {
        id: "2",
        title: "Using Learning Analytics to Optimize Training ROI",
        excerpt: "Data-driven approaches to measuring learning effectiveness and demonstrating the business impact of training programs...",
        content: "Learning analytics provides unprecedented insights into training effectiveness...",
        category: "Analytics",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        readTime: "8 min read",
        published: true,
        createdAt: new Date("2025-01-10"),
        updatedAt: new Date("2025-01-10"),
      },
      {
        id: "3",
        title: "Designing Inclusive Learning Experiences",
        excerpt: "Best practices for creating accessible and inclusive educational content that serves diverse learning needs and preferences...",
        content: "Inclusive design principles are essential for creating effective learning experiences...",
        category: "Accessibility",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        readTime: "6 min read",
        published: true,
        createdAt: new Date("2025-01-05"),
        updatedAt: new Date("2025-01-05"),
      }
    ];

    const sampleTestimonials: Testimonial[] = [
      {
        id: "1",
        name: "Michael Rodriguez",
        role: "L&D Director",
        company: "TechCorp",
        content: "Sarah's approach to learning design transformed our employee training program. The engagement metrics improved by 40% and feedback has been overwhelmingly positive.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: "5",
        featured: true,
      },
      {
        id: "2",
        name: "Jennifer Adams",
        role: "VP Sales",
        company: "InnovateCo",
        content: "The mobile learning solution Sarah created for our sales team has been a game changer. Complex product training is now accessible anywhere, anytime.",
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: "5",
        featured: true,
      },
      {
        id: "3",
        name: "Dr. James Wilson",
        role: "Chief Medical Officer",
        company: "Regional Health",
        content: "Sarah's expertise in both instructional design and user experience made our healthcare training rollout seamless and effective. Outstanding results.",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        rating: "5",
        featured: true,
      }
    ];

    sampleProjects.forEach(project => this.projects.set(project.id, project));
    sampleBlogPosts.forEach(post => this.blogPosts.set(post.id, post));
    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.category === category)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: new Date() 
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;

    const updated: Project = { ...existing, ...updateData };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;

    const updated: BlogPost = { 
      ...existing, 
      ...updateData, 
      updatedAt: new Date() 
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.featured);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Contact
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const contact: ContactSubmission = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, contact);
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
