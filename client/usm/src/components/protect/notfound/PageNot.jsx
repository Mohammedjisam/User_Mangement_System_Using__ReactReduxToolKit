
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./pagenot.css";

const PageNot = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="notfound-page">
      <div className="notfound-sidebar">
        <h2>Oops!</h2>
        <p>The page you're looking for doesn't exist.</p>
      </div>
      <div className="notfound-container">
        <div className="notfound-box">
          <h2>Page Not Found</h2>
          <p>It seems that you have reached a broken link.</p>
          <button className="notfound-btn" onClick={handleGoBack}>
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNot;
