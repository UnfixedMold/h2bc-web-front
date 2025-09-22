import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

// Shared style for both input and textarea
const baseClass =
  'block w-full max-w-none border border-black px-3 py-2 h-10 focus:outline-none focus:ring-0';

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`${baseClass} ${className}`.trim()}
      {...props}
    />
  )
);
TextInput.displayName = 'TextInput';

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', rows = 6, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={`${baseClass} ${className}`.trim()}
      {...props}
    />
  )
);
TextArea.displayName = 'TextArea';
