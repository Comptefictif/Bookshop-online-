import React from 'react';
import { BookOpen } from 'lucide-react';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  cover: string;
  status: 'available' | 'unavailable' | 'checked';
  pdfUrl: string;
}

const BookCard = ({ id, title, author, cover, status, pdfUrl }: BookCardProps) => {
  const trackUserAction = (action: string) => {
    const userActions = JSON.parse(localStorage.getItem('userActions') || '[]');
    userActions.push({
      action,
      bookId: id,
      bookTitle: title,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('userActions', JSON.stringify(userActions));
  };

  const handleReadBook = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Track reading activity
      const readingHistory = JSON.parse(localStorage.getItem('readingHistory') || '[]');
      const newActivity = {
        id: Date.now(),
        type: 'read',
        bookId: id,
        bookTitle: title,
        bookAuthor: author,
        timestamp: new Date().toISOString(),
      };
      readingHistory.push(newActivity);
      localStorage.setItem('readingHistory', JSON.stringify(readingHistory));

      // Update currently reading list
      const currentlyReading = JSON.parse(localStorage.getItem('currentlyReading') || '[]');
      if (!currentlyReading.some((book: { id: number }) => book.id === id)) {
        currentlyReading.push({
          id,
          title,
          author,
          cover,
          startDate: new Date().toISOString(),
        });
        localStorage.setItem('currentlyReading', JSON.stringify(currentlyReading));
      }

      trackUserAction('read_book');
    }

    // Construct direct PDF URL
    const directPdfUrl = `${pdfUrl}/page/n0/mode/2up`;
    window.open(directPdfUrl, '_blank');
  };

  const handleAddToWishlist = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (!wishlist.some((book: { id: number }) => book.id === id)) {
        wishlist.push({
          id,
          title,
          author,
          cover,
          addedDate: new Date().toISOString(),
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        trackUserAction('add_to_wishlist');
      }
    }
  };

  const getStatusButton = () => {
    switch (status) {
      case 'available':
        return (
          <div className="space-y-2">
            <button 
              onClick={handleReadBook}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 zoom-effect"
            >
              <BookOpen className="h-4 w-4" />
              <span>Read Now</span>
            </button>
            <button
              onClick={handleAddToWishlist}
              className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Add to Wishlist
            </button>
          </div>
        );
      case 'unavailable':
        return (
          <button disabled className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
            Not Available
          </button>
        );
      case 'checked':
        return (
          <button disabled className="w-full bg-green-600 text-white px-4 py-2 rounded-lg cursor-not-allowed">
            Checked Out
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden zoom-effect dark:bg-gray-800">
      <img
        src={cover}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">{author}</p>
        {getStatusButton()}
      </div>
    </div>
  );
};

export default BookCard;