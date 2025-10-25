import React from 'react';

const KitapKarti = ({
  baslik,
  yazar,
  kategori,
  id,
  favorideMi,
  favoriToggle,
}) => {
  return (
    <div className="kitap-karti">
      <div>
        <div className="kitap-baslik">{baslik}</div>
        <div className="kitap-detay">
          {yazar} · {kategori}
        </div>
      </div>
      <button
        onClick={() => favoriToggle(id)}
        className={favorideMi ? 'favori-aktif' : 'favori-pasif'}
      >
        <span className="star">⭐</span>{' '}
        {favorideMi ? 'Favoride' : 'Favori Ekle'}
      </button>
    </div>
  );
};

export default KitapKarti;