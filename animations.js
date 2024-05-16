import React, { useEffect, useState } from 'react';
import './MonComposant.css';

const MonComposant = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Adjust the threshold according to your needs
      if (scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`card-container ${isVisible ? 'visible' : ''}`}>
      <div className="card left">Card from left</div>
      <div className="card right">Card from right</div>
    </div>
  );
};

export default MonComposant;


.card-container {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .card-container.visible {
    opacity: 1;
  }
  
  .card {
    width: 200px;
    height: 150px;
    margin: 20px;
    background-color: #ccc;
    display: inline-block;
    transition: transform 0.5s ease;
  }
  
  .card.left {
    transform: translateX(-100%);
  }
  
  .card.right {
    transform: translateX(100%);
  }
  
  .card-container.visible .card {
    transform: translateX(0);
  }
  