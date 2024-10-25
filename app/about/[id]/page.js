"use client"; // Make sure this is a client component
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { items } from '../../items';

const DetailPage = () => {
  const params = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (params?.id) {
      const id = parseInt(params.id);
      const foundItem = items.find((item) => item.id === id);
      setItem(foundItem);
    }
  }, [params]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detail Page for {item.name}</h1>
      <p>ID: {item.id}</p>
      <p>Age: {item.age}</p>
      <p>Description: {item.description}</p>
    </div>
  );
};

export default DetailPage;
