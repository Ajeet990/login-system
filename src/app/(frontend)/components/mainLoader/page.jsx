import React from 'react';
import '@/app/css/mainLoader.css'


const MainLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
    </div>
  );
};

export default MainLoader;