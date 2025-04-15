import React from 'react';
import { Book, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const handleMyBooksClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.openMyBooks) {
      window.openMyBooks();
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Book className="h-6 w-6" />
              <span className="text-lg font-bold">NCC Library Online</span>
            </div>
            <p className="text-gray-400">
              Your gateway to knowledge and discovery.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  onClick={handleMyBooksClick}
                  className="text-gray-400 hover:text-white"
                >
                  My Books
                </a>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white">Browse</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Collections</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NCC Library Online. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Add the global window type declaration
declare global {
  interface Window {
    openMyBooks: () => void;
  }
}

export default Footer;