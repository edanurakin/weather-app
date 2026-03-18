# 🌤️ Hava Durumu Tahmini Uygulaması

Modern, şık ve eğlenceli bir hava durumu tahmin uygulaması. Kullanıcıların aradıkları şehrin anlık hava durumunu ve 5 günlük hava tahminini görebilmelerini sağlar. Ayrıca hava durumuna göre değişen sevimli kurbağa maskotu ile kullanıcılara günün hava şartlarına uygun tavsiyeler verir.

## ✨ Özellikler

- **Anlık Hava Durumu:** Şehir araması ile o anki sıcaklık ve hava durumu ayrıntıları.
- **5 Günlük Tahmin:** Seçilen şehrin önümüzdeki 5 güne ait hava durumu beklentisi.
- **Dinamik Arka Plan:** Hava durumuna göre (güneşli, yağmurlu, bulutlu, karlı) otomatik olarak değişen temanın ana renkleri.
- **Eğlenceli Maskot (Hava Durumu Kurbağası):** 
  - ☀️ Güneşli havalarda güneşlenen kurbağa (`sunbathing_frog.png`)
  - 🌧️ Yağmurlu havalarda şemsiyeli kurbağa (`umbrella_frog.png`)
  - ❄️ Karlı havalarda atkılı/kışlık giyimli kurbağa (`scarf_frog.png`)
  - ☁️ Bulutlu veya serin havalarda şapkalı kurbağa (`hat_frog.png`)
- **Modern Arayüz:** *Inter* font ailesi ve zarif *Phosphor* ikonlarıyla desteklenen şık, sade ve kullanıcı dostu tasarım.

## 🛠️ Kullanılan Teknolojiler

- **HTML5:** Sayfa iskeleti ve semantik yapı.
- **CSS3:** Modern flexbox/grid sistemleri, geçiş (transition) efektleri ve dinamik arka plan sınıfları.
- **JavaScript (ES6):** Hava durumu API'sine istek atma, dinamik olarak DOM güncelleme ve uygulama mantığı.
- **İkonlar ve Fontlar:** Phosphor Icons, Google Fonts (Inter).

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel cihazınızda çalıştırmak için ekstra bir kuruluma veya paket yükleyicisine ihtiyaç yoktur (tamamen Vanilla web teknolojileri kullanılmıştır):

1. Bu proje klasörünü bilgisayarınıza indirin.
2. `uygulama` dizinine gidin.
3. Tarayıcınızda görüntülemek için `index.html` dosyasına çift tıklayabilirsiniz. Daha iyi bir geliştirici deneyimi için VS Code'da **"Live Server"** eklentisini kullanmanız önerilir.

*Not: Uygulamanın hava durumu verilerini başarıyla çekebilmesi için çalışan bir internet bağlantısına ve `script.js` içerisinde tanımlı geçerli bir API anahtarına (örn. OpenWeatherMap) ihtiyacı vardır.*

## 📁 Proje Yapısı

```text
uygulama/
├── README.md             # Proje detaylarını içeren bu dosya
├── index.html            # Ana sayfa ve bileşenlerin bulunduğu HTML dosyası
├── style.css             # Arayüz tasarımlarının yapıldığı CSS dosyası
├── script.js             # API etkileşimi ve arayüz mantığını sağlayan JS dosyası
├── hat_frog.png          # Bulutlu/Serin hava kurbağa görseli
├── scarf_frog.png        # Karlı hava kurbağa görseli
├── sunbathing_frog.png   # Güneşli hava kurbağa görseli
└── umbrella_frog.png     # Yağmurlu hava kurbağa görseli
```

## 🎨 Tasarım Notları

Kullanıcı deneyimini (UX) en üst seviyeye taşımak amacıyla geniş aralıklar, soft gölgeler, yuvarlatılmış köşeler (glassmorphism veya modern kart yapısı) hedeflenmiştir. Renk paleti, doğanın kendi tonlarına referans verilerek canlı ama göz yormayacak şekilde kurgulanmıştır.
