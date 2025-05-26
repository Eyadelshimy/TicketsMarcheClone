import React, { useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/scrollWrapper.css";

const HorizontalScroller = ({ title, items }) => {
  const styles = {
    scrollContainer: {
      WebkitOverflowScrolling: "touch", // Note camelCase
      scrollbarWidth: "none", // Firefox
      scrollBehavior: "smooth",
      msOverflowStyle: "none", // IE/Edge
      overflowX: "auto", // Ensure horizontal scrolling
      display: "flex",
      flexWrap: "nowrap",
      // For Webkit browsers (Chrome/Safari)
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    scrollItem: {
      minWidth: "150px", // Adjust as needed
      flex: "0 0 auto",
      marginLeft: "0.5rem", // mx-2 equivalent (Bootstrap's 0.5rem)
      marginRight: "0.5rem",
    },
    scrollButton: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    console.log("left");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -500, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    console.log("rugit");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 500, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  return (
    <Container className="my-4">
      <div className="mt-5 d-flex justify-content-between align-items-center mb-4">
        <h2>{title}</h2>
        <div className="carousel-navigation">
          <button
            onClick={scrollLeft}
            className="scroll-button"
            aria-label="Previous"
          >
            <FaArrowLeft size={24} />
          </button>
          <button
            className="scroll-button"
            aria-label="Next"
            onClick={scrollRight}
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      </div>
      <Row className="align-items-center">
        <Col>
          <div
            ref={scrollContainerRef}
            className="d-flex flex-nowrap overflow-hidden"
          >
            {items.map((item, index) => (
              <div key={index} style={styles.scrollItem} className="mx-2 p-3">
                {item}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HorizontalScroller;
