import React, { useState } from 'react';
import AboutButton from '../../../components/buttons/AboutButton';
import AddNoticeButton from '../../../components/buttons/AddNoticeButton';
import UserProfileButton from '../../../components/buttons/UserProfileButton';

const OptionsIcon = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = () => setIsMenuOpen(prevState => !prevState);
  return (
    <div className="optionsIcon__wrapper">
      <button className="optionsIcon" onClick={handleClick}>
        <div className="optionsIcon__dot"></div>
        <div className="optionsIcon__dot"></div>
        <div className="optionsIcon__dot"></div>
      </button>
      <div onClick={handleClick} className={`optionsIcon__options ${isMenuOpen ? 'opened' : 'closed'}`}>
        <button className="icon">
          <UserProfileButton />
        </button>
        <button className="icon">
          <AddNoticeButton />
        </button>
        <button className="icon">
          <AboutButton />
        </button>
      </div>
    </div>
  );
};

export default OptionsIcon;
