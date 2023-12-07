'use client';

import { useState } from 'react';

interface RadioButtonProps {
  label?: string;
  checked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioButton({ label, checked, handleChange }: RadioButtonProps) {

  return (
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        checked={checked}
        onChange={handleChange}
        className="form-radio h-4 w-4 text-primary focus:ring-primary"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}