import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/';
import FilmCard from './FilmCard';

export default function Film(props) {
  const [movie, setMovie] = useState();

  //App'ten props olarak gönderdiğimiz KaydedilenlerListesineEkle fonksiyonunu aldık. Ardından aşağıda return kısmında, bunu kullanacak olan anasayfadaki FilmCard bileşenindeki kaydet butonuna prop olarak aktaracağız. Anasayfaya doğrudan gidebilir ancak 
  const {KaydedilenlerListesineEkle} = props;

  // URL'den alınan :id parametresini bu değişkene aktardık.
  let { id } = useParams();




  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/filmler/${id}`) 
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  // Yalnızca esnek görevlere geçtiğinizde burdaki yorum etiketini kaldırın
  const filmiKaydet = evt => { }

  if (!movie) {
    return <div>Film bilgisi yükleniyor...</div>;
  }

//const { title, director, metascore, stars } = movie;
//burada önceden, FilmCard'ın return kısmında yazan kodlar vardı. film ayrıntılarını içeren tüm kodları oraya taşıdık. Burası sadece film datasını çeken ve FilmCard bileşenini render eden component olarak kalacak. FilmListesi component'inden gelen movie prop'unu da içine ekledik: 
  return (
    <FilmCard movie={movie} KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}/>
  );
}
