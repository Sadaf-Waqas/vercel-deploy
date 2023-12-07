'use client';

import { useState } from 'react';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({ label, checked, handleChange}: CheckboxProps) {

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="form-checkbox h-4 w-4 text-primary focus:ring-primary"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}