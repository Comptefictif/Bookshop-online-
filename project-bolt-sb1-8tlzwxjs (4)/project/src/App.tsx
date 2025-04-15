import React from 'react';
import BookCard from './components/BookCard';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsBar from './components/NewsBar';

function App() {
  const trendingBooks = [
    {
      id: 1,
      title: 'Control Your Mind',
      author: 'Eric Robertson',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
      status: 'available',
      pdfUrl: 'https://archive.org/details/controlmind'
    },
    {
      id: 2,
      title: 'The Wheel of Time',
      author: 'Robert Jordan',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e',
      status: 'available',
      pdfUrl: 'https://archive.org/details/wheeloftime'
    },
    {
      id: 3,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646',
      status: 'available',
      pdfUrl: 'https://archive.org/details/atomic-habits'
    },
    {
      id: 4,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
      status: 'available',
      pdfUrl: 'https://archive.org/details/psychology-money'
    },
    {
      id: 5,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
      status: 'available',
      pdfUrl: 'https://archive.org/details/midnight-library'
    },
    {
      id: 6,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      cover: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6',
      status: 'available',
      pdfUrl: 'https://archive.org/details/project-hail-mary'
    },
    {
      id: 7,
      title: 'The Four Winds',
      author: 'Kristin Hannah',
      cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
      status: 'available',
      pdfUrl: 'https://archive.org/details/four-winds'
    },
    {
      id: 8,
      title: 'The Invisible Life of Addie LaRue',
      author: 'V.E. Schwab',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
      status: 'available',
      pdfUrl: 'https://archive.org/details/addie-larue'
    },
    {
      id: 9,
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      cover: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf',
      status: 'available',
      pdfUrl: 'https://archive.org/details/evelyn-hugo'
    },
    {
      id: 10,
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      cover: 'https://images.unsplash.com/photo-1572293007244-8b60335d2b7d',
      status: 'available',
      pdfUrl: 'https://archive.org/details/klara-sun'
    },
    {
      id: 11,
      title: 'The Paris Library',
      author: 'Janet Skeslien Charles',
      cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
      status: 'available',
      pdfUrl: 'https://archive.org/details/paris-library'
    },
    {
      id: 12,
      title: 'The Vanishing Half',
      author: 'Brit Bennett',
      cover: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3',
      status: 'available',
      pdfUrl: 'https://archive.org/details/vanishing-half'
    }
  ];

  const classicBooks = [
    {
      id: 35,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
      status: 'available',
      pdfUrl: 'https://archive.org/details/pride-prejudice'
    },
    {
      id: 36,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e',
      status: 'available',
      pdfUrl: 'https://archive.org/details/to-kill-mockingbird'
    },
    {
      id: 37,
      title: '1984',
      author: 'George Orwell',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646',
      status: 'available',
      pdfUrl: 'https://archive.org/details/1984-novel'
    },
    {
      id: 38,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
      status: 'available',
      pdfUrl: 'https://archive.org/details/great-gatsby'
    },
    {
      id: 39,
      title: 'One Hundred Years of Solitude',
      author: 'Gabriel García Márquez',
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
      status: 'available',
      pdfUrl: 'https://archive.org/details/hundred-years-solitude'
    },
    {
      id: 40,
      title: 'Don Quixote',
      author: 'Miguel de Cervantes',
      cover: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6',
      status: 'available',
      pdfUrl: 'https://archive.org/details/don-quixote'
    },
    {
      id: 41,
      title: 'The Odyssey',
      author: 'Homer',
      cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
      status: 'available',
      pdfUrl: 'https://archive.org/details/odyssey'
    },
    {
      id: 42,
      title: 'Jane Eyre',
      author: 'Charlotte Brontë',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
      status: 'available',
      pdfUrl: 'https://archive.org/details/jane-eyre'
    },
    {
      id: 43,
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      cover: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf',
      status: 'available',
      pdfUrl: 'https://archive.org/details/crime-punishment'
    },
    {
      id: 44,
      title: 'The Divine Comedy',
      author: 'Dante Alighieri',
      cover: 'https://images.unsplash.com/photo-1572293007244-8b60335d2b7d',
      status: 'available',
      pdfUrl: 'https://archive.org/details/divine-comedy'
    },
    {
      id: 45,
      title: 'The Brothers Karamazov',
      author: 'Fyodor Dostoevsky',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646',
      status: 'available',
      pdfUrl: 'https://archive.org/details/brothers-karamazov'
    },
    {
      id: 46,
      title: 'Anna Karenina',
      author: 'Leo Tolstoy',
      cover: 'https://images.unsplash.com/photo-1544716279-e513176f20b5',
      status: 'available',
      pdfUrl: 'https://archive.org/details/anna-karenina'
    },
    {
      id: 47,
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      cover: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27',
      status: 'available',
      pdfUrl: 'https://archive.org/details/war-and-peace'
    },
    {
      id: 48,
      title: 'Moby Dick',
      author: 'Herman Melville',
      cover: 'https://images.unsplash.com/photo-1517770413964-df8ca61194a6',
      status: 'available',
      pdfUrl: 'https://archive.org/details/moby-dick'
    },
    {
      id: 49,
      title: 'The Canterbury Tales',
      author: 'Geoffrey Chaucer',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
      status: 'available',
      pdfUrl: 'https://archive.org/details/canterbury-tales'
    },
    {
      id: 50,
      title: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      cover: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf',
      status: 'available',
      pdfUrl: 'https://archive.org/details/dorian-gray'
    },
    {
      id: 51,
      title: 'Frankenstein',
      author: 'Mary Shelley',
      cover: 'https://images.unsplash.com/photo-1572293007244-8b60335d2b7d',
      status: 'available',
      pdfUrl: 'https://archive.org/details/frankenstein'
    },
    {
      id: 52,
      title: 'Dracula',
      author: 'Bram Stoker',
      cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
      status: 'available',
      pdfUrl: 'https://archive.org/details/dracula'
    },
    {
      id: 53,
      title: 'The Count of Monte Cristo',
      author: 'Alexandre Dumas',
      cover: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3',
      status: 'available',
      pdfUrl: 'https://archive.org/details/monte-cristo'
    },
    {
      id: 54,
      title: 'Les Misérables',
      author: 'Victor Hugo',
      cover: 'https://images.unsplash.com/photo-1518281420975-50db6e5d0a97',
      status: 'available',
      pdfUrl: 'https://archive.org/details/les-miserables'
    },
    {
      id: 55,
      title: 'The Three Musketeers',
      author: 'Alexandre Dumas',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646',
      status: 'available',
      pdfUrl: 'https://archive.org/details/three-musketeers'
    },
    {
      id: 56,
      title: 'Wuthering Heights',
      author: 'Emily Brontë',
      cover: 'https://images.unsplash.com/photo-1544716279-e513176f20b5',
      status: 'available',
      pdfUrl: 'https://archive.org/details/wuthering-heights'
    },
    {
      id: 57,
      title: 'The Scarlet Letter',
      author: 'Nathaniel Hawthorne',
      cover: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27',
      status: 'available',
      pdfUrl: 'https://archive.org/details/scarlet-letter'
    },
    {
      id: 58,
      title: 'Little Women',
      author: 'Louisa May Alcott',
      cover: 'https://images.unsplash.com/photo-1517770413964-df8ca61194a6',
      status: 'available',
      pdfUrl: 'https://archive.org/details/little-women'
    },
    {
      id: 59,
      title: 'The Adventures of Huckleberry Finn',
      author: 'Mark Twain',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
      status: 'available',
      pdfUrl: 'https://archive.org/details/huckleberry-finn'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <NewsBar />
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Trending Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trendingBooks.map(book => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Classic Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {classicBooks.map(book => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;