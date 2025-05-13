import React from 'react';
import './TourOffer.css';

const TourOffer = () => {
    
      const tours = [
        { title: 'Kashmir Tour', packages: '5 Tour Packages', image: 'kashmir.jpg' },
        { title: 'Ladakh Tour', packages: '4 Tour Packages', image: 'ladakh.jpg' },
        { title: 'Darjeeling Tour', packages: '6 Tour Packages', image: 'darjeeling.jpg' },
        { title: 'Andaman Tour', packages: '4 Tour Packages', image: 'andaman.jpg' },
        { title: 'Rajasthan Tour', packages: '5 Tour Packages', image: 'rajasthan.jpg' },
        { title: 'Kerala Tour', packages: '6 Tour Packages', image: 'kerala.jpg' },
      ];
    
      return (
        <div className="tour-packages">
          <div className="exclusive-tour">
            <h2>Exclusive Tour</h2>
            <p>20% OFF</p>
            <button>BOOK NOW</button>
          </div>
          <div className="tour-grid">
            {tours.map((tour, index) => (
              <div key={index} className="tour-card" style={{ backgroundImage: `url(${tour.image})` }}>
                <div className="tour-overlay">
                  <h3>{tour.title}</h3>
                  <p>{tour.packages}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
  

export default TourOffer;