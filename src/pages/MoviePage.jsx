import { useParams } from 'react-router-dom';
import { UseApi } from '../useApi';
import { useCallback, useEffect, useState } from 'react';

function MoviePage() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState({});
  const imageUrl = process.env.REACT_APP_IMAGE_URL + '/w400';


  const onDetail = useCallback( async () => {
    try {
      const data = await UseApi(`/movie/${id}`, {
        method: 'GET',
      })
      setMovie(data)

    } catch (err) {
      setError(err.message);
    }
  }, [id])

  useEffect(() => {
    onDetail()
  }, [id, onDetail])

  // onDetail()

  if (error) {
      return <div>Error: {error}</div>;
  }

  return (
    <div className='product'>
      <h1>{movie.original_title} - {new Date(movie.release_date).getFullYear()}</h1>

      <div className="product-detail">
        <img src={imageUrl + movie.poster_path} alt={movie.original_title} />
        <div>
          <p>
            <strong>Description: </strong>
            {movie.overview}
          </p>
          <p>
            <strong>Rating: </strong>
            {movie.vote_average}
          </p>
          <p>
            <strong>Release Date: </strong>
            {movie.release_date}
          </p>
          <p>
            <strong>Genres: </strong>
            {movie.genres?.map(genre => genre.name).join(', ')}
          </p>
          <p>
            <strong>Runtime: </strong>
            {movie.runtime} minutes
          </p>
          <p>
            <strong>Budget: </strong>
            ${movie.budget}
          </p>
          <p>
            <strong>Revenue: </strong>
            ${movie.revenue}
          </p>
          <p>
            <strong>Production Companies: </strong>
            {movie.production_companies?.map(company => company.name).join(', ')}
          </p>
          <p>
            <strong>Production Countries: </strong>
            {movie.production_countries?.map(country => country.name).join(', ')}
          </p>
          <p>
            <strong>Spoken Languages: </strong>
            {movie.spoken_languages?.map(language => language.name).join(', ')}
          </p>
          <p>
            <strong>Status: </strong>
            {movie.status}
          </p>
          <p>
            <strong>Tagline: </strong>
            {movie.tagline}
          </p>
        </div>
      </div>

      {/* Here you can use the ID to fetch movie data, for example */}
    </div>
  );
}

export default MoviePage;
