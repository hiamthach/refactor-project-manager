import React from 'react';

import LogoDark from 'content/assets/img/logo-dark.png';
import LogoLight from 'content/assets/img/logo-light.png';
import LogoSmall from 'content/assets/img/favicon.ico';

const Logo = ({ theme, size }) => {
  return (
    <div className="p-2 w-full">
      {size === 'small' ? (
        <img src={LogoSmall} alt="logo" />
      ) : (
        <img src={theme === 'dark' ? LogoDark : LogoLight} alt="Logo" />
      )}
    </div>
  );
};

export default Logo;
