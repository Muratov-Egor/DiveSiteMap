const Button = ({ 
  size = 'large',
  text, 
  onClick, 
  color = 'default',
  className = '',
  type = 'button',
  ...props 
}) => {
  if (!text || !onClick) {
    throw new Error('Пропсы text и onClick являются обязательными для компонента Button');
  }

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    red: 'bg-red-500 hover:bg-red-600', 
    green: 'bg-green-500 hover:bg-green-600',
    gray: 'bg-gray-500 hover:bg-gray-600',
    default: 'bg-amber-700 hover:bg-amber-800'
  };

  const baseClasses = 'text-white transition-colors duration-200 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 m-2';

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${colorClasses[color]}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClasses}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
