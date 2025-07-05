import { useNavigate, useParams } from "react-router-dom";
import { useGetBooksQuery, useUpdateBookMutation } from "../app/api/bookApi";
import { useEffect, useState } from "react";


const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: books } = useGetBooksQuery();
  const bookToEdit = books?.find((b) => b._id === id);

  const [updateBook] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        genre: bookToEdit.genre,
        isbn: bookToEdit.isbn,
        description: bookToEdit.description || "",
        copies: bookToEdit.copies,
      });
    }
  }, [bookToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({
        id: id!,
        data: {
          ...formData,
          available: formData.copies > 0,
        },
      }).unwrap();
      navigate("/books");
    } catch {
      alert("Update failed");
    }
  };

  if (!bookToEdit) return <p className="text-center">Loading book data...</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} required onChange={handleChange} className="input" />
        <input type="text" name="author" value={formData.author} required onChange={handleChange} className="input" />
        <select name="genre" value={formData.genre} required onChange={handleChange} className="input">
          <option value="">Select Genre</option>
          <option value="FICTION">Fiction</option>
          <option value="NON_FICTION">Non-Fiction</option>
          <option value="SCIENCE">Science</option>
          <option value="HISTORY">History</option>
          <option value="BIOGRAPHY">Biography</option>
          <option value="FANTASY">Fantasy</option>
        </select>
        <input type="text" name="isbn" value={formData.isbn} required onChange={handleChange} className="input" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="input" />
        <input type="number" name="copies" value={formData.copies} required onChange={handleChange} className="input" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
