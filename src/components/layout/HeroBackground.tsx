import React from "react";

interface HeroBackgroundProps {
  imageUrl: string;
  altText: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ imageUrl, altText }) => {
  return (
    <>
      <div className="absolute inset-0">
        <img src={imageUrl} alt={altText} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      <div className="absolute inset-0 neural-grid opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
    </>
  );
};

export default HeroBackground;
