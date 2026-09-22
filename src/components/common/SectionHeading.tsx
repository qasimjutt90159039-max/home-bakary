import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  action?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = false,
  action
}) => {
  return (
    <div className={`mb-10 sm:mb-12 ${centered ? 'text-center' : 'flex flex-col md:flex-row md:items-end md:justify-between gap-4'}`}>
      <div className={centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}>
        {badge && (
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#F3ECE2] px-3 py-1 rounded-full mb-3 border border-[#EBDCCB]">
            {badge}
          </span>
        )}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1A11] tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#725E52] mt-3 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && !centered && (
        <div className="shrink-0">{action}</div>
      )}
    </div>
  );
};
