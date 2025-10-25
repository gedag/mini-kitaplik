import React from 'react';
import kitaplarData from '../data/kitaplar';

const KategoriFiltre = ({ kategori, setKategori }) => {
  // Mevcut kategorileri bul ve 'Tümü' seçeneğini ekle
  const kategoriler = [
    'Tümü',
    ...new Set(kitaplarData.map((kitap) => kitap.kategori)),
  ];

  return (
    <select
      value={kategori}
      onChange={(e) => setKategori(e.target.value)}
      className="kategori-select"
    >
      {kategoriler.map((kat) => (
        <option key={kat} value={kat}>
          {kat}
        </option>
      ))}
    </select>
  );
};

export default KategoriFiltre;