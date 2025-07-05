import { useNavigate, useParams } from "react-router-dom";
import { useBorrowBookMutation } from "../app/api/bookApi";
import { useState } from "react";


const BorrowBook = () => {
  const { bookId } = useParams();
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await borrowBook({ bookId: bookId!, quantity, dueDate }).unwrap();
      alert("Book borrowed successfully");
      navigate("/borrow-summary");
    } catch {
      alert("Failed to borrow book");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">📚 Borrow Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Borrow
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
