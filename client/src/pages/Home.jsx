import { Container, Row, Col, Card, Button } from "react-bootstrap";
import membershipCardImage from '../assets/images/BlockbusterMembership02.jpg';
import vintageLogo from '../assets/images/BlockbusterLogo1985.png'
import magicBooks from '../assets/images/magicBooks.jpg'
import blockbusterStore from '../assets/images/blockbusterStore.jpg'
import '../home.css'

const Home = () => {
    return (
      <Container className="home-container">
        <Row>
        <Col>
            <Card className='original-site-card'>
              <Card.Header>Take a Step back in time!</Card.Header>
              <Card.Body>
                <Card.Title>
                  Original Blockbuster
                </Card.Title>
                <Col>
                <img src={vintageLogo} alt="Vintage Logo" style={{ width: '150px', marginLeft: '10px' }}
                />
                </Col>
                <Card.Text>
                  Take a step back into history and view the original Blockbuster website.
                  It may not be up and running, but it is for sure going to induce some nostalgia.
                </Card.Text>
                <Button variant="primary" href="https://www.blockbuster.com/" target="_blank">Go to Original Site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className ='membershipRow'>
          <Col>
            <Card style={{ width: '24rem' }}>
              <Card.Img variant="top" src={membershipCardImage} style={{ height: '200px' }} />
              <Card.Body>
                <Card.Title>Don't have a membership card?</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Get a BlockBuster Membership Card today!</Card.Subtitle>
                <Card.Text>
                  Becoming a Blockbuster member gives you access to our infinite movie and book catalogs for you to save into storage!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '24rem' }}>
              <Card.Img variant="top" src={magicBooks} style={{ height: '200px' }}  />
              <Card.Body>
                <Card.Title>Book Catalog</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Search through 1000's of titles!</Card.Subtitle>
                <Card.Text>
                 Search through a database of thousands of book titles and save them into your 
                 very own collection once you become a Blockbuster member.
                </Card.Text>
                <Button variant="primary" href="/search-books" target="_blank">Search Book Catalog</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '24rem' }}>
            <Card.Img variant="top" src={blockbusterStore} style={{ height: '200px' }} />
              <Card.Body>
                <Card.Title>Movie Catalog</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Looking for a movie? We got it!</Card.Subtitle>
                <Card.Text>
               Try out our movie catalog with any movie you can think of. Find a large variety of information with each movie! You can also save the movie to your favorites list so you never forget about them! 
                </Card.Text>
                <Button variant="primary" href="/search-movies" target="_blank">Search Movie Catalog</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};

export default Home;
  


