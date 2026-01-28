# Famms Admin Dashboard

A modern, responsive admin dashboard for managing the Famms fashion website.

## Features

### Dashboard Overview
- **Statistics Cards**: View key metrics at a glance
- **Quick Actions**: Fast access to common tasks
- **Responsive Design**: Works on all devices

### Content Management
- **Products**: Add, edit, and delete products
- **Gallery**: Manage gallery images with categories
- **Testimonials**: Handle customer testimonials
- **Settings**: Configure site-wide settings

### Key Features
- Modern Bootstrap 5 design
- Responsive sidebar navigation
- Interactive data tables
- Form validation
- Mobile-friendly interface

## Access

1. Open your browser and navigate to: `http://localhost/famms-1.0.0/admin/`
2. The dashboard will load automatically
3. Use the sidebar navigation to access different sections

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
