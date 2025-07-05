import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white mt-0 p-5 md:p-10">
           <div className="max-w-6xl mx-auto flex justify-between items-center">
             <h1 className="text-[10px] md:text-xl font-bold mt-1">📚 Library System</h1>
             <div className="space-x-2 md:space-x-4">
               <Link to="/books" className="hover:underline text-[10px] md:text-xl">All Books</Link>
               <Link to="/create-book" className="hover:underline text-[10px] md:text-xl">Add Book</Link>
               <Link to="/borrow-summary" className="hover:underline text-[10px] md:text-xl">Borrow Summary</Link>
             </div>
           </div>
        </nav>
    );
};

export default Navbar;