// src/components/wrapper.tsx
'use client'
import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export default function Wrapper({ children, className = '' }: WrapperProps) {
  return (
    <div className={`wrapper ${className}`}>
      {children}
    </div>
  );
}