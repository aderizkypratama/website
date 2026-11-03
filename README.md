# Ade Rizky — website

Situs statis berbasis [Astro](https://astro.build): artikel ditulis dalam Markdown, dua bahasa (Inggris utama, Indonesia pilihan), tema terang/gelap, dan pengaturan tampilan yang bisa diubah pengunjung (tema, huruf, ukuran teks, warna aksen).

> **Status:** kode ini ditulis tanpa bisa dijalankan (lingkungan penyusunnya tidak punya akses ke npm). Build pertama dilakukan di komputermu. Kalau ada error, salin pesan errornya dan kita perbaiki bersama.

## 1. Menjalankan di komputer

Butuh Node.js 22 atau lebih baru dan Git.

```bash
git clone https://github.com/aderizkypratama/website.git
cd website
# salin seluruh isi folder starter ini ke dalam folder website (termasuk file tersembunyi: .gitignore, .nvmrc, .github)
npm install        # membuat package-lock.json, ikut di-commit
npm run dev        # buka http://localhost:4321
npm run build      # hasil build ada di folder dist/
```

Cek keamanan hasil build (seharusnya tidak ada script/style inline, karena CSP ketat):

```bash
grep -rn "<style" dist --include=*.html
grep -rn "<script" dist --include=*.html
```

Setiap `<script>` yang muncul harus punya atribut `src=`. Kalau ada yang inline, beri tahu saya.

## 2. Hal pertama yang diganti

- `astro.config.mjs` → `SITE_URL` (domain aslimu) dan `public/robots.txt` → baris `Sitemap:`.
- `src/i18n/ui.ts` → teks halaman About (tandai `TODO`) dan teks perkenalan beranda.
- Hapus atau ganti dua artikel contoh di `src/content/posts/`.

## 3. Menulis artikel

Buat file Markdown di `src/content/posts/en/nama-artikel.md` (atau `id/` untuk Bahasa Indonesia):

```md
---
title: 'Judul artikel'
description: 'Ringkasan satu kalimat untuk hasil pencarian.'
pubDate: 2026-11-10
lang: en
translationKey: nama-unik   # sama di versi EN dan ID, supaya tombol terjemahan muncul
tags: ['cybersecurity', 'history']
draft: false                # true = tidak ditampilkan
---

Isi artikel...
```

## 4. Deploy gratis di Cloudflare Pages

1. Push ke GitHub (`main`).
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → pilih repo `website`.
3. Build command: `npm run build` · Output directory: `dist` · Environment variable: `NODE_VERSION` = `22`.
4. Tambahkan custom domain di tab Custom domains, lalu aktifkan HTTPS.

## 5. Keamanan

- Aktifkan 2FA di GitHub, Cloudflare, dan registrar domain. Simpan recovery code secara offline.
- `public/_headers` berisi CSP ketat (`script-src 'self'`, `style-src 'self'`). Kalau nanti menambah embed newsletter atau analitik, tambahkan domainnya ke CSP secara sengaja, jangan melonggarkan semuanya.
- Dependabot (`.github/dependabot.yml`) membuka pull request mingguan untuk update dependensi. Baca dan merge secara rutin.
- Jangan pernah commit kunci/token/`.env` ke repo.
- Highlight sintaks kode sengaja dimatikan karena memakai style inline. Kalau ingin menyalakannya, pertimbangkan dulu dampaknya ke CSP.
