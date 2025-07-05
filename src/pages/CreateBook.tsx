import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../app/api/bookApi";
import { useState } from "react";

const CreateBook = () => {

  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'copies' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBook({
        ...formData,
        available: formData.copies > 0,
      }).unwrap();
      navigate('/books');
    } catch {
      alert('Failed to create book');
    }
  };

    return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} placeholder="Title" required className="input" onChange={handleChange} />
        <input type="text" name="author" value={formData.author} placeholder="Author" required className="input" onChange={handleChange} />
        <input type="text" name="genre" value={formData.genre} placeholder="Genre" required className="input" onChange={handleChange} />
        <input type="text" name="isbn" value={formData.isbn} placeholder="ISBN" required className="input" onChange={handleChange} />
        <textarea name="description" value={formData.description} placeholder="Description" className="input" onChange={handleChange} />
        <input type="number" name="copies" value={formData.copies} placeholder="Copies" min={0} required className="input" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </form>
    </div>
    );
};

export default CreateBook;