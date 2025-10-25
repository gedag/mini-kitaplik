import React from 'react';
import KitapKarti from './KitapKarti';

const KitapListe = ({ kitaplar, favoriler, favoriToggle }) => {
  return (
    <div className="kitap-liste">
      {kitaplar.length > 0 ? (
        kitaplar.map((kitap) => (
          <KitapKarti
            key={kitap.id}
            baslik={kitap.baslik}
            yazar={kitap.yazar}
            kategori={kitap.kategori}
            id={kitap.id}
            favorideMi={favoriler.includes(kitap.id)}
            favoriToggle={favoriToggle}
          />
        ))
      ) : (
        <p>Aradığınız kriterlere uygun kitap bulunamadı.</p>
      )}
    </div>
  );
};

export default KitapListe;