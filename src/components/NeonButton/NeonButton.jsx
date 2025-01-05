import React from 'react';
import './NeonButton.css';

const NeonButton = ({ children, href }) => {
  return (
    <div className="styled-wrapper">
      <a href={href}>
        <span className="text">{children}</span>
      </a>
    </div>
  );
}

export default NeonButton;
