# Famms CMS Integration Documentation

## 🎯 Overview

Integrasi CMS lengkap untuk website Famms dengan dukungan penuh untuk manajemen gambar, produk, testimoni, dan galeri. Semua konten sekarang dapat dikelola secara dinamis melalui dashboard admin.

## 📁 Struktur File

```
famms-1.0.0/
├── admin/
│   ├── config.yml              # Konfigurasi CMS
│   ├── index.html              # Dashboard admin
│   └── simple.html             # Simple admin interface
├── content/
│   ├── data.json               # Data utama website
│   ├── about.json              # Data halaman about
│   ├── settings.json           # Pengaturan situs
│   ├── products/               # Koleksi produk
│   ├── testimonials/           # Koleksi testimoni
│   └── gallery/                # Koleksi galeri
├── images/
│   └── uploads/                # Folder upload gambar
└── js/
    └── cms-integration.js      # JavaScript integrasi CMS
```

## 🚀 Cara Mengakses CMS

### 1. Start Development Server
```bash
cd famms-1.0.0
npm start
# atau
node decap-server.js
```

### 2. Akses Dashboard Admin
- Buka browser: `http://localhost:3000/admin/`
- Login dengan Netlify Identity (jika diperlukan)

## 📋 Fitur CMS

### ✅ Produk Management
- **Create**: Tambah produk baru dengan gambar
- **Read**: Tampilkan produk di halaman index dan product
- **Update**: Edit detail produk dan ganti gambar
- **Delete**: Hapus produk (otomatis hilang dari frontend)

### ✅ Testimoni Management
- **Create**: Tambah testimoni pelanggan baru
- **Read**: Tampilkan di halaman testimonial
- **Update**: Edit konten dan gambar testimoni
- **Delete**: Hapus testimoni

### ✅ Galeri Management
- **Create**: Tambah gambar ke galeri
- **Read**: Tampilkan di halaman about
- **Update**: Edit detail gambar dan kategori
- **Delete**: Hapus gambar dari galeri

### ✅ Site Settings
- **Logo**: Upload dan ubah logo website
- **Favicon**: Ubah icon browser
- **Hero Background**: Ubah background hero section
- **Arrival Background**: Ubah background arrival section
- **Contact Info**: Update informasi kontak
- **Social Media**: Kelola link social media

## 🖼️ Media Management

### Upload Gambar
- Semua gambar diupload ke `images/uploads/`
- Preview thumbnail otomatis di dashboard
- Dapat digunakan kembali di berbagai bagian

### Format Gambar yang Didukung
- JPG/JPEG
- PNG
- GIF
- WebP
- SVG

## 📝 Panduan Penggunaan

### Menambah Produk Baru
1. Buka dashboard admin
2. Pilih "Products" dari sidebar
3. Klik tombol "+ Add new product"
4. Isi form:
   - Title: Nama produk
   - Price: Harga produk
   - Image: Upload gambar produk
   - Category: Pilih kategori
   - Description: Deskripsi produk
   - WhatsApp Link: Link WhatsApp order
5. Klik "Save"

### Mengedit Testimoni
1. Pilih "Testimonials" dari sidebar
2. Klik testimoni yang ingin diedit
3. Ubah informasi yang diperlukan
4. Upload gambar baru jika perlu
5. Klik "Save"

### Mengatur Galeri
1. Pilih "Gallery" dari sidebar
2. Klik "+ Add new gallery item"
3. Isi form:
   - Title: Judul gambar
   - Image: Upload gambar
   - Category: Pilih kategori
   - Alt Text: Text alternatif untuk SEO
4. Klik "Save"

### Mengubah Site Settings
1. Pilih "Site Settings" dari sidebar
2. Edit "General Settings"
3. Upload logo, favicon, atau background
4. Update informasi kontak
5. Klik "Save"

## 🔧 Konfigurasi Teknis

### Media Folder Configuration
```yaml
media_folder: "images/uploads"
public_folder: "/images/uploads"
```

### Image Widget Configuration
Semua field gambar menggunakan widget `image` dengan preview:
```yaml
- { label: "Image", name: "image", widget: "image" }
```

### CRUD Operations
- **Create**: `create: true` di config.yml
- **Read**: Otomatis dari JSON ke HTML
- **Update**: Edit di dashboard, otomatis update
- **Delete**: Hapus di dashboard, otomatis hilang

## 🔄 Sinkronisasi JavaScript

### Dynamic Content Loading
```javascript
// Load semua data CMS
await this.loadData();

// Update semua section
this.updateProducts();
this.updateTestimonials();
this.updateGallery();
this.updateAboutPage();
this.updateSiteImages();
```

### Real-time Updates
```javascript
// Refresh data manual
window.refreshCMS();
```

## 🎨 Customization

### Menambah Field Baru
1. Edit `admin/config.yml`
2. Tambah field di koleksi yang diinginkan
3. Update `js/cms-integration.js` untuk render baru

### Menambah Koleksi Baru
1. Tambah koleksi di `config.yml`
2. Buat folder di `content/`
3. Update JavaScript untuk loading data

## 🐛 Troubleshooting

### Gambar Tidak Muncul
1. Pastikan path gambar benar
2. Check folder `images/uploads/` ada
3. Verify file permissions

### CMS Tidak Load
1. Check server running di port 3000
2. Verify `content/` files exist
3. Check browser console for errors

### Data Tidak Update
1. Refresh browser
2. Check `window.refreshCMS()`
3. Verify JSON files are valid

## 📊 Performance Optimization

### Lazy Loading Images
```javascript
// Implementasi lazy loading untuk galeri
const images = document.querySelectorAll('img[data-src]');
```

### Caching Strategy
- Browser cache untuk static assets
- Service worker untuk offline support
- CDN untuk production deployment

## 🚀 Deployment

### Production Setup
1. Build static files
2. Deploy ke hosting static
3. Configure environment variables
4. Test semua CMS functionality

### Environment Variables
```bash
CMS_URL=https://your-domain.com
API_URL=https://api.netlify.com
```

## 📞 Support

### Common Issues
- **Upload failed**: Check file size limits
- **Save error**: Verify JSON syntax
- **404 errors**: Check file paths

### Best Practices
1. Always backup `content/` folder
2. Test changes in development first
3. Use descriptive image names
4. Optimize images before upload
5. Regular CMS updates

## 🎉 Selesai!

Integrasi CMS Famms telah selesai dengan fitur lengkap:
- ✅ Full CRUD untuk semua konten
- ✅ Image management dengan preview
- ✅ Dynamic content rendering
- ✅ Media library
- ✅ Responsive admin dashboard
- ✅ Error handling
- ✅ Performance optimization

Website sekarang fully manageable melalui CMS dashboard!
