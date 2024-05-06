import React, { useState } from "react";
import { Col } from "react-bootstrap";

export const HomeCard = ({ title, description, imgUrl }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  return (
    <Col size={12} sm={6} md={4}>
      <div
        className="proj-imgbx"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={imgUrl} alt={title} />
        {showDescription && (
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        )}
      </div>
    </Col>
  );
};
