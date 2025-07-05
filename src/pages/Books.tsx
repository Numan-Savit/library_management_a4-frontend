import { Link } from "react-router-dom";
import { useDeleteBookMutation, useGetBooksQuery } from "../app/api/bookApi";


const Books = () => {

const [deleteBook] = useDeleteBookMutation();

const handleDelete = async (id: string) => {
  const confirm = window.confirm("Are you sure you want to delete this book?");
  if (!confirm) return;
  try {
    await deleteBook(id).unwrap();
    alert("Book deleted successfully");
  } catch{
    alert("Failed to delete book");
  }
};

  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError || !books) return <p className="text-center text-red-500">Failed to load books.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-15">
      <h2 className=" text-[30px] md:text-3xl font-bold mb-4">📚 All Books</h2>

      <table className=" w-3xl md:w-6xl mt-24 border border-gray-300 mx-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-0 text-[10px] md:text-xl md:py-2 px-2 md:px-4 border">Title</th>
            <th className="py-0 text-[10px] md:text-xl md:py-2 px-2 md:px-4 border">Author</th>
            <th className="py-0 text-[10px] md:text-xl md:py-2 px-2 md:px-4 border">Genre</th>
            <th className="py-0 text-[10px] md:text-xl md:py-2 px-2 md:px-4 border">ISBN</th>
            <th className="py-0 text-[10px] md:text-xl md:py-2 px-2 md:px-4 border">Copies</th>
            <th className="py-0 text-[10px] md:text-xl md:py-2 px-2 md:px-4 border">Available</th>
            <th className="py-0 text-[10px] md:text-xl md:py-2 px-2 md:px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="text-center">
              <td className="py-2 text-[10px] md:text-xl px-2 md:px-4 border">{book.title}</td>
              <td className="py-2 text-[10px] md:text-xl px-2 md:px-4 border">{book.author}</td>
              <td className="py-2 text-[10px] md:text-xl px-2 md:px-4 border">{book.genre}</td>
              <td className="py-2 text-[10px] md:text-xl px-2 md:px-4 border">{book.isbn}</td>
              <td className="py-2 text-[10px] md:text-xl px-2 md:px-4 border">{book.copies}</td>
              <td className="py-2 text-[10px] md:text-xl px-2 md:px-4 border">
                {book.available ? "✅" : "❌"}
              </td>
              <td className="py-2 px-2 md:px-4 border space-x-2">
                <Link to={`/edit-book/${book._id}`} className="text-blue-600 underline">Edit</Link>

                <Link to={`/borrow/${book._id}`}>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Borrow
                  </button>
                </Link>


                <button
                  onClick={() => handleDelete(book._id!)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                   Delete
                 </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
