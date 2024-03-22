export const searchOMDBMovies = async (searchTerm, apiKey) => {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

  try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const searchData = await response.json();

      if (searchData.Response === "True") {
          // Extract the list of movie IDs or IMDb IDs from the search results
          const movieIds = searchData.Search.map((movie) => movie.imdbID);

          // Fetch detailed information for each movie using the IMDb IDs
          const detailedMovieData = await Promise.all(
              movieIds.map(async (imdbID) => {
                  const detailUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
                  const detailResponse = await fetch(detailUrl);
                  const detailData = await detailResponse.json();
                  return detailData;
              })
          );

          return detailedMovieData;
      } else {
          return []; 
      }
  } catch (error) {
      console.error("Error during data fetch:", error);
      throw error;
  }
};

export const handleSearch = async (searchTerm) => {
  try {
      const apiKey = "ebba7249";
      const data = await searchOMDBMovies(searchTerm, apiKey);
      return data;
  } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
  }
};
  