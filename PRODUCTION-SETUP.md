# 🚀 Production JAMstack Setup - Git Gateway Configuration

## 📋 Overview

Website telah dikonfigurasi untuk mode Production JAMstack menggunakan Git Gateway. Semua perubahan di CMS akan langsung tersimpan ke repository GitHub Anda.

## 🔧 Konfigurasi yang Telah Dilakukan

### 1. **Backend Configuration (`admin/config.yml`)**
```yaml
backend:
  name: git-gateway
  branch: master

publish_mode: editorial_workflow
media_folder: "images/uploads"
public_folder: "/images/uploads"
```

### 2. **Netlify Identity Integration**
- ✅ Script widget terpasang di `index.html`
- ✅ Script widget terpasang di `admin/index.html`
- ✅ Auto-redirect ke admin dashboard setelah login
- ✅ Admin link dinamis di navigation

### 3. **Collections Configuration**
Semua collections dikonfigurasi untuk file-based storage:
- ✅ **About Page** → `content/about.json`
- ✅ **Products** → `content/products/*.json`
- ✅ **Site Settings** → `content/settings.json`
- ✅ **Testimonials** → `content/testimonials/*.json`
- ✅ **Gallery** → `content/gallery/*.json`

## 🌐 Access URLs

### **Production Admin Dashboard**
- **Main CMS**: `https://your-domain.netlify.app/admin/`
- **Login**: `https://your-domain.netlify.app/admin/login.html`

### **Authentication Flow**
1. User klik admin link → redirect ke login
2. Login dengan Netlify Identity → redirect ke `/admin/`
3. CMS menggunakan Git Gateway untuk save/publish

## 📝 Workflow Editorial

### **Editorial Workflow Mode**
```yaml
publish_mode: editorial_workflow
```

**Process:**
1. **Draft** → Edit content di CMS
2. **Review** → Submit untuk review
3. **Publish** → Approve dan push ke GitHub

### **Direct Publish (Optional)**
Untuk direct publish, ubah config:
```yaml
publish_mode: simple
```

## 🔐 Netlify Identity Setup

### **Required di Netlify Dashboard:**

1. **Enable Identity**
   - Site settings → Identity → Enable Identity
   - Check "Enable Git Gateway"

2. **Git Gateway Configuration**
   - Connect ke GitHub repository
   - Set branch ke `master`
   - Configure webhook

3. **User Management**
   - Invite admin users
   - Set permissions (Admin/Editor)

## 📁 File Structure

```
content/
├── about.json              # About page data
├── settings.json           # Site settings
├── products/
│   ├── index.json          # Products index
│   ├── mens-shirt-1.json   # Individual products
│   └── womens-dress-1.json
├── testimonials/
│   ├── testimonial-1.json
│   └── testimonial-2.json
└── gallery/
    ├── gallery-1.json
    └── gallery-2.json
```

## 🔄 Git Integration

### **Automatic Commits**
Setiap save di CMS akan:
1. Create commit ke GitHub
2. Trigger Netlify rebuild
3. Update website otomatis

### **Commit Messages**
```
"CMS: Update about page"
"CMS: Add new product - Men's Premium Shirt"
"CMS: Update site settings"
```

## 🎯 Production Features

### **✅ Enabled:**
- Git-based version control
- Editorial workflow
- Media uploads ke `images/uploads/`
- Real-time preview
- Draft/publish system
- User authentication
- Automatic deployments

### **❌ Disabled:**
- Local storage mode
- Development scripts
- Manual data sync
- Local server dependencies

## 🚀 Deployment Process

### **Step 1: Push Changes**
```bash
git add .
git commit -m "Configure production Git Gateway"
git push origin master
```

### **Step 2: Netlify Configuration**
1. Enable Netlify Identity
2. Configure Git Gateway
3. Invite admin users

### **Step 3: Test Workflow**
1. Login ke admin dashboard
2. Edit content
3. Save → Review → Publish
4. Verify website update

## 📊 Content Management

### **Products Management**
- Create: `/admin/#/collections/products/new`
- Edit: `/admin/#/collections/products/entries/mens-shirt-1`
- Delete: Delete entry di CMS

### **About Page**
- Edit: `/admin/#/collections/about/entries/about`
- Auto-save ke `content/about.json`

### **Settings**
- Edit: `/admin/#/collections/site_settings/entries/settings`
- Auto-save ke `content/settings.json`

## 🔍 Troubleshooting

### **Common Issues:**

1. **Git Gateway Not Working**
   - Check Netlify Identity enabled
   - Verify GitHub repository connected
   - Check webhook configuration

2. **Media Upload Failed**
   - Check `images/uploads/` folder permissions
   - Verify media folder configuration

3. **Save Not Working**
   - Check Git Gateway status
   - Verify branch name (`master`)
   - Check user permissions

### **Debug Mode:**
Add ke `admin/config.yml`:
```yaml
local_backend: true  # For development only
```

## 📱 Mobile Support

CMS responsive dan mobile-friendly:
- ✅ Touch-friendly interface
- ✅ Mobile upload support
- ✅ Responsive forms

## 🎉 Production Ready

Website Anda sekarang fully configured untuk:
- ✅ JAMstack architecture
- ✅ Git-based CMS
- ✅ Editorial workflow
- ✅ Automatic deployments
- ✅ Version control
- ✅ Team collaboration

---

**Status**: ✅ Production Ready  
**Last Updated**: 2025-01-28  
**Mode**: JAMstack Git Gateway
