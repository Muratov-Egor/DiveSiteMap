"use client";

import { useState, useRef, useEffect } from 'react';
import useCountries from '../../hooks/useCountries';

const DropDown = ({
  items = [],
  selectedItems = [],
  onChange,
  placeholder = 'Выберите элемент',
  className = '',
  renderItem = (item) => item,
  ...props
}) => {
  if (!items || !onChange) {
    throw new Error('Пропсы items и onChange являются обязательными для компонента DropDown');
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedItems);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    const newSelected = [item];
    setIsOpen(false);
    setSelected(newSelected);
    onChange(newSelected[0]);
  };

  const baseClasses = 'relative w-full m-2';
  const buttonClasses = `
    w-full px-6 py-3 text-left bg-white border rounded-lg border-gray-300
    focus:outline-none focus:ring-2 focus:ring-amber-500
    hover:bg-gray-50 transition-colors duration-200
    text-black text-lg
  `.trim();
  
  const dropdownClasses = `
    absolute w-full mt-1 bg-white border rounded-lg shadow-lg 
    max-h-60 overflow-y-auto z-50
    text-black text-lg
  `.trim();

  const itemClasses = `
    px-6 py-3 hover:bg-amber-100 cursor-pointer
    transition-colors duration-200
    text-black text-lg
  `.trim();

  return (
    <div className={`${baseClasses} ${className}`} ref={dropdownRef} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClasses} flex justify-between items-center`}
      >
        <span className={`${selected.length === 0 ? 'text-gray-400' : ''}`}>
          {selected.length > 0 ? renderItem(selected[0]) : placeholder}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={dropdownClasses}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`
                ${itemClasses}
                ${selected.includes(item) ? 'bg-amber-50' : ''}
              `.trim()}
              onClick={() => handleSelect(item)}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
