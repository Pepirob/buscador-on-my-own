/* eslint-disable react/prop-types */
function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => {
        return (
          <li className="movie" key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.year} </p>
            <img src={movie.image} alt={movie.title} />
          </li>
        );
      })}
    </ul>
  );
}

function NoResults() {
  return <p>No existen resultados</p>;
}

function Movies({ movies }) {
  const hasMovies = movies?.length;
  return <>{hasMovies ? <ListOfMovies movies={movies} /> : <NoResults />}</>;
}

export default Movies;
