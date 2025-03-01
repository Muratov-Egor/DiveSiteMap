"use client";

import { useState, useRef, useEffect } from 'react';

const SearchableDropDown = ({
  items = [],
  onChange,
  placeholder = 'Выберите элемент',
  className = '',
  renderItem = (item) => item, // Функция для отображения элемента
  required = false, // Новый проп для обязательности
  error = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
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
    setSelected(item);
    setSearchTerm(renderItem(item));
    setIsOpen(false);
    onChange(item);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelected(null);
    onChange(null);
  };



  const filteredItems = items.filter(item =>
    renderItem(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative w-full m-2 ${className}`} ref={dropdownRef} {...props}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          
          placeholder={error || placeholder}
          className={`w-full px-6 py-3 text-left bg-white border rounded-lg ${error ? 'border-red-500 placeholder-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 hover:bg-gray-50 transition-colors duration-200 text-black text-lg`}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute text-3xl right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            &times;
          </button>
        )}
      </div>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 text-black text-lg">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className={`px-6 py-3 hover:bg-amber-100 cursor-pointer transition-colors duration-200 ${selected === item ? 'bg-amber-50' : ''}`}
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

export default SearchableDropDown;
