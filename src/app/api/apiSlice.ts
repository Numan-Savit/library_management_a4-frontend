import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://library-management-api-1-c29a.onrender.com/api',
    }),
    tagTypes: ['Book','Borrow'],
    endpoints: () => ({}),
});