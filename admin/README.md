# Famms Admin Dashboard & CMS

A comprehensive admin system for managing the Famms fashion website with both modern dashboard interface and Netlify CMS integration.

## Access Methods

### 1. Admin Dashboard (Modern UI)
**URL**: `http://localhost/famms-1.0.0/admin/` or `https://your-site.netlify.app/admin/`

**Features**:
- Modern Bootstrap 5 interface
- Real-time statistics
- Quick actions
- Mobile responsive
- Netlify Identity authentication

### 2. Netlify CMS (Traditional)
**URL**: `http://localhost/famms-1.0.0/admin/cms.html` or `https://your-site.netlify.app/admin/cms.html`

**Features**:
- Traditional CMS interface
- Full content editing
- Git-based workflow
- Advanced editing capabilities

## Authentication

### Netlify Identity Setup

1. **Enable Netlify Identity** in your Netlify site settings
2. **Configure Git Gateway** for CMS backend
3. **Add admin users** in Netlify Identity dashboard

### Login Process

1. **Visit admin URL**: `/admin/` or `/admin/cms.html`
2. **Click "Login with Netlify"** button
3. **Enter credentials** or use social login
4. **Access granted** to admin interface

### For Local Development

The admin dashboard will work without authentication on localhost for development purposes.

## Features Comparison

### Admin Dashboard (index.html)
- ✅ Modern UI/UX
- ✅ Real-time statistics
- ✅ Quick actions
- ✅ Mobile responsive
- ✅ Easy navigation
- ⚠️ Basic CRUD operations (demo)

### Netlify CMS (cms.html)
- ✅ Full content editing
- ✅ Git-based workflow
- ✅ Media uploads
- ✅ Draft/publish workflow
- ✅ Advanced field types
- ✅ Production ready

## File Structure

```
admin/
├── index.html          # Modern Admin Dashboard
├── cms.html           # Netlify CMS Interface
├── cms-config.yml     # CMS Configuration
└── README.md          # This documentation
```

## Usage Instructions

### For Admin Dashboard
1. **Visit**: `/admin/` 
2. **Login** with Netlify Identity (production) or access directly (localhost)
3. **Navigate** using sidebar menu
4. **Manage content** through intuitive interface

### For Netlify CMS
1. **Visit**: `/admin/cms.html`
2. **Login** with Netlify Identity
3. **Choose** between simplified interface or full CMS
4. **Edit content** using traditional CMS workflow

## Sections

### Dashboard
- Overview statistics
- Quick action buttons
- Site metrics

### Products
- View all products in a table
- Add new products
- Edit existing products
- Delete products

### Gallery
- Grid view of gallery images
- Add new images
- Edit image details
- Delete images

### Testimonials
- List of customer testimonials
- Add new testimonials
- Edit existing testimonials
- Delete testimonials

### Settings
- General site settings
- Social media links
- Store information

## Technical Details

- **Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **JavaScript**: Vanilla JS (no jQuery dependency)
- **CSS**: Custom CSS with CSS variables
- **Responsive**: Mobile-first design

## File Structure

```
admin/
├── index.html          # Main admin dashboard
├── README.md          # This documentation
└── config.yml         # Removed (replaced by new dashboard)
```

## Data Storage

The admin dashboard is designed to work with JSON files in the `content/` directory:

- `content/products/` - Product data
- `content/gallery/` - Gallery images data
- `content/testimonials/` - Testimonial data
- `content/settings.json` - Site settings

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Notes

- This admin dashboard is for local development use
- For production, implement proper authentication
- Consider using HTTPS for secure data transmission
- Validate all user inputs on the server side

## Future Enhancements

- User authentication system
- Real-time notifications
- Advanced search and filtering
- Bulk operations
- Export functionality
- Image optimization
- SEO tools integration
