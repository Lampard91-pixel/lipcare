"use client";

interface CurvedDividerProps {
  color: string;
}

export default function CurvedDivider({ color }: CurvedDividerProps) {
  return (
    <div className={`leading-[0] ${color}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] sm:h-[100px]">
        <path d="M1200 120L0 120 0 0 1200 0 1200 120z" className="fill-current text-white"></path>
      </svg>
    </div>
  );
}