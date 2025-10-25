import React from 'react';

const FavoriPaneli = ({ favoriKitaplar, favoriToggle }) => {
  return (
    <div className="favori-panel">
      <h2>Favoriler ({favoriKitaplar.length})</h2>
      {favoriKitaplar.length > 0 ? (
        <ul className="favori-liste">
          {favoriKitaplar.map((kitap) => (
            <li key={kitap.id}>
              {kitap.baslik}
              <button
                onClick={() => favoriToggle(kitap.id)}
                className="kaldir-button"
              >
                Kaldır
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz favori kitabınız yok.</p>
      )}
    </div>
  );
};

export default FavoriPaneli;