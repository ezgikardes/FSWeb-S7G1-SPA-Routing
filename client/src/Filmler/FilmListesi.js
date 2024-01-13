import React from 'react';
import { useHistory } from 'react-router-dom';

export default function FilmListesi(props) {
  return (
    <div className="movie-list">
      {props.movies.map(movie => (
        <FilmDetayları key={movie.id} movie={movie} />
      ))}
    </div>
  );
  }

function FilmDetayları(props) {
  const { title, director, metascore, id} = props.movie;
  //buraya id propsunu da ekledik. id props'u, yukarıdaki FilmListesi bileşeninden map'le her bir film için ayrı oluşturulan FilmDetayları bileşenine gönderilen movie propundan geliyor. Destructuring işlemi sayesinde, const { title, director, metascore, id } = props.movie; satırıyla movie prop'undaki film nesnesinin özellikleri (title, director, metascore, id) ayrı değişkenlere atanıyor. 
  const history = useHistory(); 


  return (
    <div className="movie-card" onClick={() => {
      history.push(`/filmler/${id}`) // buradaki div'e tıklandığında sözkonusu filmin id'sine göre yönlendirme yapacak useHistory kancasını kullandık.
    }}>
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
    </div>
  );
}
