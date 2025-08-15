import express from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertBlogPostSchema, insertTestimonialSchema, insertContactSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for SCORM files
  },
  fileFilter: (req, file, cb) => {
    // Allow common file types for portfolio content
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml',
      'application/zip', 'application/x-zip-compressed', // SCORM files
      'video/mp4', 'video/webm',
      'application/pdf',
      'application/msword', // .doc files
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx files
      'text/plain' // .txt files
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const category = req.query.category as string;
      const featured = req.query.featured === "true";
      
      let projects;
      if (featured) {
        projects = await storage.getFeaturedProjects();
      } else if (category) {
        projects = await storage.getProjectsByCategory(category);
      } else {
        projects = await storage.getProjects();
      }
      
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Blog posts routes
  app.get("/api/blog", async (req, res) => {
    try {
      const published = req.query.published !== "false";
      const posts = published 
        ? await storage.getPublishedBlogPosts()
        : await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.put("/api/blog/:id", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Testimonials routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const featured = req.query.featured === "true";
      const testimonials = featured 
        ? await storage.getFeaturedTestimonials()
        : await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(400).json({ message: "Invalid testimonial data" });
    }
  });

  // Contact route
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: contact.id });
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  // File upload routes
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Generate a URL for the uploaded file
      const fileUrl = `/uploads/${req.file.filename}`;
      
      res.json({
        url: fileUrl,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
    } catch (error) {
      res.status(500).json({ message: "Upload failed" });
    }
  });

  // Resume parsing endpoint
  app.post("/api/parse-resume", upload.single("resume"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    try {
      // Helper functions for basic text extraction
      const extractName = (text: string) => {
        // Simple name extraction - look for common patterns
        const namePatterns = [
          /^([A-Z][a-z]+ [A-Z][a-z]+)/m,
          /Name:\s*([A-Z][a-z]+ [A-Z][a-z]+)/i
        ];
        for (const pattern of namePatterns) {
          const match = text.match(pattern);
          if (match) return match[1];
        }
        return null;
      };

      const extractEmail = (text: string) => {
        const emailPattern = /([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
        const match = text.match(emailPattern);
        return match ? match[1] : null;
      };

      const extractPhone = (text: string) => {
        const phonePattern = /(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/;
        const match = text.match(phonePattern);
        return match ? match[1] : null;
      };

      // Basic text extraction from file content
      let content = '';
      const fileBuffer = req.file.buffer;
      
      if (req.file.mimetype === 'text/plain') {
        content = fileBuffer.toString('utf-8');
      } else {
        // For PDF/DOC files, we'll extract basic text
        // In a production app, you'd use libraries like pdf-parse, mammoth, etc.
        content = `Please paste your resume content here. Currently supporting plain text files for parsing.`;
      }

      // Basic parsing logic
      const parsedData = {
        personalInfo: {
          name: extractName(content) || "Your Name",
          email: extractEmail(content) || "your.email@example.com", 
          phone: extractPhone(content) || "+1 (555) 123-4567",
          location: "Your City, State",
        },
        summary: "Professional summary will be extracted from your resume content...",
        rawContent: content,
        filename: req.file.originalname,
        uploadDate: new Date().toISOString()
      };

      res.json({
        success: true,
        data: parsedData,
        message: "Resume uploaded successfully. Please review and edit the information below."
      });

    } catch (error) {
      console.error("Resume parsing error:", error);
      res.status(500).json({
        error: "Failed to parse resume",
        message: "Please ensure your file is a valid resume document"
      });
    }
  });

  // Serve uploaded files
  app.use("/uploads", (req, res, next) => {
    // Add CORS headers for file access
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
  }, express.static(uploadDir));

  const httpServer = createServer(app);
  return httpServer;
}
