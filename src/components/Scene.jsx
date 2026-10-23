import React from 'react';
import { WeddoLandingPage } from "../shaders/landing-pages/WeddoLandingPage";
import "../shaders/threeui.css";

export function Scene({ lang = 'en' }) {
  return (
    <div className="shader-frame relative w-full h-[88vh] min-h-[700px] rounded-2xl overflow-hidden border border-[#27211b] shadow-2xl">
      <WeddoLandingPage
        primaryColor="#D4AF37"
        secondaryColor="#E8C5B8"
        headingFont={lang === 'ar' ? 'Cairo' : 'Playfair Display'}
        bodyFont={lang === 'ar' ? 'Cairo' : 'Plus Jakarta Sans'}
        headingWeight="400"
        bodyWeight="300"
        headingSize={48}
        bodySize={16}
        headingLetterSpacing={lang === 'ar' ? 0 : -0.015}
      />
    </div>
  );
}

export default Scene;
