import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "campusconnect-favorite-event-ids";

function readFavoriteIds() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved)
      ? [
          ...new Set(
            saved
              .filter((id) => ["string", "number"].includes(typeof id))
              .map(String),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavoriteIds);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Favorites remain available for this session when storage is unavailable.
    }
  }, [favorites]);

  const toggleFavorite = (eventOrId) => {
    const eventId = String(
      typeof eventOrId === "object" ? eventOrId.id : eventOrId,
    );
    setFavorites((ids) =>
      ids.includes(eventId)
        ? ids.filter((id) => id !== eventId)
        : [...ids, eventId],
    );
  };
  const removeFavorite = (eventOrId) => {
    const eventId = String(
      typeof eventOrId === "object" ? eventOrId.id : eventOrId,
    );
    setFavorites((ids) => ids.filter((id) => id !== eventId));
  };
  const isFavorite = (id) => favorites.includes(String(id));

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
