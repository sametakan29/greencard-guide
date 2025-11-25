# Green Card Rehberi

Amerika **DV Lottery (Green Card) Çekilişi** için hazırlanmış Türkçe bilgilendirme ve araç web sitesi. Tamamen statik HTML/CSS/JavaScript ile geliştirilmiş, hosting gerektirmeden çalıştırılabilen responsive bir projedir.

## 🎯 Proje Amacı

Green Card başvurusu yapacak Türkiye'deki kullanıcılara:
- Başvuru sürecini adım adım anlatan rehber
- Gerekli belgeleri listeleyen ve filtreleyen sistem
- Fotoğraf gereksinimlerini kontrol eden araç
- Güncel haberleri takip edebilecekleri dinamik sistem
- Sık sorulan soruların cevapları
sunarak başvuru sürecini kolaylaştırmayı amaçlar.

## ✨ Özellikler

### Ana Sayfa (index.html)
- **Geri Sayım Sayacı:** DV-2027 başvuru tarihi için canlı countdown
- **İstatistikler:** Yıllık kota, başvuru sayıları, kazanma şansı
- **Şans Hesaplayıcı:** Yaş, eğitim ve deneme sayısına göre tahmini hesaplama (eğlence amaçlı)
- **Başarı Hikayeleri:** Motivasyon için örnek hikayeler
- **Güncel Haberler:** `data/news.json` dosyasından dinamik yüklenen haberler

### Rehber Sayfası (guide.html)
- Başvuru öncesi hazırlık adımları
- Online başvuru süreci detayları
- Başvuru sonrası yapılacaklar
- Önemli tarihler ve süreçler

### Belgeler Sayfası (documents.html)
- Duruma göre (medeni durum, çocuk sayısı, eğitim) filtrelenebilir belge listesi
- Her belge için detaylı açıklama sayfası (belgeler-detay.html)
- Pasaport, diploma, evlilik belgesi vb. için gereksinimler

### SSS Sayfası (faq.html)
- Accordion yapısında organize edilmiş sorular
- Başvuru, fotoğraf, kazanma, vizite dair detaylı cevaplar

### İletişim Sayfası (contact.html)
- E-posta ile iletişim formu (client-side, mailto: ile çalışır)
- Sosyal medya linkleri
- İletişim bilgileri

### Teknik Özellikler
- **Responsive Design:** Bootstrap 5 ile mobil uyumlu
- **Component System:** Navbar ve footer merkezi şablonlardan (`templates/`) dinamik yüklenir
- **SEO Optimizasyonu:** Meta tags, sitemap.xml, robots.txt, Open Graph
- **Gizlilik Odaklı:** Hiçbir veri toplanmaz, tüm işlemler client-side
- **Kolay Güncelleme:** JSON tabanlı haber sistemi, HTML template'ler

## 📁 Dosya Yapısı

```
greencardrehberi/
├── index.html                # Ana sayfa (countdown, istatistikler, haberler)
├── guide.html                # Başvuru rehberi
├── documents.html            # Belgeler sayfası (filtreleme sistemi)
├── belgeler-detay.html       # Belge detay sayfası
├── faq.html                  # SSS/FAQ
├── contact.html              # İletişim sayfası
├── sitemap.xml               # SEO sitemap
├── robots.txt                # Arama motoru kuralları
├── favicon.png               # Site ikonu
│
├── css/
│   ├── style.css             # Ana stil dosyası
│   └── style.css.bak         # Yedek stil dosyası
│
├── js/
│   ├── components.js         # Navbar/footer yükleyici
│   ├── site.js               # Haberler ve belge yönetimi
│   └── components.js.backup  # Yedek component dosyası
│
├── templates/
│   ├── navbar.html           # Merkezi navbar şablonu
│   └── footer.html           # Merkezi footer şablonu
│
├── data/
│   └── news.json             # Haberler verisi
│
└── favico/                   # Favicon dosyaları
```

## 🚀 Kurulum ve Çalıştırma

### Yöntem 1: Python HTTP Server (Önerilen)

```powershell
cd "proje_klasörü_yolu"
python -m http.server 8000
```

Tarayıcıda açın: `http://localhost:8000`

### Yöntem 2: Live Server (VS Code)

VS Code'da Live Server eklentisini kurun ve `index.html` üzerinde sağ tık → "Open with Live Server"

### Yöntem 3: Direkt Tarayıcı

`index.html` dosyasına çift tıklayın (bazı özellikler CORS nedeniyle çalışmayabilir)

## 🔧 İçerik Güncelleme

### Haberler
`data/news.json` dosyasını düzenleyin:
```json
[
  {
    "title": "Haber başlığı",
    "date": "2025-11-25",
    "body": "Haber içeriği buraya..."
  }
]
```

### Navbar/Footer
`templates/navbar.html` veya `templates/footer.html` dosyalarını düzenleyin. Tüm sayfalar otomatik güncellenecektir.

### Belgeler
`js/site.js` içindeki `buildDocsList()` fonksiyonunu düzenleyerek belge listesini özelleştirin.

### Geri Sayım Tarihi
`index.html` içindeki `targetDate` değerini değiştirin:
```javascript
const targetDate = new Date('2025-10-04T12:00:00').getTime();
```

## 🛠️ Teknik Detaylar

### Component System
- `js/components.js` ile navbar ve footer dinamik yüklenir
- `fetch()` API kullanılarak `templates/` klasöründen HTML içerik çekilir
- Tek bir yerden tüm sayfaların header/footer'ı yönetilir

### Layout Mimarisi
- **Fixed Navbar:** Sayfada kaydırırken üstte sabit kalır
- **Flexbox Layout:** Body `min-height: 100vh` ile tam sayfa kaplar
- **Sticky Footer:** İçerik az olsa da footer altta kalır
- **Responsive Grid:** Bootstrap 5 grid sistemi kullanılır

### Dinamik Özellikler
- **Countdown Timer:** JavaScript setInterval ile gerçek zamanlı güncellenir
- **Şans Hesaplayıcı:** Client-side formül ile anında sonuç verir
- **Haber Sistemi:** JSON dosyasından dinamik kart oluşturulur
- **Belge Filtreleme:** Checkbox'lara göre listeleme yapılır

### SEO ve Performans
- Semantic HTML5 kullanımı
- Meta tags (description, keywords, OG tags)
- Sitemap.xml ve robots.txt
- CDN üzerinden Bootstrap ve JS kütüphaneleri
- Minimal JavaScript, hızlı yükleme

## ⚠️ Önemli Notlar

Bu site **bilgilendirme ve yardımcı araç** amaçlıdır:
- Resmi bilgiler için **travel.state.gov** adresini ziyaret edin
- Başvuru ve süreç hakkında kesin bilgi için ABD Dışişleri Bakanlığı'nın resmi kaynaklarını kullanın
- Şans hesaplayıcı ve tahminler tamamen eğlence amaçlıdır
- Site hiçbir başvuruyu işleme almaz veya resmi bir platform değildir

## 🔒 Gizlilik

✅ **Tamamen offline çalışır:**
- Hiçbir kullanıcı verisi toplanmaz
- Hiçbir tracking/analytics servisi yok
- Tüm hesaplamalar tarayıcıda yapılır
- Form verileri sunucuya gönderilmez (mailto: kullanılır)
- Cookie kullanılmaz

## 🌐 Deployment (Yayınlama)

### Web Hosting'e Yükleme

1. FTP/cPanel ile tüm dosyaları hosting'e yükleyin
2. `public_html/` veya `www/` klasörüne upload edin
3. `sitemap.xml` içindeki domain'i güncelleyin
4. `robots.txt` dosyasını kontrol edin

### Ücretsiz Hosting Seçenekleri
- **GitHub Pages:** Repo oluşturup Settings → Pages'den aktif et
- **Netlify:** Drag & drop ile anında yayınla
- **Vercel:** Git ile bağlanıp otomatik deploy
- **InfinityFree:** Ücretsiz PHP hosting (cPanel ile)

### SEO Ayarları

**Google Search Console:**
1. https://search.google.com/search-console adresine git
2. Site ekle ve doğrula
3. `sitemap.xml` dosyasını gönder

**Mevcut SEO Özellikleri:**
- ✅ Meta description, keywords
- ✅ Open Graph ve Twitter Card tags
- ✅ Semantic HTML5 
- ✅ Sitemap.xml ve robots.txt
- ✅ Responsive design

## 🔄 Geliştirme Planı

### Yapılabilecek İyileştirmeler
- [ ] Blog/Makale bölümü ekle
- [ ] Daha fazla başarı hikayesi
- [ ] Video anlatım içerikleri
- [ ] Çoklu dil desteği (İngilizce)
- [ ] Dark mode tema
- [ ] Progressive Web App (PWA) özellikleri
- [ ] Başvuru kontrol listesi (checklist) sayfası

### Yeni Sayfa Eklemek İçin
1. HTML dosyası oluştur
2. `<div id="navbar-container"></div>` ve `<div id="footer-container"></div>` ekle
3. Bootstrap ve `components.js` script'lerini ekle
4. `templates/navbar.html` menüsüne link ekle

## 📄 Lisans

Bu proje eğitim ve bilgilendirme amaçlıdır. Resmi Green Card başvurusu ve bilgileri için **travel.state.gov** adresini ziyaret edin.

---

**Geliştirici:** sametakan29  
**Son Güncelleme:** 25 Kasım 2025  
**Versiyon:** 1.0

