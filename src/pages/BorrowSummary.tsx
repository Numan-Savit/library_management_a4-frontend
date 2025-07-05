import { useGetBorrowSummaryQuery } from "../app/api/bookApi";



const BorrowSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load summary</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Borrow Summary</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Book Title</th>
            <th className="p-2 text-left">ISBN</th>
            <th className="p-2 text-left">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((entry) => (
            <tr key={entry.isbn} className="border-t">
              <td className="p-2">{entry.title}</td>
              <td className="p-2">{entry.isbn}</td>
              <td className="p-2">{entry.totalBorrowed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummary;
