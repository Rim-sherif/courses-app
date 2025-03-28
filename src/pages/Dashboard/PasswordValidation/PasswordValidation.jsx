import React from 'react';

const PasswordValidation = ({ password, isVisible }) => {
  if (!isVisible) return null;

  const validations = {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password),
  };

  return (
    <div className="mt-2 p-3 border rounded-lg bg-gray-50 animate-fade-in">
      <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
      <ul className="space-y-1">
        <ValidationItem 
          isValid={validations.minLength} 
          text="At least 8 characters" 
        />
        <ValidationItem 
          isValid={validations.hasNumber} 
          text="Contains at least one number" 
        />
        <ValidationItem 
          isValid={validations.hasUppercase} 
          text="Contains at least one uppercase letter" 
        />
      </ul>
    </div>
  );
};

const ValidationItem = ({ isValid, text }) => (
  <li className={`flex items-center ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
    {isValid ? (
      <CheckIcon />
    ) : (
      <CircleIcon />
    )}
    <span className="ml-2">{text}</span>
  </li>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const CircleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
  </svg>
);

export default PasswordValidation;