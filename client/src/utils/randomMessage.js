const message = [
    'Live in a Castle?',
    'No Wifi? No Problem',
    'Live in an Underground Bunker?',
    'More of a book person?',
    'Lost in pages, not WiFi signals.',
    `WiFi's off, imagination's on!`,
    "Embrace the paperbacks!"
  ];
  
  const MESSAGE_KEY = 'random_message';
  const TIMESTAMP_KEY = 'message_timestamp';
  
  const getRandomMessage = () => {
    const lastTimestamp = localStorage.getItem(TIMESTAMP_KEY);
    let storedMessage = localStorage.getItem(MESSAGE_KEY);
    
    if (!lastTimestamp || !storedMessage || (Date.now() - parseInt(lastTimestamp)) >= 24 * 60 * 60 * 1000) {
      const randomIndex = Math.floor(Math.random() * message.length);
      storedMessage = message[randomIndex];
      localStorage.setItem(MESSAGE_KEY, storedMessage);
      localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
    }
    
    return storedMessage;
  };
  
  export default getRandomMessage;