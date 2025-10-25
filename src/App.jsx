import React, { useState, useEffect, useMemo } from 'react';
// UZANTILAR EKLENEREK IMPORT HATALARI ÖNLENDİ
import kitaplarData from './data/kitaplar.js';
import AramaCubugu from './components/AramaCubugu.jsx';
import KategoriFiltre from './components/KategoriFiltre.jsx';
import KitapListe from './components/KitapListe.jsx';
import FavoriPaneli from './components/FavoriPaneli.jsx';
import './App.css'; 

// Local Storage'dan veriyi çekmek için yardımcı fonksiyon
const getLocalStorage = (key, initialValue) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    try {
      return JSON.parse(savedValue);
    } catch (error) {
      console.error(`Local Storage'dan ${key} verisi çekilirken hata:`, error);
      return initialValue;
    }
  }
  return initialValue;
};

function App() {
  const [kitaplar] = useState(kitaplarData);
  
  // Local Storage'dan kalıcılık ile state yönetimi
  const [aramaMetni, setAramaMetni] = useState(
    getLocalStorage('aramaMetni', '')
  );
  const [kategori, setKategori] = useState('Tümü');
  const [favoriler, setFavoriler] = useState(
    getLocalStorage('favoriler', []) 
  );

  // Arama Metni kalıcılığını sağla
  useEffect(() => {
    localStorage.setItem('aramaMetni', aramaMetni);
  }, [aramaMetni]);

  // Favoriler kalıcılığını sağla
  useEffect(() => {
    localStorage.setItem('favoriler', JSON.stringify(favoriler));
  }, [favoriler]);

  // Favori Ekleme/Çıkarma İşlemi
  const favoriToggle = (kitapId) => {
    setFavoriler((prevFavoriler) => {
      if (prevFavoriler.includes(kitapId)) {
        return prevFavoriler.filter((id) => id !== kitapId);
      } else {
        return [...prevFavoriler, kitapId];
      }
    });
  };

  // Filtreleme ve Arama İşlemleri (Hata Düzeltildi: toLocaleLowerCase('tr-TR') kullanıldı)
  const filtrelenmisKitaplar = useMemo(() => {
    let liste = kitaplar;

    // 1. Kategoriye Göre Filtreleme
    if (kategori !== 'Tümü') {
      liste = liste.filter((kitap) => kitap.kategori === kategori);
    }

    // 2. Arama Metnine Göre Filtreleme (Büyük/küçük harf duyarsız ve Türkçe karakter uyumlu)
    if (aramaMetni.trim() !== '') {
      // Arama metnini Türkçe yerel ayarını kullanarak küçük harfe çevir
      const arama = aramaMetni.toLocaleLowerCase('tr-TR').trim();

      liste = liste.filter((kitap) => {
        // Kitap başlığını ve yazarını da aynı Türkçe yerel ayarını kullanarak küçük harfe çevir
        const baslik = kitap.baslik.toLocaleLowerCase('tr-TR');
        const yazar = kitap.yazar.toLocaleLowerCase('tr-TR');

        // includes() ile hatasız arama yap
        return baslik.includes(arama) || yazar.includes(arama);
      });
    }

    return liste;
  }, [kitaplar, kategori, aramaMetni]);

  // Favori olarak işaretlenmiş kitapların detaylarını al
  const favoriKitaplar = useMemo(() => {
    return kitaplar.filter((kitap) => favoriler.includes(kitap.id));
  }, [kitaplar, favoriler]);

  return (
    <div className="container">
      <h1>Mini Kitaplık</h1>
      <div className="filtreleme-alani">
        <AramaCubugu aramaMetni={aramaMetni} setAramaMetni={setAramaMetni} />
        <KategoriFiltre kategori={kategori} setKategori={setKategori} />
      </div>
      <div className="uygulama-govde">
        <KitapListe
          kitaplar={filtrelenmisKitaplar}
          favoriler={favoriler}
          favoriToggle={favoriToggle}
        />
        <FavoriPaneli
          favoriKitaplar={favoriKitaplar}
          favoriToggle={favoriToggle}
        />
      </div>
    </div>
  );
}

export default App;