const Input = ({
  size = 'large',
  type = 'text',
  required = false,
  value,
  onChange,
  onBlur,
  placeholder = '',
  name,
  className = '',
  validate,
  error,
  setError,
  ...props
}) => {
  // Проверка обязательных пропсов
  if (!onChange) {
    throw new Error('Пропс onChange является обязательным для компонента Input');
  }

  // Размеры инпута
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  // Базовые стили
  const baseClasses = 'w-full text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200 m-2';
  
  // Стили для состояния ошибки
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';

  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${errorClasses}
    ${className}
  `.trim();

  return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={error || placeholder}
        name={name}
        className={`${inputClasses} ${error ? 'placeholder-red-500' : ''}`}
        required={required}
        {...props}
      />
  );
};

export default Input;
