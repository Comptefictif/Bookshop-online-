import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NewsBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredBooks = [
    {
      title: "The Wheel of Time",
      description: "Embark on an epic journey in this masterpiece of fantasy literature",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
    },
    {
      title: "Control Your Mind",
      description: "Discover the secrets to mastering your mental state",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"
    },
    {
      title: "The Art of War",
      description: "Ancient wisdom for modern strategy",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredBooks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredBooks.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden">
      <div className="relative">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredBooks.map((book, index) => (
            <div key={index} className="w-full flex-none md:w-full p-6">
              <div className="flex items-center justify-center space-x-6">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-32 h-40 object-cover rounded-lg shadow-lg"
                />
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                  <p className="text-blue-100">{book.description}</p>
                  <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredBooks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsBar;