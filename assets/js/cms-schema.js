/**
 * CMS CONTENT JSON SCHEMA
 * 
 * This file defines the structure of the encrypted content stored in /data/content.enc
 * 
 * The schema is organized into several main sections:
 * - company: Business information and settings
 * - blogs: Blog posts and project updates
 * - clients: Client logos and information
 * - testimonials: Customer testimonials
 * - gallery: Image galleries
 * 
 * Example usage:
 * DataManager.getCompany() -> Returns company object
 * DataManager.getBlogs() -> Returns array of blog posts
 * DataManager.addBlog(blog) -> Adds new blog post
 */

const CMS_SCHEMA = {
  version: "1.0",
  
  // Company Profile Section
  company: {
    name: "BeSpoke Integrated Sdn Bhd",
    aboutText: "We are a leading IT solutions provider...",
    address: "No 6A, Jalan 4/12B, Seksyen 4 Tambahan, Bandar Baru Bangi, 43650 Selangor",
    phone: "017-2388058",
    email: "hello@bespokesb.com",
    whatsapp: "",
    googleMapsEmbed: "",
    socialMedia: {
      facebook: "https://facebook.com/...",
      linkedin: "https://linkedin.com/company/...",
      twitter: "https://twitter.com/...",
      instagram: "https://instagram.com/..."
    }
  },

  // Blog Posts Section
  blogs: [
    {
      id: "blog-1234567890",
      title: "Blog Post Title",
      slug: "blog-post-title",
      content: "Markdown or HTML content here...",
      coverImage: "https://example.com/image.jpg",
      excerpt: "Short summary of the post",
      date: "2024-05-20T10:30:00Z",
      category: "Updates",
      status: "published", // or "draft"
      author: "Author Name",
      tags: ["tag1", "tag2"],
      featured: false,
      createdAt: "2024-05-20T10:30:00Z",
      updatedAt: "2024-05-20T10:30:00Z"
    }
  ],

  // Clients Section
  clients: [
    {
      id: "client-1234567890",
      name: "Client Company Name",
      logo: "https://example.com/logo.png",
      website: "https://clientwebsite.com",
      description: "Brief description of the client",
      industry: "Technology",
      featured: true
    }
  ],

  // Testimonials Section
  testimonials: [
    {
      id: "testimonial-1234567890",
      clientName: "John Doe",
      position: "CEO",
      company: "Tech Company",
      feedback: "Great service and excellent support...",
      rating: 5, // 1-5 stars
      image: "https://example.com/avatar.jpg",
      featured: true,
      date: "2024-05-20T10:30:00Z"
    }
  ],

  // Gallery Section
  gallery: [
    {
      id: "gallery-1234567890",
      title: "Gallery Item Title",
      image: "https://example.com/image.jpg",
      thumbnail: "https://example.com/thumbnail.jpg",
      category: "Projects", // or "Team", "Office", etc.
      description: "Description of the image",
      order: 1,
      featured: false
    }
  ],

  // Metadata
  lastUpdated: "2024-05-20T10:30:00Z"
};

/**
 * FIELD DESCRIPTIONS
 * 
 * COMPANY OBJECT:
 * - name: Company legal name
 * - aboutText: Long-form company description
 * - address: Physical office address
 * - phone: Main contact phone number
 * - email: Contact email address
 * - whatsapp: WhatsApp number (with country code)
 * - googleMapsEmbed: Embed code for Google Maps
 * - socialMedia: Links to social media profiles
 * 
 * BLOG OBJECT:
 * - id: Unique identifier (auto-generated)
 * - title: Blog post title
 * - slug: URL-friendly slug (auto-generated from title)
 * - content: Full blog content (supports Markdown/HTML)
 * - coverImage: Featured image URL
 * - excerpt: Short summary for listings
 * - date: Publication date
 * - category: Blog category (Updates, News, Tutorial, etc.)
 * - status: "published" or "draft"
 * - author: Author name
 * - tags: Array of tag strings
 * - featured: Boolean to mark as featured
 * - createdAt: Creation timestamp
 * - updatedAt: Last update timestamp
 * 
 * CLIENT OBJECT:
 * - id: Unique identifier (auto-generated)
 * - name: Client company name
 * - logo: Logo image URL
 * - website: Client website URL
 * - description: Brief description
 * - industry: Industry classification
 * - featured: Boolean to show on homepage
 * 
 * TESTIMONIAL OBJECT:
 * - id: Unique identifier (auto-generated)
 * - clientName: Person's full name
 * - position: Job title/position
 * - company: Company name
 * - feedback: Testimonial text
 * - rating: 1-5 star rating
 * - image: Avatar/profile image URL
 * - featured: Boolean to show on homepage
 * - date: Date of testimonial
 * 
 * GALLERY OBJECT:
 * - id: Unique identifier (auto-generated)
 * - title: Image title
 * - image: Full-size image URL
 * - thumbnail: Thumbnail image URL
 * - category: Gallery category
 * - description: Image description
 * - order: Display order (ascending)
 * - featured: Boolean to highlight
 */

/**
 * JSON STORAGE REQUIREMENTS
 * 
 * 1. FILE LOCATION: /data/content.enc
 * 2. ENCRYPTION: AES-256 using password
 * 3. ENCODING: Base64
 * 4. SIZE: Recommend < 10MB for optimal performance
 * 5. STRUCTURE: Single flat JSON object with above schema
 * 
 * NOTE: The entire JSON is encrypted as one file. To update:
 * 1. Decrypt using password
 * 2. Modify data via DataManager
 * 3. Encrypt again
 * 4. Replace /data/content.enc file
 */

// Export schema
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CMS_SCHEMA;
}
