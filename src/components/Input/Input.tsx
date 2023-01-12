import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import './input.css';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  firstAction?: JSX.Element | null;
  label?: string;
  secondAction?: JSX.Element | null;
  icon?: JSX.Element;
  searchIcon?: boolean;
  inputRef?: React.Ref<any>;
  containerClasses?: string;
  inputWrapperStyle?: string;
  width?: string;
}
const Input: React.FC<InputProps> = ({
  errorMessage,
  firstAction,
  label,
  secondAction,
  searchIcon,
  icon,
  inputRef,
  containerClasses,
  inputWrapperStyle,
  width,
  ...restProps
}) => {
  const inputStyle = `${
    errorMessage
      ? 'text-red-500 placeholder-error border border-red-500 border-solid relative text-red-500 '
      : 'relative border-gray-700 placeholder-gray-400 border-gray-700 border rounded border-solid text-white'
  } text-base h-12 font-inter disabled:text-gray-500 hover:border-primary border-solid rounded h-12 text-white accent-transparent  flex items-center justify-center ${
    restProps.disabled
      ? 'bg-gray-900 hover:border-gray-700 cursor-not-allowed'
      : 'bg-gray-800'
  }`;

  return (
    <div
      style={{ width: width }}
      className={`flex flex-col w-full ${containerClasses}`}
    >
      <div className="flex justify-between items-center">
        {label ? (
          <label
            className={`not-italic font-medium text-base leading-6 font-inter text-white mb-2 ${
              restProps.disabled ? 'text-gray-500' : ''
            }`}
          >
            {label}
          </label>
        ) : null}
        <div className="flex items-center">
          {firstAction}
          <div className="ml-2">{secondAction}</div>
        </div>
      </div>
      <div className={`${inputStyle} ${inputWrapperStyle}`}>
        <div className="pl-3 pr-2">
          {searchIcon && <MagnifyingGlassIcon className="w-4 h-4" />}
        </div>

        <input
          className="text-center w-full h-full bg-transparent outline-0 pr-2 disabled:cursor-not-allowed placeholder-base disabled:bg-gray-900 text-sm disabled:placeholder-gray-500"
          {...restProps}
          ref={inputRef}
        />
        {icon && <div className="pl-4 pr-4">{icon}</div>}
      </div>

      {errorMessage && (
        <p className="text-center bg-red-500  text-white mt-1 rounded-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default React.forwardRef((props: InputProps, ref) => (
  <Input {...props} />
));
