import React from 'react';

// FIX: Added optional title and icon props to CardProps to support cards with headers.
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
  return (
    <div className={`bg-slate-800/50 rounded-xl shadow-lg overflow-hidden border border-slate-700 ${className}`}>
      {/* FIX: Render a header section if a title is provided. */}
      {title && (
         <div className="p-6 md:p-8 border-b border-slate-700 flex items-center gap-4">
          {icon && <div className="text-cyan-400">{icon}</div>}
          <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
        </div>
      )}
      <div className="p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default Card;
