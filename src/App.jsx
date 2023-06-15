import { useCallback, useRef, useState } from "react";
import "./App.css";
import Movies from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, error, setSearch } = useSearch();
  const { movies, getMovies, isLoading } = useMovies({
    search,
    sort,
  });
  const firstRender = useRef(true);

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 300),
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    firstRender.current = false;
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setSearch(newQuery);
    debouncedGetMovies(newQuery);
  };

  const handleCheck = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="search"
            placeholder="Match Point, Lost in Translation..."
          />
          <input onChange={handleCheck} type="checkbox" checked={sort} />
          <button>Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      {firstRender.current ? null : (
        <main>
          {isLoading ? <p>Cargando...</p> : <Movies movies={movies} />}
        </main>
      )}
    </div>
  );
}

export default App;
