import React, { useState, useEffect } from 'react';
import image from '../../assets/elephant_drinking_milk.png';

const OurMission = () => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const fullText = `Our zoo was founded in 1956. Its founder was Michael M. Stokes, animal behaviorist and veterinarian.
    Stockes took an active part in volunteering to protect and care for wild animals. In 1938, he founded the "Save Wildlife"
    foundation to raise awareness of how many animals are dying due to climate change, hunting and inadequate care.
    The foundation quickly became a thriving business, thanks to which it had adequate funds to build a zoo for wild animals
    that need constant care and would have no chance of surviving in the wild. Our mission is to educate new generations about
    how important it is to care for the environment and animals, and to save endangered animals. Thanks to the foundation and
    the great group that supports us, we have the chance to save hundreds of thousands of animals a year.`;

  const firstSentence = `Our zoo was founded in 1956. Its founder was Michael M. Stokes, animal behaviorist and veterinarian.
  Stockes took an active part in volunteering to protect and care for wild animals. In 1938, he founded the "Save Wildlife"
  foundation to raise awareness of how many animals are dying due to climate change, hunting and inadequate care.
  The foundation quickly became a thriving business, thanks to which it had ...`;
  const toggleText = () => {
    setIsTextExpanded(!isTextExpanded);
  };

  useEffect(() => {
    const checkViewportWidth = () => {
      setIsMobileOrTablet(window.innerWidth <= 720);
    };

    checkViewportWidth();
    window.addEventListener('resize', checkViewportWidth);

    return () => {
      window.removeEventListener('resize', checkViewportWidth);
    };
  }, []);

  return (
    <div className="our_mission">
      <div className="our_mission-wrapper">
        <div className="our_mission-image">
          <img src={image} alt="elephant image" />
        </div>
        <div className="our_mission-content">
          <div className="our_mission-content-title">Our mission</div>
          <div className="our_mission-content-text">
            <article>
              {isMobileOrTablet && !isTextExpanded ? firstSentence : fullText}
            </article>
            {isMobileOrTablet && (
              <button className='expand-button' onClick={toggleText}>
                {isTextExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
            <span>Learn more about the foundation and help us save animal's lives</span>
          </div>
          <div className="our_mission-content-button">
            <label htmlFor="learn-more" className="__orange-button-label">
              <button name="learn-more"> Learn more </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
