// Helper functions for handling image imports
// This makes it easy to switch between your uploaded images and fallbacks

// Import your uploaded images here
// Example:
// import heroImage from "@assets/hero-image.jpg";
// import aboutPortrait from "@assets/about-portrait.jpg";
// import project1 from "@assets/project-1.jpg";

// Fallback to current images if your images aren't uploaded yet
const fallbackImages = {
  hero: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
  aboutPortrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
  project1: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  project2: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  project3: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  project4: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  project5: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  project6: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
};

// Export function to get image (your upload or fallback)
export const getImage = (imageKey: keyof typeof fallbackImages) => {
  // When you upload images, uncomment and modify these lines:
  // switch(imageKey) {
  //   case 'hero': return heroImage;
  //   case 'aboutPortrait': return aboutPortrait;
  //   case 'project1': return project1;
  //   // ... add more cases for your uploaded images
  //   default: return fallbackImages[imageKey];
  // }
  
  // For now, return fallbacks
  return fallbackImages[imageKey];
};