//Film component'inde tekrar eden jsx kodlar olduğu için oradaki kodları FilmCard bileşenine taşıdık: 

import React from 'react';
import KaydedilenlerListesi from './KaydedilenlerListesi';


export default function FilmCard (props) {
  const { title, director, metascore, stars } = props.movie;
  const { filmDetaylariniAc, KaydedilenlerListesineEkle } = props;




  return(
    <div className="save-wrapper">
      <div className="movie-card" onClick={() => filmDetaylariniAc && filmDetaylariniAc()}>
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars?.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div> // tüm filmlerde stars kısmı olmayabileceği için "varsa" maple demek için "?" kullandık.
        ))}
      </div>
      <button className="save-button" onClick={() => KaydedilenlerListesineEkle && KaydedilenlerListesineEkle(props.movie)}>Kaydet</button>
    </div>
  )
}

// buradaki onClick eventine verdiğmiz && işaretinin anlamı şu: KaydedilenlerListesineEkle varsa bu fonksiyonu tetikle, içerisine de movie propsunu gönder.