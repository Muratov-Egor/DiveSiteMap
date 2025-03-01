"use client";

import { useState } from 'react';

const Chips = ({
  items = [],
  selectedItems = [],
  onChange,
  className = '',
  ...props
}) => {
  if (!items || !onChange) {
    throw new Error('Пропсы items и onChange являются обязательными для компонента Chips');
  }

  const [selected, setSelected] = useState(selectedItems);

  const handleSelect = (item) => {
    let newSelected;
    if (selected.includes(item)) {
      newSelected = selected.filter(i => i !== item);
    } else {
      newSelected = [item, ...selected];
    }
    setSelected(newSelected);
    onChange(newSelected);
  };

  const baseClasses = 'inline-flex flex-wrap gap-2 m-2';
  
  const chipClasses = `
    px-4 py-2 rounded-full font-medium text-base
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-amber-500
    cursor-pointer
  `.trim();

  const activeChipClasses = `
    bg-amber-600 text-white border border-gray-300
    hover:bg-amber-600
  `.trim();

  const inactiveChipClasses = `
    bg-white text-black border border-gray-300
    hover:bg-gray-200
  `.trim();

  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleSelect(item)}
          className={`
            ${chipClasses}
            ${selected.includes(item) ? activeChipClasses : inactiveChipClasses}
          `.trim()}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Chips;
