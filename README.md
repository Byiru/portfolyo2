# 🚀 Portfolyo — Bento / Glassmorphism

Koyu temalı, bento grid düzeninde kişisel portfolyo sitesi.
**HTML + CSS + vanilla JavaScript** ile yazıldı — build adımı veya bağımlılık yok.

🔗 **Canlı:** https://byiru.github.io/portfolyo2/

## ✨ Özellikler

- 🧩 Bento grid + glassmorphism kartlar
- 🌌 Animasyonlu gradient arka plan (aurora) ve ince grid dokusu
- 🖱️ İmleci takip eden ışık efekti (masaüstü)
- 🎴 Profil kartında 3D eğim (tilt) efekti
- ⌨️ Yazı makinesi animasyonu (rol değişimi)
- 📊 Kaydırınca dolan yetenek çubukları + yüzde sayacı
- 🗂️ Filtrelenebilir proje kartları (Tümü / Web / Araç / Deney)
- 🧭 Kaydırma ilerleme çubuğu ve otomatik aktif menü
- 📱 Tamamen mobil uyumlu, açılır menü
- ♿ `prefers-reduced-motion` desteği ve klavye erişilebilirliği
- ⚡ Sıfır bağımlılık — statik dosyalar, hızlı yükleme

## 🛠️ Teknolojiler

- HTML5 (anlamsal yapı, ARIA etiketleri)
- CSS3 (Grid, Flexbox, `backdrop-filter`, custom properties, animasyonlar)
- Vanilla JavaScript (`IntersectionObserver`, `requestAnimationFrame`)

## 📁 Yapı

```
.
├── index.html        # Tüm içerik ve bölümler
├── css/style.css     # Tasarım sistemi, bileşenler, responsive
├── js/script.js      # Tüm etkileşimler
└── README.md
```

## 🔧 Özelleştirme

| Ne değişecek | Nerede |
|---|---|
| İsim, ünvan, tanıtım | `index.html` → `.hero` bölümü (`[DÜZENLE]` yorumları) |
| Profil kartı bilgileri | `index.html` → `#profileCard` |
| Yetenekler ve yüzdeler | `index.html` → `data-level="80"` (0–100) |
| Öğrenilen teknolojiler | `index.html` → `.learning__item` (`--w:70%`) |
| Araç kutusu etiketleri | `index.html` → `.tags` |
| Projeler | `index.html` → `#projects` içindeki `.project` kartları |
| Sosyal medya linkleri | `index.html` → hero, nav ve footer |
| Renkler | `css/style.css` → `:root` (`--violet`, `--fuchsia`, `--cyan`) |
| Yazı makinesi rolleri | `js/script.js` → `roles` dizisi |

### Yeni proje kartı eklemek

`#projects` içine mevcut kartlardan birini kopyala ve şunları değiştir:

- `data-category` → `web`, `arac` veya `deney`
- `thumb--1` … `thumb--6` → hazır gradientlerden biri
- Başlık, açıklama, etiketler ve linkler

## 🚀 GitHub Pages ile yayınlama

1. Repoyu GitHub'a push et
2. **Settings → Pages** → Source: `Deploy from a branch`
3. Branch: `main` + `/ (root)` → **Save**
4. `https://KULLANICI_ADI.github.io/REPO_ADI/` adresinde yayında

### Güncelleme

```bash
git add -A
git commit -m "güncelleme"
git push
```

Pages 1-2 dakika içinde otomatik güncellenir.

## 📄 Lisans

MIT — serbestçe kullanabilirsin.
