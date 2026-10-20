# 🚀 Portfolyo — Minimal / Glassmorphism

Koyu temalı, sade kişisel portfolyo sitesi.
**HTML + CSS + vanilla JavaScript** ile yazıldı — build adımı veya bağımlılık yok.

🔗 **Canlı:** https://byiru.github.io/portfolyo2/

## ✨ Özellikler

- 🌌 Animasyonlu gradient arka plan (aurora) ve ince grid dokusu
- 🖱️ İmleci takip eden ışık efekti (masaüstü)
- 🎴 Profil kartında 3D eğim (tilt) efekti
- ⌨️ Yazı makinesi animasyonu (rol değişimi)
- 🧭 Kaydırma ilerleme çubuğu ve otomatik aktif menü
- 💬 Canlı Discord durumu (Lanyard) + oyun aktivitesi (logo, detay, süre) + Spotify çalar (kapak, ilerletme çubuğu, baştan sarma)
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
| Bölüm başlığı | `index.html` → `#su-an` |
| Sosyal medya linkleri | `index.html` → hero, nav ve footer |
| Discord kullanıcı ID | `js/script.js` → `DISCORD_ID` |
| Öne çıkan Spotify parçası | `js/script.js` → `FEATURED_TRACK` |
| Renkler | `css/style.css` → `:root` (`--violet`, `--fuchsia`, `--cyan`) |
| Yazı makinesi rolleri | `js/script.js` → `roles` dizisi |

## 💬 Discord + Spotify

Kart, [Lanyard](https://lanyard.rest) API'siyle Discord durumunu, [Spotify Embed](https://developer.spotify.com/documentation/embeds) ile de o an çalan şarkıyı gösterir.

**Canlı durum için (tek seferlik):**

1. https://discord.gg/lanyard sunucusuna Discord hesabınla katıl — Lanyard yalnızca sunucudaki kullanıcıları izler.
2. Discord → **Ayarlar → Activity Privacy** → *"Display current activity as a status message"* açık olsun.
3. Discord → **Ayarlar → Connections** → **Spotify** bağlı olsun.
4. Spotify'da bir şarkı çal — kart otomatik olarak şarkıya geçer.

Şarkı çalarken albüm kapağı, şarkı adı, ilerletme çubuğu ve Spotify logosu görünür. Çubuğa tıklayarak şarkıyı ileri/geri sarabilirsin.

> Spotify'a giriş yapmış ziyaretçiler şarkının tamamını, giriş yapmamış olanlar 30 saniyelik önizlemeyi dinler. Bu, Spotify embed'inin kuralıdır (tam akış için Spotify hesabı gerekir).

### Oyun / uygulama aktivitesi

Discord'da bir oyun oynuyorsan (LoL, Valorant, Steam oyunları, VS Code vb.) kartta **oyun logosu + detay + "kaç dk oynuyor"** sayacı görünür.

Gösterilen bilgiler Discord'un gönderdiği **zengin durum (Rich Presence)** verisinden gelir:

| Alan | Kaynak |
|---|---|
| Logo | `assets.large_image` → yoksa uygulama ikonu (`dcdn.dstn.to/app-icons/{id}`) |
| Detay | `details` · `state` |
| Süre | `timestamps.start` (canlı sayar) |

> ⚠️ **LoL'de şampiyon ismi gösterilemez** — resmi League of Legends istemcisi Discord'a şampiyon/KDA/seviye bilgisi **göndermiyor**, sadece oyun adı ve süreyi gönderiyor. Şampiyon bilgisi için [league-rpc](https://github.com/Its-Haze/league-rpc) gibi üçüncü parti bir LoL RPC aracı kullanman gerekir; o zaman şampiyon/skin/KDA otomatik olarak Discord'a düşer ve site bunu **otomatik** gösterir (ekstra kod gerekmez).

### Öne çıkan parça

Canlı şarkı yokken (veya Lanyard henüz aktif değilken) kartta çalan varsayılan parça:

`js/script.js` → `FEATURED_TRACK`

```js
const FEATURED_TRACK = {
  id: "7uI6R3KoJWxuXjvBHIr5lW", // Spotify parça ID'si ("" → çalar gizlenir)
  label: "Kod yazarken",
};
```

Spotify'da bir parçayı aç → **Paylaş → Bağlantıyı kopyala** → linkteki `track/` sonrası 22 karakterlik kısmı `id` alanına yaz. Canlı şarkı yokken çaların görünmesini istemiyorsan `id` alanını boş bırak.

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
