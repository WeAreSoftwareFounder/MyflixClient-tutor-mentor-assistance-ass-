import { MovieView } from '../movieview/movieview';

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (token && user) {
      fetchMovies();
    }
  }, [token, user]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        'https://my-flixs-8361837988f4.herokuapp.com/movies',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const moviesData = await response.json();
      setMovies(moviesData);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
    }
  };

  const { id } = useParams();

  const getSelectedMovie = () => {
    return movies.find((movie) => movie._id === id);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
  };

  return (
    <>
      {user && token && (
        <Button onClick={handleLogout}>Logout</Button>
      )}
      {loading ? (
        <div>Loading movies...</div>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        movies.map((movie) =>
          movie.Title ? (
            <div key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={handleMovieClick}
                onBackClick={handleBackClick}
                Director={
                  typeof movie.Director === 'object'
                    ? movie.Director.Name || ''
                    : movie.Director || ''
                }
                ImagePath={movie.ImagePath || ''}
              />
              <Link to={`/movie/${movie._id}`}>View Details</Link>
            </div>
          ) : null
        )
      )}
    </>
  );
};
export const MovieDetails = MovieView;
