//Important for useQuery: We import the useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';

import { QUERY_PROFILES } from '../utils/queries';
import Footer from '../components/Footer';




// We define the Home component


const Home = () => {
  
  const { loading, data } = useQuery(QUERY_PROFILES);

  
  const profiles = data?.profiles || [];

return (
  <>
    <header style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '75px',  // Reduced height to match navbar
      background: '#0d2264',
      fontFamily: 'Rubik Mono One, sans-serif',
      padding: '2rem',
      marginBottom: '2rem',
      marginTop: '.5rem',
    }}>
      <h1 style={{
        color: '#fff',
        fontSize: '2rem',
        letterSpacing: '0.6rem',
        margin: '2rem',
        textShadow: '3px 3px 6px #000',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontFamily: 'Blockbuster, sans-serif',
      }}>
        WELCOME TO<br />BLOCKBUSTER 2024
      </h1>
    </header>
    
    <footer style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '5rem',
      background: '#0d2264',
      color: '#fff',
      fontSize: '1.2rem',
      letterSpacing: '0.4rem',
      padding: '1rem',
    }}>
      
      &copy; Blockbuster2024. All rights reserved.
      
    </footer>
    <Footer />
  </>
);
};

// We export the Home component


export default Home;

