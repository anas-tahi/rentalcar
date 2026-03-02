import React from "react";
import classNames from "classnames";

export const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="#596780"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 22L20 20"
      stroke="#596780"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FilterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 6.5H16"
      stroke="#596780"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6.5H2"
      stroke="#596780"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
      stroke="#596780"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 17.5H18"
      stroke="#596780"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 17.5H2"
      stroke="#596780"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
      stroke="#596780"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SettingsIcon = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.1 19.2201C28.29 19.2201 27.55 17.9401 28.45 16.3701C28.97 15.4601 28.66 14.3001 27.75 13.7801L26.02 12.7901C25.23 12.3201 24.21 12.6001 23.74 13.3901L23.63 13.5801C22.73 15.1501 21.25 15.1501 20.34 13.5801L20.23 13.3901C19.78 12.6001 18.76 12.3201 17.97 12.7901L16.24 13.7801C15.33 14.3001 15.02 15.4701 15.54 16.3801C16.45 17.9401 15.71 19.2201 13.9 19.2201C12.86 

      19.2201 11.87 11.87 12.86 11.87 13.9C11.87 15.73 10.59 16.4701 9.02 15.5701C8.11 15.0501 6.94 15.3601 6.42 16.2701L5.43 17.9901C4.96 18.7801 5.24 19.8001 6.03 20.2701L6.22 20.3801C7.79 21.2901 7.79 22.7701 6.22 23.6801L6.03 23.7901C5.24 24.2601 4.96 25.2801 5.43 26.0701L6.42 27.7901C6.94 28.7001 8.11 29.0101 9.02 28.4901C10.59 27.5901 11.87 28.3301 11.87 30.1601C11.87 31.2001 12.86 32.5401 13.9 32.5401C15.71 32.5401 16.45 33.8201 15.54 35.3801C15.02 36.2901 15.33 37.4501 16.24 37.9701L17.97 38.9601C18.76 39.4301 19.78 39.1501 20.23 38.3601L20.34 38.1701C21.25 36.6001 22.73 36.6001 23.63 38.1701L23.74 38.3601C24.21 39.1501 25.23 39.4301 26.02 38.9601L27.75 37.9701C28.66 37.4501 28.97 36.2801 28.45 35.3801C27.55 33.8201 28.29 32.5401 30.1 32.5401C31.14 32.5401 32.13 31.2001 32.13 30.1601C32.13 28.3301 33.41 27.5901 34.98 28.4901C35.89 29.0101 37.06 28.7001 37.58 27.7901L38.57 26.0701C39.04 25.2801 38.76 24.2601 37.97 23.7901L37.78 23.6801C36.21 22.7701 36.21 21.2901 37.78 20.3801L37.97 20.2701C38.76 19.8001 39.04 18.7801 38.57 17.9901L37.58 16.2701C37.06 15.3601 35.89 15.0501 34.98 15.5701C33.41 16.4701 32.13 15.7301 32.13 13.9001C32.13 12.8601 31.14 11.5201 30.1 11.5201H30.1Z"
      fill="#596780"
      />
      </svg>
      );
      
      export const Dropdown = ({ options, selectedOption, onOptionSelect }) => (
      
        <div className="dropdown">
          <select
            value={selectedOption}
            onChange={(e) => onOptionSelect(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="dropdown-icon">&#9662;</span>
        </div>
      );
      export const Button = ({ onClick, children, className }) => (
      <button className={classNames("button", className)} onClick={onClick}>
      {children}
      </button>
      );
      
      export const Input = ({ type, placeholder, onChange, value }) => (
      <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="input"
      />
      );