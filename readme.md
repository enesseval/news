## Haber Uygulaması

Bu uygulama, Firebase'den haberleri alıp listeleyebileceğiniz bir mobil uygulamadır. Kullanıcılar, kategorilere göre filtreleyebilir, tarih aralığı seçebilir ve haberleri görüntüleyebilir. Ayrıca, haber detaylarını inceleyebilirler.

## Özellikler

-  Haber Listeleme: Firebase'den alınan haberler liste halinde görüntülenir.
-  Kategori Filtreleme: Haberleri kategorilere göre filtreleyebilirsiniz.
-  Tarih Aralığı Seçimi: Belirli bir tarih aralığında yayınlanan haberleri görüntüleyebilirsiniz.
-  Haber Detayları: Her haberin detaylarına erişebilir ve detayları inceleyebilirsiniz.

## Teknolojiler

-  React Native: Mobil uygulama geliştirmek için kullanılır.
-  Tamagui: UI bileşenleri ve stiller için kullanılır.
-  Firebase: Haber verilerini almak için kullanılır.
-  Redux: Uygulama durumunu yönetmek için kullanılır.
-  Expo Router: Sayfa yönlendirmeleri için kullanılır.

## Kurulum

# Gereksinimler

-  Node.js
-  npm veya yarn

1. Depoyu klonla

```
git clone https://github.com/enesseval/news
```

2. Gerekli paketleri yükle

```
cd news
npm install
```

yada

```
yarn install
```

3. Firebase Yapılandırması

Firebase yapılandırmanızı firebaseConfig.ts dosyasına ekleyin. Bu dosya, Firebase proje ayarlarınızdan alınan yapılandırma bilgilerini içermelidir.

4. Uygulamayı çalıştır

```
npx expo start
```

yada

```
yarn expo start
```

## Kullanım

-  Uygulamayı Açın: Uygulama başladığında, ana ekran kategorileri, tarih aralığı seçici ve haber listesini gösterecektir.

-  Haberleri Filtreleyin: Kategori seçimi yaparak veya tarih aralığı belirleyerek haberleri filtreleyebilirsiniz.

-  Haber Detaylarını Görüntüleyin: Bir habere dokunarak detay sayfasına geçebilirsiniz.

## Ekran Görüntüleri

# Anaekran

![anaekran](/assets/newsapp.jpeg)

# Haber detayları

![haber detay](/assets/newsapp2.jpeg)
#Filtreleme
![filtreleme](/assets/newsapp3.jpeg)
