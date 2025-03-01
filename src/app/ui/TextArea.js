const TextArea = ({
  size = 'large',
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
  rows = 4,
  ...props
}) => {
  // Проверка обязательных пропсов
  if (!onChange) {
    throw new Error('Пропс onChange является обязательным для компонента TextArea');
  }

  // Размеры текстового поля
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base', 
    large: 'px-6 py-3 text-lg'
  };

  // Базовые стили
  const baseClasses = 'w-full text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200 m-2 resize-y';
  
  // Стили для состояния ошибки
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';

  const textAreaClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${errorClasses}
    ${className}
  `.trim();

  // Обработчик потери фокуса
  const handleBlur = (e) => {
    // Валидация для обязательных полей
    if (required && !e.target.value) {
      setError('Это поле обязательно для заполнения');
    }
    // Пользовательская валидация если передана
    else if (validate) {
      const validationError = validate(e.target.value);
      if (validationError) {
        setError(validationError);
      } else {
        setError('');
      }
    }

    // Вызов пользовательского обработчика
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <textarea
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      placeholder={error || placeholder}
      name={name}
      className={`${textAreaClasses} ${error ? 'placeholder-red-500' : ''}`}
      required={required}
      rows={rows}
      {...props}
    />
  );
};

export default TextArea;
