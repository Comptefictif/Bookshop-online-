import React, { useState, useEffect } from 'react';
import { Book, Menu, Search, User, ChevronDown, X, Mail, Lock, BookOpen, BookMarked, History, List, Sun, Moon } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isMyBooksOpen, setIsMyBooksOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [currentUser, setCurrentUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);
  const [readingStats, setReadingStats] = useState({
    currentlyReading: 0,
    wantToRead: 0,
    alreadyRead: 0,
    notes: 0,
    reviews: 0,
    totalActions: 0
  });

  React.useEffect(() => {
    window.openMyBooks = () => setIsMyBooksOpen(true);
  }, []);

  useEffect(() => {
    // Check for user data in localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
      updateReadingStats();
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const trackUserAction = (action: string) => {
    const userActions = JSON.parse(localStorage.getItem('userActions') || '[]');
    userActions.push({
      action,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('userActions', JSON.stringify(userActions));
    updateReadingStats();
  };

  const updateReadingStats = () => {
    const currentlyReading = JSON.parse(localStorage.getItem('currentlyReading') || '[]');
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const readingHistory = JSON.parse(localStorage.getItem('readingHistory') || '[]');
    const notes = JSON.parse(localStorage.getItem('bookNotes') || '[]');
    const reviews = JSON.parse(localStorage.getItem('bookReviews') || '[]');
    const userActions = JSON.parse(localStorage.getItem('userActions') || '[]');

    setReadingStats({
      currentlyReading: currentlyReading.length,
      wantToRead: wishlist.length,
      alreadyRead: readingHistory.length,
      notes: notes.length,
      reviews: reviews.length,
      totalActions: userActions.length
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    trackUserAction('toggle_theme');
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('signUpEmail') as string,
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    // Initialize user's reading data
    localStorage.setItem('currentlyReading', '[]');
    localStorage.setItem('wishlist', '[]');
    localStorage.setItem('readingHistory', '[]');
    localStorage.setItem('bookNotes', '[]');
    localStorage.setItem('bookReviews', '[]');
    localStorage.setItem('userActions', '[]');
    
    setCurrentUser(userData);
    setIsSignUpOpen(false);
    trackUserAction('user_signup');
    updateReadingStats();
  };

  const handleSignOut = () => {
    trackUserAction('user_signout');
    localStorage.removeItem('userData');
    setCurrentUser(null);
    setReadingStats({
      currentlyReading: 0,
      wantToRead: 0,
      alreadyRead: 0,
      notes: 0,
      reviews: 0,
      totalActions: 0
    });
  };

  const handleBrowseBooks = () => {
    trackUserAction('browse_books');
    window.location.href = '/';
  };

  const browseItems = [
    {
      title: 'Categories',
      href: '#',
      onClick: () => {
        setIsBrowseOpen(false);
        trackUserAction('browse_categories');
        window.location.href = '/';
      }
    },
    {
      title: 'New Releases',
      href: '#',
      onClick: () => {
        setIsBrowseOpen(false);
        trackUserAction('browse_new_releases');
        window.location.href = '/';
      }
    },
    {
      title: 'Popular',
      href: '#',
      onClick: () => {
        setIsBrowseOpen(false);
        trackUserAction('browse_popular');
        window.location.href = '/';
      }
    }
  ];

  const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-4xl w-full relative dark:bg-gray-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
          {children}
        </div>
      </div>
    );
  };

  const MyBooksModal = () => {
    const [activeTab, setActiveTab] = useState('reading');
    const [currentlyReading, setCurrentlyReading] = useState<any[]>([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [readingHistory, setReadingHistory] = useState<any[]>([]);

    useEffect(() => {
      if (isMyBooksOpen) {
        setCurrentlyReading(JSON.parse(localStorage.getItem('currentlyReading') || '[]'));
        setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]'));
        setReadingHistory(JSON.parse(localStorage.getItem('readingHistory') || '[]'));
      }
    }, [isMyBooksOpen]);

    const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ElementType }) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          activeTab === id
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </button>
    );

    const renderBookList = (books: any[]) => {
      if (books.length === 0) {
        return (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No books in this list</h3>
            <p className="text-gray-600 mb-4">Start your reading journey by browsing our collection</p>
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleBrowseBooks}
            >
              Browse Books
            </button>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex space-x-4">
                <img src={book.cover} alt={book.title} className="w-20 h-28 object-cover rounded" />
                <div>
                  <h4 className="font-semibold">{book.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Added: {new Date(book.startDate || book.addedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <Modal isOpen={isMyBooksOpen} onClose={() => setIsMyBooksOpen(false)}>
        <div className="flex flex-col h-[600px]">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              {currentUser ? (
                <>
                  <h2 className="text-2xl font-bold">{`${currentUser.firstName} ${currentUser.lastName}`}</h2>
                  <p className="text-gray-600">{currentUser.email}</p>
                </>
              ) : (
                <h2 className="text-2xl font-bold">My Books</h2>
              )}
              <p className="text-gray-600">Manage your reading lists and track your progress</p>
            </div>
          </div>

          <div className="flex space-x-6 mb-6">
            <TabButton id="reading" label="Currently Reading" icon={BookOpen} />
            <TabButton id="want" label="Want to Read" icon={BookMarked} />
            <TabButton id="history" label="Reading History" icon={History} />
            <TabButton id="lists" label="My Lists" icon={List} />
          </div>

          <div className="flex-1 bg-gray-50 rounded-lg p-6 overflow-y-auto dark:bg-gray-700">
            {activeTab === 'reading' && renderBookList(currentlyReading)}
            {activeTab === 'want' && renderBookList(wishlist)}
            {activeTab === 'history' && (
              <div className="space-y-4">
                {readingHistory.map((activity) => (
                  <div key={activity.id} className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{activity.bookTitle}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.bookAuthor}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'lists' && (
              <div className="text-center py-12">
                <List className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Create your first reading list</h3>
                <p className="text-gray-600 mb-4">Organize books into custom lists</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Create List
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-6 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600">{readingStats.currentlyReading}</div>
              <div className="text-sm text-gray-600">Currently Reading</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600">{readingStats.wantToRead}</div>
              <div className="text-sm text-gray-600">Want to Read</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600">{readingStats.alreadyRead}</div>
              <div className="text-sm text-gray-600">Books Read</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600">{readingStats.notes}</div>
              <div className="text-sm text-gray-600">Notes</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600">{readingStats.reviews}</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600">{readingStats.totalActions}</div>
              <div className="text-sm text-gray-600">Total Actions</div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const SignInModal = () => (
    <Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to access your library</p>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="password"
              className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => {
            setIsSignInOpen(false);
            setIsSignUpOpen(true);
          }}
        >
          Sign up
        </button>
      </div>
    </Modal>
  );

  const SignUpModal = () => (
    <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Create Account</h2>
        <p className="text-gray-600">Join our library community</p>
      </div>
      <form className="space-y-4" onSubmit={handleSignUp}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="signUpEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="signUpEmail"
              name="signUpEmail"
              className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="signUpPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="signUpPassword"
              name="signUpPassword"
              className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Account
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => {
            setIsSignUpOpen(false);
            setIsSignInOpen(true);
          }}
        >
          Sign in
        </button>
      </div>
    </Modal>
  );

  return (
    <header className="bg-white shadow-md dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Book className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">NCC Library Online</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setIsMyBooksOpen(true)}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
            >
              {currentUser ? `${currentUser.firstName}'s Books` : 'My Books'}
            </button>
            
            {/* Browse Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 dark:text-gray-300"
                onClick={() => setIsBrowseOpen(!isBrowseOpen)}
              >
                <span>Browse</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isBrowseOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 dark:bg-gray-800">
                  {browseItems.map((item) => (
                    <button
                      key={item.title}
                      onClick={item.onClick}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsSignInOpen(true)}
                    className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUpOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => setIsMyBooksOpen(true)}
                className="text-gray-700 hover:text-blue-600 text-left dark:text-gray-300"
              >
                {currentUser ? `${currentUser.firstName}'s Books` : 'My Books'}
              </button>
              
              {/* Mobile Browse Menu */}
              <div className="space-y-2">
                <div className="font-semibold text-gray-700 dark:text-gray-300">Browse</div>
                {browseItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={item.onClick}
                    className="block w-full text-left pl-4 py-1 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 dark:text-gray-300"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              {currentUser ? (
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsSignInOpen(true)}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUpOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <MyBooksModal />
      <SignInModal />
      <SignUpModal />
    </header>
  );
};

export default Header;