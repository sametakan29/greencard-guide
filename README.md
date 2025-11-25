# GreenCard Rehberi — İnteraktif Başvuru Kılavuzu

Türkçe, statik HTML tabanlı, **Green Card (DV Lottery)** başvurusu için tamamlayıcı bilgi, rehber ve araçlar sunan responsive web sitesi.

## Özellikler

- **📰 Güncel Haberler:** DV Lottery duyuruları ve önemli tarihler (`data/news.json` ile yönetilir)
- **📖 Başvuru Rehberi:** Adım adım başvuru süreci ve ipuçları
- **📋 Belgeler:** Duruma göre (medeni durum, çocuk, eğitim) gerekli belgeler filtreli liste
- **🖼️ Fotoğraf Kontrolü:** Tarayıcıda (sunucuya gönderilmeden) boyut, format, arka plan ve yüz pozisyonu kontrolü
- **❓ SSS:** Sık sorulan sorular ve cevaplar
- **💬 İletişim:** Form (client-side, sunucuya veri gönderilmez) + sosyal medya bağlantıları
- **Responsive Design:** Bootstrap 5 ile mobile uyumlu
- **Template System:** Navbar ve footer dinamik olarak tüm sayfalara yüklenir (`js/components.js`)

## Dosya Yapısı

```
greencardrehberi/
├── index.html              # Ana sayfa (haberler)
├── guide.html              # Başvuru rehberi
├── documents.html          # Belgeler + filtre
├── photo.html              # Fotoğraf kontrolü aracı
├── faq.html                # SSS/FAQ
├── contact.html            # İletişim + form
├── css/
│   └── style.css           # Özel stiller (navbar, footer, flex layout)
├── js/
│   ├── components.js       # Navbar/footer dinamik yükleyici
│   ├── site.js             # Haberler, belgeler yönetimi
│   └── photo-checker.js    # Fotoğraf doğrulama
├── templates/
│   ├── navbar.html         # Navbar template (tüm sayfalar tarafından yüklenir)
│   └── footer.html         # Footer template
├── data/
│   └── news.json           # Haberler verisi (manuel güncellenebilir)
└── README.md               # Bu dosya
```

## Yerel Çalıştırma

### 1. Python HTTP Sunucusu (Önerilen)

```powershell
cd "c:\Users\akans\OneDrive\Masaüstü\ZevkiProjeler\greencardrehberi"
python -m http.server 8000
```

Tarayıcıda açın: **http://localhost:8000**

### 2. Direkt Tarayıcıda

`index.html` dosyasını tarayıcıda açın (bazı features sınırlı olabilir).

## Kullanım Rehberi

### 📰 Haberleri Güncelleme

`data/news.json` dosyasını açın ve yeni haberler ekleyin:

```json
[
  {
    "title": "DV Lottery 2026 - Başvurular Başladı",
    "date": "2025-11-01",
    "body": "Resmi başvuru linki travel.state.gov adresinde açılmıştır."
  },
  ...
]
```

### 📋 Belgeler Listesini Güncelleme

`js/site.js` içindeki `buildDocsList()` fonksiyonunu düzenleyin — duruma göre belgeler otomatik listelenecek.

### 🖼️ Fotoğraf Kontrolü

1. `photo.html` sayfasına gidin
2. JPG/PNG fotoğraf seçin
3. Kontroller otomatik çalışacak:
   - Dosya formatı
   - Boyut/kare kontrolü (600x600 px)
   - Dosya boyutu uyarısı
   - Yüz pozisyonu tahmini (arka plan parlaklığı analizi)

Tüm işlem **tarayıcıda** gerçekleşir; sunucuya hiç gönderilmez.

### 💬 İletişim Formu

`contact.html` sayfasında form doldurursanız, doğrudan e-posta istemciniz açılır. Veri saklanmaz.

## Teknik Detaylar

### Navbar & Footer Yönetimi

- `templates/navbar.html` ve `footer.html` merkezi şablonlar
- `js/components.js` sayfası yüklenince `fetch()` ile bu dosyaları yükler
- Güncelleme gerekirse sadece şablonları düzenleyin — tüm sayfalar otomatik güncellenir

### Layout (Fixed Navbar + Sticky Footer)

- Navbar: `fixed-top` (sabit üstte)
- Body: `d-flex-min-vh` (flex layout, min-height 100vh)
- Main: `flex-fill` (kalan alan doldurur)
- Footer: `footer-sticky` (aşağıda kalır)

### Fotoğraf Kontrolü Algoritması

1. **Format:** JPG/PNG kontrolü
2. **Boyut:** Minimum 600x600 px
3. **Kare:** Genişlik = yükseklik kontrolü
4. **Heuristic:** Merkez bölge vs. köşeler parlaklık farkı (yüz merkezde olup olmadığı tahmini)

**Not:** Bu hafif bir tahmini kontroldür. Resmi DV Lottery daha katı kuralları vardır.

## Önemli Notlar

⚠️ **Bu site bir yardımcı araçtır.**
- Resmi ve güncel bilgi **travel.state.gov** adresinde
- Fotoğraf kontrolü heuristic (tahmini) — yüzde 100 güvenilir değildir
- Belgeler listesi örnek niteliğindedir — ülkeniz ve durumunuz için resmi kaynaklardan kontrol edin
- Başvuru öncesinde mutlaka resmi formu ve gereksinimleri okuyun

## Gizlilik & Veri

✅ **Bu site hiçbir veri toplamaz ve saklamaz:**
- Fotoğraflar cihazınızda işlenir, sunucuya **gönderilmez**
- İletişim formu e-posta istemcinizi açar, veritabanı yoktur
- Haberler statik JSON dosyasından yüklenir
- Google Analytics veya reklam kodu yok

## Geliştirme & Genişletme

### Yeni Sayfa Ekleme

1. Yeni HTML dosyası oluşturun (ör. `new-page.html`)
2. `<div id="navbar-container"></div>` ekleyin
3. `<div id="footer-container"></div>` ekleyin
4. Sonunda şu scriptleri ekleyin:
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/components.js"></script>
```
5. `templates/navbar.html` içindeki menüye link ekleyin

### Backend Entegrasyonu

Ileride dinamik özellikler eklemek isterseniz:
- **PHP:** HTML template'leri `include()` ile yükleyin
- **Node.js/Express:** Server-side rendering
- **Statik Site Generatörü:** Hugo, Jekyll vb.

## Lisans & Sorumluluk

Bu site eğitim amaçlıdır. Green Card başvurusu hakkında resmi ve en güncel bilgiler için **travel.state.gov** adresini ziyaret edin.

---

## 🚀 Hosting ve SEO

### Hosting'e Yükleme

1. Tüm dosyaları (klasör yapısını koruyarak) hosting'inizin root klasörüne yükleyin
2. Genellikle `public_html/` veya `www/` klasörüne yüklenir
3. `sitemap.xml` dosyasındaki `yoursite.com` kısımlarını kendi domain'inizle değiştirin
4. `robots.txt` dosyasındaki domain'i güncelleyin

### Google'a Kaydetme

1. **Google Search Console:** https://search.google.com/search-console
   - Site ekle → Domain doğrula
   - Sitemap gönder: `https://yoursite.com/sitemap.xml`

2. **Google Analytics** (opsiyonel):
   - Hesap oluştur: https://analytics.google.com
   - Tracking code'u her sayfanın `<head>` bölümüne ekle

3. **Bing Webmaster Tools:** https://www.bing.com/webmasters
   - Site ekle ve sitemap gönder

### SEO İpuçları

✅ **Yapıldı:**
- Meta description ve keywords tüm sayfalarda
- Semantic HTML (h1, h2, header, main, footer)
- robots.txt ve sitemap.xml
- Canonical URL'ler
- Open Graph ve Twitter Card meta tagları

📝 **Yapılacaklar:**
- İçeriğe düzenli yeni haberler ekle (`data/news.json`)
- Blog yazıları/makaleler ekle (daha fazla içerik = daha iyi SEO)
- Backlink'ler oluştur (forumlar, sosyal medya)
- Site hızını optimize et (resim sıkıştırma, CDN)
- SSL sertifikası ekle (HTTPS) - hosting sağlayıcıdan ücretsiz Let's Encrypt

### Sosyal Medya Paylaşımı

Site canlıya alındıktan sonra:
- Facebook/Twitter/LinkedIn'de paylaş
- İlgili forumlarda (ör. Ekşi Sözlük, Reddit r/greencard) linki paylaş
- Green Card başvuru gruplarında yardımcı kaynak olarak öner

---

**Son Güncelleme:** 24 Kasım 2025

