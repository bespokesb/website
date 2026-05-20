# BeSpoke CMS - Admin Panel Documentation

## 📋 Overview

BeSpoke CMS is a **static, client-side content management system** designed for GitHub Pages with:
- ✅ No backend server required
- ✅ No database needed
- ✅ AES-256 encryption
- ✅ Password-protected admin panel
- ✅ Fully responsive design
- ✅ Encrypted content storage

---

## 🚀 Quick Start

### 1. Setup Password & Encrypt Data

Visit the setup wizard to create your encrypted content file:

```
https://yoursite.com/admin/setup.html
```

**Steps:**
1. Enter a secure admin password
2. Confirm the password
3. Choose data source (sample or empty)
4. Click "Encrypt & Generate"
5. Copy the encrypted output
6. Create file `/data/content.enc` and paste the content
7. Commit and push to GitHub

### 2. Login to Admin Panel

Navigate to the admin panel:

```
https://yoursite.com/admin/index.html
```

**Login:**
- Use the password you created in the setup wizard
- Session expires after 1 hour of inactivity
- Session automatically refreshes on user activity

---

## 📁 File Structure

```
/admin/
  ├─ index.html              # Login page
  ├─ dashboard.html          # Main admin panel
  ├─ setup.html              # Setup wizard
  ├─ js/
  │  ├─ login.js             # Login logic
  │  └─ dashboard.js         # Dashboard logic

/assets/
  ├─ css/
  │  ├─ base.css             # Global styles
  │  ├─ admin.css            # Admin UI
  │  └─ public.css           # Public pages
  └─ js/
     ├─ encryption.js        # AES encryption/decryption
     ├─ data-manager.js      # Content CRUD operations
     ├─ utils.js             # Helper utilities
     ├─ admin-auth.js        # Session management
     └─ cms-schema.js        # Schema documentation

/data/
  ├─ content.enc             # Encrypted content file
  └─ sample-content.json     # Sample data template
```

---

## 🔐 Security Model

### Authentication
- **Password-only login** (no username)
- Session stored in `sessionStorage` (not persistent)
- Password never stored on disk, kept in memory
- Session timeout: 1 hour
- Auto-logout on expiry

### Encryption
- **Algorithm**: AES-256 with CryptoJS
- **Key derivation**: PBKDF2 with 1000 iterations
- **Storage**: `/data/content.enc` (encrypted JSON)
- **Client-side only**: All encryption/decryption happens in browser

### Best Practices
✅ Use a strong password (16+ chars with mixed case, numbers, symbols)
✅ Keep backup of encrypted file
✅ Don't share your password
✅ Enable HTTPS on your hosting
✅ Review audit trails if available

---

## 📊 Dashboard Features

### Overview
- Quick stats dashboard
- Recent blog posts
- Recent clients
- Quick links to content sections

### Company Information
Edit:
- Company name
- About text
- Office address
- Phone & email
- WhatsApp number
- Social media links

### Blog Posts
**Fields:**
- Title (required)
- Content (Markdown/HTML supported)
- Cover image URL
- Publication date
- Category
- Status (draft/published)

**Actions:**
- Create new blog post
- Edit existing posts
- Delete posts
- Auto-generate URL slug

### Clients
**Fields:**
- Company name (required)
- Logo URL
- Website URL
- Industry
- Description

**Actions:**
- Add new client
- Edit client info
- Delete clients
- Mark as featured

### Testimonials
**Fields:**
- Client name (required)
- Position (required)
- Company (required)
- Feedback (required)
- Star rating (1-5)

**Actions:**
- Add testimonial
- Edit existing
- Delete testimonials
- Star ratings

### Gallery
**Fields:**
- Image title (required)
- Image URL (required)
- Category
- Description

**Actions:**
- Add image
- Edit details
- Delete images
- Organize by category

---

## 💾 Data Management

### Auto-Save
- Changes are automatically drafted to `localStorage`
- Prevents data loss during session
- Can resume editing if browser crashes

### Export
- Click "Export" button to download JSON
- Useful for backups
- Can be re-encrypted with new password

### Manual Backup
1. Login to admin panel
2. Click "Export" button
3. Save the JSON file safely
4. To restore: use setup wizard and upload via paste

---

## 🛠️ Content Storage Format

### JSON Schema

```json
{
  "version": "1.0",
  "company": {
    "name": "BeSpoke Integrated",
    "aboutText": "...",
    "address": "...",
    "phone": "...",
    "email": "...",
    "whatsapp": "...",
    "socialMedia": {
      "facebook": "...",
      "instagram": "..."
    }
  },
  "blogs": [...],
  "clients": [...],
  "testimonials": [...],
  "gallery": [...],
  "lastUpdated": "2024-05-20T10:30:00Z"
}
```

---

## 🔄 Content Lifecycle

### Blog Posts
1. **Create** → Draft status
2. **Edit** → Update content anytime
3. **Publish** → Change status to "published"
4. **Archive** → Delete when no longer needed

### Password Recovery

⚠️ **IMPORTANT**: There is **NO password recovery** option.

If you forget your password:
1. Delete `/data/content.enc`
2. Visit `/admin/setup.html`
3. Create new password
4. Re-import content if you have backup

---

## 🌐 Deployment

### GitHub Pages
1. Push changes to repository
2. Encrypted file (`/data/content.enc`) is committed
3. No build process needed
4. Automatic deployment on push

### Custom Domain
- Use HTTPS (recommended)
- All processing happens client-side
- No backend configuration needed

### Static Hosting (Netlify, Vercel, etc.)
1. Connect your GitHub repository
2. No build command needed
3. Deploy as static site
4. CMS will work as-is

---

## ⚠️ Limitations & Considerations

### File Size
- Recommend keeping encrypted file < 10MB
- Optimal: < 1MB for fast loading
- Large images should use CDN URLs, not embedded

### Browser Storage
- `localStorage` has 5-10MB limit (browser dependent)
- `sessionStorage` used for secure session
- Large content sets may have limits

### No Real-Time Sync
- Single admin user at a time
- Changes not synced across devices
- Save before closing browser

### Content Editing
- Content edited directly in forms
- No WYSIWYG editor (supports Markdown/HTML)
- Links and images use external URLs

---

## 🔧 Troubleshooting

### "Failed to load content: 404"
**Solution**: Create `/data/content.enc` using setup wizard

### "Decryption failed - invalid password"
**Solution**: Check password is correct (case-sensitive)

### "Session expired"
**Solution**: Reload page and login again

### "Data not saving"
**Solution**: 
- Check `localStorage` isn't disabled
- Verify write permissions
- Try clearing browser cache

---

## 📱 Mobile Support

✅ **Fully responsive**
- Works on mobile (iOS/Android)
- Touch-friendly interface
- Optimized forms for small screens
- ⚠️ Editing large content on mobile is limited

---

## 🔒 Encryption Details

### Key Derivation
```javascript
// PBKDF2 with 1000 iterations
const key = CryptoJS.PBKDF2(password, salt, {
  keySize: 256 / 32,
  iterations: 1000
});
```

### Encryption Algorithm
```javascript
const encrypted = CryptoJS.AES.encrypt(jsonString, key);
```

### Testing Encryption
Use the setup wizard at `/admin/setup.html` to test encryption/decryption

---

## 📖 API Reference

### DataManager
```javascript
// Load encrypted data
await DataManager.load(password);

// Manage content
DataManager.getCompany();
DataManager.updateCompany(updates);
DataManager.getBlogs();
DataManager.addBlog(blogData);
DataManager.updateBlog(id, updates);
DataManager.deleteBlog(id);

// Export
DataManager.exportAsJSON();
```

### AdminAuth
```javascript
// Login
AdminAuth.login(password);

// Check authentication
AdminAuth.isAuthenticated();

// Logout
AdminAuth.logout();

// Session info
AdminAuth.getSessionTimeRemaining();
AdminAuth.getPassword();
```

### Encryption
```javascript
// Encrypt (async)
const encrypted = await Encryption.encrypt(data, password);

// Decrypt (async)
const decrypted = await Encryption.decrypt(encrypted, password);
```

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review browser console for error messages
3. Verify all files are present in correct locations
4. Ensure HTTPS is used (if on custom domain)

---

## 📄 License

This CMS is part of BeSpoke Integrated project. See LICENSE file for details.

---

**Last Updated**: May 20, 2024
**CMS Version**: 1.0
