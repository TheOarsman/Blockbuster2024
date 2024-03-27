# Blockbuster 2024

![License](https://img.shields.io/badge/License-MIT-yellow.svg)

[Blockbuster 2024](https://blockbuster2024.onrender.com)<br>

<!-- <img src="Blockbuster_logo.svg.png" width="275" height="175"> -->

<!-- <video controls>
  <source src="client/src/assets/video/README Test Video.mp4" title="Title">
  Your browser does not support the video tag.
</video> -->

## Description

A web application focused on Movies! This is a throw back built from the
foundation of BLOCKBUSTER. Back when you used to look forward to going
out to pick up that new VHS release, which has now disappeared. Streaming
services has since killed the once beloved BLOCKBUSTER. Either way we
wanted to create a fun interactive site which allows users to be able to
research various movies, then can create a watch list and top favorite list.
Not to mention how many books were written and then made into movie,
how great would it be to search for that book too! If you don’t have wifi the
book for the win!

## Table of Contents

- [Blockbuster 2024](#blockbuster-2024)<br>
- [Description](#description)<br>
- [Table of Contents](#tabel-of-contents)<br>
- [User Story](#user-story)<br>
- [Acceptance Criteria](#acceptance-criteria)<br>
- [Installation](#installation)<br>
- [Development](#development)<br>
- [Usage](#usage)<br>
- [Technologies](Technologies)
- [License](#license)<br>
- [Contributing](#contributing)<br>
- [Tests](#tests)<br>
- [Resources](#resources)<br>
- [Questions/Contact](#questionscontact)

## User Story

**AS A** lover of movies <br>

**I WANT** to visit a database/platform <br>

**SO THAT** I can search movies & books, and add them to a Book Collection, Favorite Movies, or Watchlist

## Acceptance Criteria

**GIVEN** a webpage/movie platform

**WHEN** I visit the webpage<br>
**THEN** I am presented with the home screen
**AND** able to search for books and movies, as well as login or sign up

**WHEN** I am not logged in
**THEN** I can search books and movies, seeing their poster/cover and a brief description
**BUT** cannot add them to my favorites or watch list

**WHEN** I login<br>
**THEN** I am presented with a reactive membership card which displays my username
**AND** a reactive barcode based on the username input

**WHEN** I sign up<br>
**THEN** I am presented with a reactive membership card which displays my username & email
**AND** a reactive barcode based on the username input

**WHEN** I am logged in<br>
**THEN** I am presented with a more integrative/reactive website

**WHEN** I view my user profile<br>
**THEN** a membership card is displayed with my username, email, hours (of movies) watched, member-since date, and a barcode reflective of the username

**WHEN** I search a movie<br>
**THEN** I can see it's poster with a description of the movie
**AND** can add the movie to my "Favorite Movies" and/or "Watchlist"

**WHEN** I search a book<br>
**THEN** I can see it's cover with a description of the book
**AND** can add the book to my "Book Collection"

**WHEN** Viewing a movie<br>
**THEN** can see if there is also a book about the movie, or that the movie was based on

**WHEN** viewing the footer<br>
**THEN** I am given a dropdown box to view all developers, with links to their individual GitHub & LinkedIn profiles
**AND** click on the "Feedback Link" to give feedback about the website

**WHEN** I am presented with the Contact section<br>
**THEN** I see a contact form with fields for a name, an email address, and a message

**WHEN** I view the webpage on smaller screens and/or flex the page<br>
**THEN** I see a responsive webpage

## Installation

1. Clone the repository to your local machine: `git clone https://github.com/TheOarsman/Blockbuster2024`

2. Install server dependencies:
   1. `cd server`
   2. `npm install`
3. Install client dependencies:
   1. `cd client`
   2. `npm install`

## Development

To run the application in development mode, use the following commands:: `npm run develop`

This command will start both the server and client in watch mode, enabling hot-reloading for development.

## Usage

Once the development server is running, you can access the application at http://localhost:3000 in your web browser.

Seed Database (Optional)
If you want to populate the database with sample data, you can run the following command: `npm run seed`

**Building for Production**

To build the application for production, use the following command: `npm run build`

This command will build the client-side application and optimize it for production use. The bundled files will be generated in the `client/dist` directory.

**Notes**

- Ensure that MongoDB is installed and running locally or provide the appropriate connection URI in the server's .env file.

- Adjust any configuration settings as needed, such as port numbers or environment variables.

## Technologies

![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## License

![License](https://img.shields.io/badge/License-MIT-yellow.svg)

MIT License

Copyright 2024 TheCoolestGroupEVER!!!

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit pull requests with your changes. Before submitting a pull request, make sure to follow these guidelines:

**Code Style**: Adhere to the existing code style and formatting conventions.
**Testing**: Ensure that your changes are properly tested and do not introduce any regressions.
**Documentation**: Update the relevant documentation, including code comments and README.md file, to reflect your changes.
**Commit Messages**: Write clear and descriptive commit messages that explain the purpose of your changes.

Thank you for considering contributing to this project! Your help is greatly appreciated.

## Tests

None currently

## Resources

**[React-Barcode](https://www.npmjs.com/package/react-barcode?activeTab=readme)**

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://www.github.com/TheOarsman)

- A `<Barcode/>` component for use with React.

## Questions/Contact

**Feedback**<br>
If you have any questions, feedback, or encounter any issues while using this portfolio website, please don't hesitate to reach out. You can contact me directly via my Gmail (click badge below) or by opening an issue in the GitHub repository. Your feedback is invaluable and helps improve this project for everyone. Thank you for your support!

**Developers:**

**Nicholas Eggleston**:

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicholas-eggleston-9780a7270/)<br>

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nickegg11)

**Greg Greve**:

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gregory-greve-b48463300/)<br>

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Goobergreve09)

**Whitney Simpson**:

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/whitney-simpson-9a4471300/)<br>

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Whitney-Simpson)

**Heinz Ulrich V**:

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/heinz-ulrich-v-3a3486a0/)<br>

[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/@theoarsman4581)<br>

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://www.github.com/TheOarsman)<br>

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:heinzulrichv@gmail.com)<br>

**Ethan Wynne**:

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ethan-wynne-b2a956161)<br>

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ethanfrog)
