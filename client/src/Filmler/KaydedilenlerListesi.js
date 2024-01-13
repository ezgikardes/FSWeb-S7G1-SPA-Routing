import React from 'react';
import { useHistory, Link } from 'react-router-dom/';

export default function KaydedilenlerListesi(props) {
  const history = useHistory();

  return (
    <div className="saved-list">
      <h3>Kaydedilen Filmler:</h3>
      <ul>
      {props.list.map(movie => (
        <li key={movie.id} className="saved-movie">
          <Link to={`/filmler/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
      </ul>
      <div className="home-button" onClick={() => {
        history.push('/');      
      }}>Anasayfa</div>
    </div>
  );
}
