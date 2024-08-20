import React from 'react';

import ButtonLoader from '../buttonLoader/Loader';


const Button = ({
  className,
  disabled,
  buttonText,
  title,
  onClick,
  // icon,
  loader,
  isSubmit,
  ...props
}) => {
  // Ensure type is a valid button type with a default fallback

  return (
    <button
      title={title}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
      type={isSubmit ? 'submit' : 'button'}
    >
      {/* {icon && icon} */}
      <div className="flex justify-center">
        {buttonText} {loader && <ButtonLoader />}
      </div>
    </button>
  );
};

export default Button;
