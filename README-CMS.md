# Famms CMS - Panduan Penggunaan Lengkap

## 🚀 Quick Start

### 1. Menjalankan Server
```bash
# Install dependencies
npm install

# Start development server
npm start
```

### 2. Akses Website
- **Website Utama**: `http://localhost:8081`
- **Admin Panel**: `http://localhost:8081/admin`

---

## 📋 Konfigurasi CMS

### Backend Configuration
- **Backend**: Git Gateway (untuk production)
- **Local Backend**: Enabled (untuk development)
- **Media Folder**: `images/uploads`
- **Public Folder**: `/images/uploads`

### Collections Available

#### 1. Pages
- **Index Page**: Hero section dan arrival section
- Fields: Hero Title, Hero Subtitle, Hero Description, Arrival Title, Arrival Description

#### 2. Products
- **Folder**: `content/products/`
- **Auto-create**: Enabled
- Fields:
  - Title (string)
  - Price (string)
  - Image (image upload)
  - Category (select: Men, Women, Kids, Accessories)
  - Description (text, optional)
  - WhatsApp Link (string)

#### 3. Site Settings
- **File**: `content/settings.json`
- Fields:
  - Store Name
  - Store Description
  - WhatsApp Number
  - Social Media URLs (Instagram, Facebook, Twitter, LinkedIn, Pinterest)
  - Contact Info (Address, Phone, Email)
  - SEO Settings (Keywords, Description)

---

## 🎯 Cara Penggunaan Admin Panel

### Step 1: Login
1. Buka `http://localhost:8081/admin`
2. Klik "Login" atau "Sign Up"
3. Register dengan email dan password
4. Verifikasi email (jika required)
5. Login ke dashboard

### Step 2: Mengedit Pages
1. Di sidebar, klik **"Pages"**
2. Pilih **"Index Page"**
3. Edit fields yang tersedia:
   - **Hero Title**: Judul utama di slider
   - **Hero Subtitle**: Subtitle di slider
   - **Hero Description**: Deskripsi hero section
   - **Arrival Title**: Judul section new arrivals
   - **Arrival Description**: Deskripsi arrival section
4. Klik **"Save"**

### Step 3: Mengelola Products
1. Di sidebar, klik **"Products"**
2. **Menambah Product**:
   - Klik **"New product"**
   - Isi semua fields:
     - **Title**: Nama produk
     - **Price**: Harga (contoh: $75)
     - **Image**: Upload gambar produk
     - **Category**: Pilih kategori
     - **Description**: Deskripsi produk (optional)
     - **WhatsApp Link**: Format: `https://wa.me/628123456789?text=Saya+ingin+beli+[nama_produk]`
   - Klik **"Publish"**

3. **Mengedit Product**:
   - Klik product yang ingin diedit
   - Ubah fields yang diperlukan
   - Klik **"Save"**

4. **Menghapus Product**:
   - Klik product yang ingin dihapus
   - Klik **"Delete"** di bagian bawah
   - Konfirmasi deletion

### Step 4: Site Settings
1. Di sidebar, klik **"Site Settings"**
2. Pilih **"General Settings"**
3. Edit fields:
   - **Store Name**: Nama toko
   - **Store Description**: Deskripsi toko
   - **WhatsApp Number**: Nomor WhatsApp (tanpa +)
   - **Social Media URLs**: Link social media
   - **Contact Info**: Alamat, telepon, email
   - **SEO Settings**: Keywords dan description untuk SEO
4. Klik **"Save"**

---

## 🔄 Data Structure

### File Organization
```
content/
├── data.json              # Main data file (fallback)
├── index.json             # Page settings
├── settings.json          # Site settings
└── products/              # Individual product files
    ├── mens-shirt-1.json
    ├── womens-dress-1.json
    └── ...
```

### JSON Format Examples

#### Product File (`content/products/product-name.json`)
```json
{
  "title": "Men's Shirt",
  "price": "$75",
  "image": "images/p1.png",
  "category": "Men",
  "description": "Comfortable men's shirt",
  "wa_link": "https://wa.me/628123456789?text=Saya+ingin+beli+Men's+Shirt"
}
```

#### Settings File (`content/settings.json`)
```json
{
  "store_name": "Famms",
  "whatsapp_number": "628123456789",
  "instagram_url": "https://instagram.com/famms",
  "address": "Jakarta, Indonesia",
  "phone": "+01 1234567890",
  "email": "info@famms.com"
}
```

---

## 🛠️ Fitur Tambahan

### 1. Auto WhatsApp Integration
- Tombol "Buy Now" otomatis redirect ke WhatsApp
- Format pesan otomatis: "Saya ingin beli [nama produk]"
- Nomor WhatsApp diambil dari site settings

### 2. Dynamic Content Loading
- Website otomatis update saat data berubah
- No page refresh required
- Real-time content synchronization

### 3. SEO Optimization
- Meta tags otomatis dari site settings
- Structured data untuk products
- Friendly URLs untuk products

### 4. Image Management
- Upload images langsung dari CMS
- Automatic image optimization
- Organized dalam folder `images/uploads`

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Server tidak start
```bash
# Kill existing processes
npx kill-port 8081

# Restart server
npm start
```

#### 2. CMS tidak load data
- Check browser console untuk errors
- Verify file permissions di folder `content/`
- Refresh browser dengan Ctrl+F5

#### 3. Images tidak muncul
- Verify folder `images/uploads/` exists
- Check image file permissions
- Clear browser cache

#### 4. Login issues
- Clear browser cache and cookies
- Try incognito mode
- Check Netlify Identity configuration

### Debug Mode
Untuk debugging, buka browser console dan jalankan:
```javascript
// Check CMS data
console.log(window.cmsIntegration.data);

// Refresh CMS data
window.refreshCMS();

// Check loaded products
console.log(window.cmsIntegration.data.products);
```

---

## 📱 Mobile Responsiveness

CMS fully responsive dan bisa diakses dari:
- Desktop browsers
- Tablet devices
- Mobile phones

---

## 🚀 Deployment

### Netlify Deployment
1. Push ke GitHub repository
2. Connect ke Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.`
5. Enable Netlify Identity di Netlify dashboard
6. Configure Git Gateway di CMS

### Manual Deployment
1. Upload semua files ke server
2. Ensure `content/` folder writable
3. Configure proper permissions
4. Test CMS functionality

---

## 📞 Support

Jika mengalami masalah:
1. Check browser console untuk errors
2. Verify server status dengan `npm start`
3. Check file structure di folder `content/`
4. Refresh browser dan clear cache

---

## 🎉 Tips & Tricks

### Product Management
- Gunakan descriptive filenames untuk images
- Compress images sebelum upload
- Use consistent price format ($XX)
- Test WhatsApp links setelah create product

### Content Updates
- Save changes frequently
- Test di multiple browsers
- Check mobile responsiveness
- Monitor console untuk errors

### Performance
- Limit images size < 500KB
- Use WebP format untuk images
- Enable browser caching
- Monitor load times

Happy CMS-ing! 🎊
