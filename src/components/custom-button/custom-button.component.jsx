import React from 'react';

import './custom-button.style.scss';

const CustomButton = ({ children, isGoogleButton, ...otherProps }) => {

    return(
        <button className={`custom-button ${isGoogleButton ? 'isGooglebutton' : ''}`} {...otherProps}>
            {children}
        </button>
    )

}

export default CustomButton;