# 🚀 Netlify Setup Instructions for Famms CMS

## 📋 Prerequisites

1. **Git Repository**: Website harus terhubung ke Git repository (GitHub, GitLab, atau Bitbucket)
2. **Netlify Account**: Akun Netlify yang aktif
3. **Netlify Site**: Website sudah di-deploy ke Netlify

## 🔧 Step-by-Step Setup

### 1. **Enable Netlify Identity**

1. Buka Netlify Dashboard
2. Pilih site Anda
3. Go to **Site settings > Identity**
4. Click **Enable Identity**
5. Check **"Enable Git Gateway"**
6. Save settings

### 2. **Configure Identity Settings**

Di **Site settings > Identity**:

1. **Registration preferences**: 
   - Pilih **"Invite only"** untuk keamanan
   - Atau **"Open"** jika ingin publik

2. **External providers**:
   - Enable **GitHub**, **Google**, atau **Email** sesuai kebutuhan

3. **Appearance**:
   - Customize branding jika perlu

### 3. **Invite Admin Users**

1. Di **Identity** section, click **"Invite users"**
2. Masukkan email admin yang akan diberi akses
3. Pilih role **"Admin"**
4. Send invitation

### 4. **Verify Configuration**

Setelah setup, pastikan:

- ✅ Netlify Identity enabled
- ✅ Git Gateway enabled
- ✅ Admin users invited
- ✅ Site terhubung ke Git repository

## 🌐 Access URLs

Setelah setup selesai:

- **Admin Login**: `https://your-domain.netlify.app/admin/login.html`
- **Admin Panel**: `https://your-domain.netlify.app/admin/simple.html`
- **CMS Dashboard**: `https://your-domain.netlify.app/admin/`

## 🔐 Login Process

1. Buka admin login page
2. Click **"Login with Netlify Identity"**
3. Pilih login method (Email/Password, GitHub, Google)
4. Jika menggunakan email, check inbox untuk invitation link
5. Set password dan login

## 📝 Content Management

### **Simple Admin Panel** (`/admin/simple.html`)
- Edit text content langsung
- Upload gambar
- Real-time preview

### **Decap CMS** (`/admin/`)
- Full CRUD operations
- Git-based workflow
- Editorial workflow

## 🐛 Troubleshooting

### **Login Issues**
- Pastikan user sudah di-invite
- Check email spam folder
- Verify Identity enabled di Netlify

### **CMS Not Loading**
- Check Git Gateway enabled
- Verify `netlify.toml` configuration
- Check browser console untuk errors

### **Permission Errors**
- Ensure user memiliki role Admin
- Check Git repository permissions
- Verify Netlify build settings

## 📁 File Configuration

### **netlify.toml**
```toml
[build]
  publish = "."
  command = "echo 'Build completed'"

[[redirects]]
  from = "/admin/*"
  to = "/admin/:splat"
  status = 200
```

### **admin/config.yml**
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "images/uploads"
public_folder: "/images/uploads"
```

## 🎯 Best Practices

1. **Security**: Gunakan "Invite only" untuk production
2. **Backup**: Regular backup Git repository
3. **Testing**: Test semua CMS features setiap deployment
4. **Monitoring**: Monitor Netlify build logs

## 🚀 Deployment

Setelah setup selesai:

1. Push changes ke Git repository
2. Netlify akan otomatis rebuild
3. Test admin access
4. Verify CMS functionality

## 📞 Support

Jika mengalami masalah:

1. Check Netlify build logs
2. Verify Identity configuration
3. Test dengan user berbeda
4. Contact Netlify support jika perlu

---

**Status**: ✅ Ready for Production  
**Last Updated**: 2025-01-28  
**Version**: 1.0.0
