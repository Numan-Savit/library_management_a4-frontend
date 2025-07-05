
import { apiSlice } from './apiSlice';


export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      transformResponse: (response: { data: Book[] }) => response.data,
      providesTags: ['Book'],
    }),

    // Get single book by id

    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Book', id }],
    }),


    // Create book

    createBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Book'],
    }),

    

     // Update book
    updateBook: builder.mutation<Book, { id?: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),

    // delete book

    deleteBook: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    // borrow book

   borrowBook: builder.mutation<{ message: string }, { bookId: string; quantity: number; dueDate: string }>({
   query: (data) => ({
    url: '/borrows',
    method: 'POST',
    body: data,
   }),
    invalidatesTags: ['Book', 'Borrow'],
  }),

  // borrow summary book

  getBorrowSummary: builder.query<{ title: string; isbn: string; totalBorrowed: number }[],void>({
  query: () => '/borrows/summary',
  transformResponse: (res: { data: { title: string; isbn: string; totalBorrowed: number }[] }) => res.data,
  providesTags: ['Borrow'],
}),


   
  }),
});


  
export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export const { 
  useGetBooksQuery, 
  useCreateBookMutation,
  useUpdateBookMutation,
  useGetBookQuery,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery
} = bookApi;
