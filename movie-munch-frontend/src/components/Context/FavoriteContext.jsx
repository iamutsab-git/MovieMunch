import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../../Services/api';
import { AuthContext } from "./AuthContext/";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const loadFavorites = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const response = await apiRequest.get("/favorites", {
            withCredentials: true
          });
          setFavorites(response.data); 
        } catch (error) {
          console.error('Failed to load favorites:', error);
          setFavorites([]); // Ensure favorites is always an array
        } finally {
          setLoading(false);
        }
      } else {
        setFavorites([]); // Clear when no user
      }
    };

    loadFavorites();
  }, [currentUser]);

  const addToFavorites = async (movie) => {
    if (!movie?.id || !currentUser) return;

    try {
      setLoading(true);
      const response = await apiRequest.post("/favorites/add", {
        movieId: movie.id,
        movieData: movie,
      }, {
        withCredentials: true,
      });
      
      // Update state with server response
      setFavorites(response.data);
    } catch (error) {
      console.error('Failed to add favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (movieId) => {
  try {
    await apiRequest.delete(`/favorites/remove/${movieId}`);
    // Force update by filtering local state immediately
    setFavorites(prev => prev.filter(fav => {
      const movie = fav.movieData || fav;
      return movie.id !== movieId;
    }));
  } catch(error) {
    console.error("Failed to remove favorite:", error);
    throw error; // Re-throw to handle in component
  }
};

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites,
      loading 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);