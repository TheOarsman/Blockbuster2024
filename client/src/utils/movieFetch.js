


export const searchOMDBMovies = async (searchTerm, apiKey) => {

   
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(searchTerm)}`;
    
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during data fetch:", error);
      throw error; 
    }
  };


  export const handleSearch = async (searchTerm) => {
    try {
        const apiKey = "ebba7249"; 
        
        const data = await searchOMDBMovies(searchTerm, apiKey);
        console.log(data); 
        return data; 
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error; 
    }
};
  