# 🚀 Admin Panel Setup Instructions

## 🔐 Langkah Krusial: Setup Netlify Identity & Git Gateway

### 📋 Step 1: Aktifkan Netlify Identity

1. **Buka Dashboard Netlify**: https://app.netlify.com
2. **Pilih site** Anda (`promo200.netlify.app`)
3. **Klik "Site settings"**
4. **Pilih menu "Identity"** di samping kiri
5. **Enable Identity**: Toggle **ON**
6. **Registration settings**: 
   - **Allow new users**: **OFF** (Invite Only)
   - **Registration preferences**: **Invite only**
7. **Klik "Save settings"**

### 📋 Step 2: Undang Admin Users

1. **Di halaman Identity**, klik **"Invite users"**
2. **Masukkan email** admin (misal: `admin@example.com`)
3. **Klik "Send invite"**
4. **User akan menerima email** undangan
5. **User klik link** di email untuk membuat password

### 📋 Step 3: Aktifkan Git Gateway

1. **Di halaman Identity yang sama**
2. **Scroll ke bawah** ke bagian **"Services"**
3. **Klik "Enable Git Gateway"**
4. **Login ke GitHub** (berikan izin akses)
5. **Git Gateway akan aktif** untuk CMS save functionality

### 📋 Step 4: Test Login

1. **Buka website**: https://promo200.netlify.app
2. **Klik "🔐 Admin"** di navigation
3. **Masukkan email dan password** yang sudah dibuat
4. **Login berhasil** → redirect ke admin panel

---

## 🎯 Alur Kerja Complete Setup

### 🔐 Security Features:
- **Invite Only**: Hanya user yang diundang bisa login
- **Email + Password**: Authentication tradisional yang aman
- **Git Gateway**: Auto-commit ke GitHub saat save
- **Session Management**: Netlify Identity handle session

### 🚀 Admin Features:
- **Content Management**: Edit semua konten website
- **Product Management**: Tambah/edit produk
- **Gallery Management**: Upload dan manage gambar
- **Real-time Updates**: Auto-deploy setiap save
- **Version Control**: Semua perubahan tersimpan di GitHub

---

## 🛠️ Troubleshooting

### ❌ Login Gagal:
1. **Check email invitation** - apakah sudah diterima?
2. **Verify password** - apakah sudah dibuat?
3. **Check Git Gateway** - apakah sudah aktif?
4. **Clear browser cache** - coba incognito mode

### ❌ Save Tidak Berfungsi:
1. **Enable Git Gateway** - wajib untuk save functionality
2. **Check GitHub permissions** - pastikan repo access OK
3. **Verify Netlify Identity** - pastikan user terdaftar

### ❌ Redirect Error:
1. **Check site URL** - pastikan benar
2. **Verify Netlify settings** - Identity aktif
3. **Check browser console** - lihat error messages

---

## 🎉 Hasil Akhir

Setelah setup selesai:
- ✅ **Admin panel** hanya bisa diakses user yang diundang
- ✅ **Save changes** otomatis commit ke GitHub
- ✅ **Website update** otomatis setiap save
- ✅ **Secure authentication** dengan email + password
- ✅ **Professional admin interface** untuk content management

**Admin panel siap digunakan!** 🚀
