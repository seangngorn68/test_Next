"use client"; // This marks the component as a client-side component

import { useEffect, useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

// Fetch users function
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const UsersPage = () => {
  // State for storing fetched users data, loading status, and error
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useEffect to fetch users when the component mounts
  useEffect(() => {
    // Create an async function inside useEffect
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const usersData = await fetchUsers();
        setData(usersData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []); // Empty dependency array to run only on component mount

  // Define columns for the table using useMemo for optimization
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
    ],
    []
  );

  // Initialize TanStack Table with the fetched data and defined columns
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Show loading state if data is still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show error message if there is an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render the table once data is available
  return (
    <div>
      <h1>Users Table</h1>
      <table border="1">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
