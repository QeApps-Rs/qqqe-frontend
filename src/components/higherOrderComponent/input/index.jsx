import React, { Ref, forwardRef } from 'react';

// const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
const Input = forwardRef(
  (props, ref) => {
    const {
      type,
      name,
      id,
      maxLength,
      autoComplete,
      className,
      placeholder,
      disabled,
      value,
      checked,
      onChange,
    } = props;
    return (
      <input
        type={type}
        name={name}
        id={id}
        ref={ref}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={className || 'form-control'}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-invalid="false"
      />
    );
  }
);

export default Input;
