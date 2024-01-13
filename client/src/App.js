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

  const KaydedilenlerListesineEkle = id => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi list={[ /* Burası esnek */]} />
      <Switch>
        <Route exact path="/">
          <FilmListesi movies={movieList} />
        </Route>
        <Route exact path="/filmler/:id">
          <Film />
        </Route>
      </Switch>
    </div>
  );
}

//İki tane route'umuz var. 
//1)FilmListesi: Bu componant'a prop olarak gidecek olan bir "movies" datası var. Bu prop'a, yukarıda useEffect'le aldığımız API verisini set ettiğimiz movieList state'ini gönderdik.
//2)Film: 
