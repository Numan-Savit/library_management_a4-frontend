
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Books from './pages/Books'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import BorrowBook from './pages/BorrowBook'
import BorrowSummary from './pages/BorrowSummary'

function App() {
 

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex-1 p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/borrow/:bookId" element={<BorrowBook />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
