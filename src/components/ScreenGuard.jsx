import { useState, useEffect } from 'react';

export default function ScreenGuard({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent any hydration/rendering mismatch.
  // The website is now allowed to work on every screen size.
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FEF6E9] text-[#5A3A2B]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF6E9] text-[#5A3A2B]">
      {children}
    </div>
  );
}