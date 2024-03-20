const message = [
    'Live in a Castle?',
    'No Wifi? No Problem',
    'Live in an Underground Bunker?',
     'More of a book person?',
     'Lost in pages, not WiFi signals.',
     `WiFi's off, imagination's on!`,
     " Embrace the paperbacks!"
]

const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * message.length);
    return message[randomIndex];
  };
  
  export default getRandomMessage;