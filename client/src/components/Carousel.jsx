import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardImg, CardBody, CardTitle, Container, Col, Row } from 'reactstrap';
import { Carousel, CarouselItem } from "react-bootstrap";
import "../css/carousel.css";

const Slides = ({ images, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (autoPlay) {
        nextSlide();
      }
    }, interval);

    return () => clearInterval(slideInterval);
  }, [autoPlay, interval, nextSlide]);

  return (
    <Container>
      <Row className="justify-content-md-center" style={{ flexWrap: "wrap" }}>
        <Col xs={12} md={6}>
          <Card>
            <Carousel
              activeIndex={activeIndex}
              interval={interval}
              controls={false}
              indicators={true}
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
                  <CardImg top src={image} alt={`Slide ${index+1} image of ${images.length}`} />
                  <CardBody>
                    <CardTitle tag="h4">Slide {index+1} of {images.length}</CardTitle>
                  </CardBody>
                </CarouselItem>
              ))}
            </Carousel>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Slides;

