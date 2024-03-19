// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { SAVE_BOOK } from '../utils/mutations';
// import { Form, Button, Card, CardColumns, Container } from 'react-bootstrap';

// const BookSearch = () => {
//   // create state for holding our search field data
//   const [searchInput, setSearchInput] = useState('');

//   // create state to hold saved bookId values
//   const [savedBookIds, setSavedBookIds] = useState([]);

//   const handleInputChange = (event) => {
//     setSearchInput(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     if (!searchInput) {
//       return false;
//     }

//     try {
//       const response = await fetch(`/api/books?title=${searchInput}`);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const data = await response.json();

//       setSavedBookIds(data || []);
//     } catch (err) {
//       console.error(err);
//     }

//     setSearchInput('');
//   };

//   return (
//     <Container>
//       <h2>Book Search</h2>
//       <Form onSubmit={handleFormSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label htmlFor="searchInput">Search by Title:</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter Book Title"
//             id="searchInput"
//             value={searchInput}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Button type="submit">Search</Button>
//       </Form>
//       <CardColumns>
//         {savedBookIds.map((book) => (
//           <Card key={book.bookId} border="dark">
//             {book.image ? (
//               <Card.Img src={book.image} alt={`The cover for ${book.title}`} />
//             ) : null}
//             <Card.Body>
//               <Card.Title>{book.title}</Card.Title>
//               <p className="small">Authors: {book.authors?.join(', ')}</p>
//               <Card.Text>{book.description}</Card.Text>
//               <Button className="btn-block btn-danger" onClick={() => handleDeleteBook(book.bookId)}>
//                 Delete this Book!
//               </Button>
//             </Card.Body>
//           </Card>
//         ))}
//       </CardColumns>
//     </Container>
//   );
// };

// const handleDeleteBook = async (bookId) => {
//   const response = await fetch(`/api/books/${bookId}`, {
//     method: 'DELETE',
//   });

//   if (!response.ok) {
//     alert('Failed to delete book');
//     return;
//   }

//   const updatedBookIds = savedBookIds.filter((book) => book.bookId !== bookId);
//   setSavedBookIds(updatedBookIds);
// };

// export default BookSearch;

