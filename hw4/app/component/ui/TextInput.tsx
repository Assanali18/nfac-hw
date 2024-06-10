import React from 'react';

interface TextInputProps {
    label: string;
    placeholder: string;
    value: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={placeholder}
        />
    </div>
);

export default TextInput;
