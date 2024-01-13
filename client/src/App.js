import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import FilmListesi from './Filmler/FilmListesi';
import Film from './Filmler/Film';

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') 
        .then(response => {setMovieList(response.data);
        }) //gelen datayı movieList state'ine setledik.
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);


      // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyeceğiz. Bu fonksiyon, FilmCard bileşenindeki ve Anasayfadaki Kaydet butonuna prop olarak gitmeli. Anasayfaya doğrudan gidebilir ama FilmCard öncesinde mutlaka Film bileşenine de gitmeli.Çünkü FilmCard'ı orası render ediyor.
  const KaydedilenlerListesineEkle = movie => {
        if (!saved.find((m) => m.id === movie.id) ) {
          setSaved([...saved, movie ])
        } // eğer gelen movie'nin id'si mevcut listede yoksa, bu movie'yi saved state'e ekle, varsa ekleme dedik. 
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />
      <Switch>
        <Route exact path="/">
          <FilmListesi 
            movies={movieList} 
            KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}
          />
        </Route>
        <Route exact path="/filmler/:id">
          <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle} />
        </Route>
      </Switch>
    </div>
  );
}

//İki tane route'umuz var. 
//1)FilmListesi: Bu componant'a prop olarak gidecek olan bir "movies" datası var. Bu prop'a, yukarıda useEffect'le aldığımız API verisini set ettiğimiz movieList state'ini gönderdik.
//2)Film: sondaki /:id parametresi ile adresi dinamik hale getirdik. Bileşende, useParams() hooku ile bu parametreyi bir değişkene atayacağız. 