import React, { useState, useEffect, useCallback } from 'react';
import { Carousel, CarouselItem } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import "../css/carousel.css";

const Slides = ({ images, interval = 3500 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const value = 100 / images.length;  // Define value as a percentage of 100
  const { pathname } = useLocation(); // Get the current path from react-router-dom

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (autoPlay && pathname === "/") { // Check if on main page
        nextSlide();
      }
    }, interval);

    return () => clearInterval(slideInterval);
  }, [autoPlay, interval, nextSlide, pathname]);

  return (
    <>
      {pathname === "/" && ( // Only render the carousel on the main page
        <div style={{ 
          position: 'static', 
          bottom: 0,
          
          zIndex: 1
        }}
        >
          <Carousel
            activeIndex={activeIndex}
            interval={interval}
            controls={false}
            indicators={false}
            nextLabel={<span aria-hidden="true">&rsaquo;</span>}
            prevLabel={<span aria-hidden="true">&lsaquo;</span>}
            role="presentation"
            wrap={true}
          >
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                role="listitem"
              >
                <img className="carousel" src={image} alt={`Slide ${index+1}`} />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Slides;

