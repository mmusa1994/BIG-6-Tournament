import React from 'react';
import { IButton } from '../../types/types';

const Button: React.FC<IButton> = ({
  disabled,
  onClick,
  text,
  type,
  size,
  icon,
  sizeH,
  position = 'center',
  variant = 'primary',
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{ width: size, height: sizeH }}
      className={`relative h-12 font-inter bg-primary rounded select-none text-white cursor-pointer disabled:pointer-events-none disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed pl-5 pr-5
      
      ${
        variant === 'primary' &&
        `bg-green-600  active:bg-bg-indigo-900  hover:bg-green-800 `
      } ${
        variant === 'secondary' &&
        'bg-transparent border-solid border border-gray-500 hover:bg-transparent active:bg-transparent hover:opacity-75 hover:bg-gray-500'
      }
      ${
        variant === 'text' &&
        'bg-transparent hover:bg-transparent active:bg-transparent hover:opacity-75 pr-0'
      }
      ${
        variant === 'delete' &&
        'bg-red-700 active:bg-red-900 hover:bg-red-900 hover:opacity-75'
      }
      `}
    >
      <div
        className={`flex items-center 
      ${position === 'center' && 'justify-center'}
      ${position === 'left' && 'justify-start'}
      ${position === 'right' && 'justify-end'}`}
      >
        {icon && <div className="mr-3">{icon}</div>}
        <p> {text}</p>
      </div>
    </button>
  );
};

export default Button;
