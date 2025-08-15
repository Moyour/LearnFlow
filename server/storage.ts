import { type Project, type InsertProject, type BlogPost, type InsertBlogPost, type Testimonial, type InsertTestimonial, type ContactSubmission, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { projects, blogPosts, testimonials, contactSubmissions } from "@shared/schema";
import { eq } from "drizzle-orm";

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
  deleteTestimonial(id: string): Promise<boolean>;

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
        title: "xAPI-Enabled Language Learning Platform",
        description: "Data-driven mobile learning solution for international language schools, leveraging xAPI for advanced performance analytics and personalized learning paths.",
        longDescription: "This comprehensive mobile learning platform was designed for an international language school network serving 15,000+ students across 12 countries. The solution integrates xAPI standards to capture detailed learning analytics, enabling instructors to personalize learning paths and identify areas for improvement. Key features include adaptive assessments, real-time progress tracking, gamification elements, and multi-language support. The platform achieved 89% learner satisfaction and 34% improvement in language proficiency scores.",
        category: "elearning",
        tools: ["Storyline 360", "Adobe XD", "xAPI", "Adobe Illustrator"],
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "/case-studies/language-learning",
        scormUrl: "https://codvacreatives.com/demo/fixer/story_html5.html",
        demoUrl: null,
        featured: true,
        createdAt: new Date("2024-12-01"),
      },
      {
        id: "2",
        title: "Healthcare Policy Training Suite",
        description: "Comprehensive training program for 13,000+ healthcare employees on critical suicide prevention policies and protocols.",
        longDescription: "This large-scale training initiative was designed to educate over 13,000 healthcare professionals on new suicide prevention policies across multiple hospital systems. The program utilized a blended learning approach with interactive eLearning modules, scenario-based simulations, video content, and comprehensive assessment tools to ensure consistent understanding and application across the organization. The training achieved a 98% completion rate and 45% improvement in policy adherence scores.",
        category: "corporate",
        tools: ["Articulate Rise", "Storyline 360", "Vyond", "Premiere Pro", "Adobe InDesign", "Audacity"],
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "/case-studies/healthcare-policy",
        scormUrl: "https://codvacreatives.com/demo/Businesswriting/story_html5.html",
        demoUrl: "/demos/healthcare-preview",
        featured: true,
        createdAt: new Date("2024-11-15"),
      },
      {
        id: "3",
        title: "Executive Microlearning Suite",
        description: "Mobile-first microlearning platform delivering bite-sized professional development content for busy executives and managers.",
        longDescription: "A revolutionary microlearning platform designed for Fortune 500 executives and senior managers. The solution delivers personalized 3-5 minute learning modules covering leadership, strategy, and industry insights. Features include AI-powered content curation, spaced repetition algorithms, peer learning networks, and integration with calendar systems for optimal learning moments. The platform serves 8,500+ executives across 45+ companies, achieving 92% engagement rates and measurable leadership skill improvements.",
        category: "mobile",
        tools: ["Adobe XD", "UX Design", "Responsive Design"],
        imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "/case-studies/microlearning-suite", 
        scormUrl: "https://codvacreatives.com/demo/holyspirit/story_html5.html",
        demoUrl: null,
        featured: true,
        createdAt: new Date("2024-10-20"),
      },
      {
        id: "4",
        title: "AI-Powered Skills Assessment Engine",
        description: "Intelligent assessment platform using machine learning to deliver adaptive testing with personalized feedback and dynamic learning pathways.",
        longDescription: "A cutting-edge assessment platform that revolutionizes skills evaluation through artificial intelligence. The system analyzes learner responses in real-time, adjusting difficulty levels and question types to provide the most accurate skill assessment. Features include natural language processing for open-ended responses, computer vision for practical skill evaluation, predictive analytics for learning recommendations, and integration with major LMS platforms. Deployed across 250+ organizations, the platform has reduced assessment time by 60% while increasing accuracy by 45%.",
        category: "assessment",
        tools: ["Machine Learning", "Data Analytics", "Adaptive Learning"],
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "/case-studies/ai-assessment",
        scormUrl: "https://codvacreatives.com/demo/ei/story_html5.html",
        demoUrl: null,
        featured: false,
        createdAt: new Date("2024-09-10"),
      },
      {
        id: "5",
        title: "Immersive VR Safety Training Suite",
        description: "Next-generation virtual reality training program for high-risk industrial environments, featuring haptic feedback and realistic emergency scenarios.",
        longDescription: "A groundbreaking VR training solution designed for oil & gas, manufacturing, and construction industries. The immersive experience allows employees to practice critical safety procedures in photorealistic environments without actual risk. Features include haptic feedback suits, eye-tracking analytics, multiplayer emergency scenarios, and AI-powered performance coaching. Deployed across 85+ industrial sites, the program reduced safety incidents by 73% and achieved 96% training completion rates. The solution supports Oculus, HTC Vive, and enterprise VR headsets.",
        category: "corporate",
        tools: ["VR Development", "3D Design", "Simulation"],
        imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "/case-studies/vr-safety",
        scormUrl: "https://codvacreatives.com/demo/fixer/story_html5.html",
        demoUrl: null,
        featured: false,
        createdAt: new Date("2024-08-25"),
      },
      {
        id: "6",
        title: "AI-Powered Retail Excellence Platform",
        description: "Intelligent training ecosystem combining scenario-based simulations with AI coaching to transform retail performance and customer experience.",
        longDescription: "A revolutionary retail training platform that merges advanced AI coaching with realistic customer interaction simulations. The system provides real-time feedback, personalized coaching suggestions, and predictive performance analytics. Features include voice recognition for sales conversations, emotional intelligence training, product knowledge assessments, and competitive analysis tools. Implemented across 1,200+ retail locations, the platform increased sales performance by 28%, customer satisfaction scores by 41%, and employee retention by 35%. The solution integrates with major POS systems and CRM platforms.",
        category: "corporate",
        tools: ["Storyline 360", "Custom API", "AI Integration"],
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "/case-studies/retail-coaching",
        scormUrl: "https://codvacreatives.com/demo/Businesswriting/story_html5.html", 
        demoUrl: null,
        featured: true,
        createdAt: new Date("2024-07-15"),
      },
      {
        id: "7",
        title: "Global Leadership Development Program",
        description: "Comprehensive blended learning solution for developing next-generation leaders across multinational organizations.",
        longDescription: "An award-winning leadership development program designed for Fortune 100 companies with global operations. The solution combines virtual instructor-led training, peer mentoring, 360-degree assessments, and real-world project applications. Features include cultural intelligence modules, cross-functional collaboration simulations, executive coaching integration, and ROI tracking dashboards. Implemented across 25+ countries in 12+ languages, the program has developed 3,500+ leaders with 94% promotion rates and measurable business impact improvements of 42%.",
        category: "corporate",
        tools: ["Rise 360", "Zoom Integration", "Power BI", "Adobe Creative Suite"],
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "/case-studies/leadership-program",
        scormUrl: "https://codvacreatives.com/demo/holyspirit/story_html5.html",
        demoUrl: null,
        featured: true,
        createdAt: new Date("2024-06-20"),
      },
      {
        id: "8",
        title: "Adaptive Math Learning Engine",
        description: "AI-driven personalized mathematics education platform for K-12 students with learning disabilities and diverse learning needs.",
        longDescription: "A breakthrough adaptive learning platform specifically designed for students with dyscalculia, ADHD, and other learning differences. The system uses machine learning algorithms to identify learning patterns, adjust difficulty in real-time, and provide multi-modal instruction methods. Features include gamification elements, parent/teacher dashboards, accessibility compliance (WCAG 2.1 AA), and evidence-based pedagogical approaches. Deployed in 150+ schools across 8 states, the platform has improved math proficiency scores by 67% among students with learning disabilities.",
        category: "elearning", 
        tools: ["Unity 3D", "TensorFlow", "React Native", "Adobe Illustrator"],
        imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        caseStudyUrl: "/case-studies/adaptive-math",
        scormUrl: "https://codvacreatives.com/demo/ei/story_html5.html",
        demoUrl: null,
        featured: false,
        createdAt: new Date("2024-05-10"),
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

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.featured, true));
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.category, category));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values({
      ...project,
      id: randomUUID(),
      createdAt: new Date(),
    }).returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db.update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject || undefined;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowCount > 0;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values({
      ...post,
      id: randomUUID(),
      createdAt: new Date(),
    }).returning();
    return newPost;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db.update(blogPosts)
      .set(post)
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount > 0;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.featured, true));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values({
      ...testimonial,
      id: randomUUID(),
      createdAt: new Date(),
    }).returning();
    return newTestimonial;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return result.rowCount > 0;
  }

  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const [newSubmission] = await db.insert(contactSubmissions).values({
      ...contact,
      id: randomUUID(),
      createdAt: new Date(),
    }).returning();
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }
}

export const storage = new DatabaseStorage();
