import React from 'react'
import {supabase} from "../supabaseClient"
import { useState,useEffect } from 'react'
const Whispers = () => {
  const [whispers, setWhispers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWhispers() {
      const { data, error } = await supabase.from('Whispers').select('*');
      if (error) {
        setError(error.message);
      } else {
        setWhispers(data);
      }
    }
    fetchWhispers();
  }, [supabase]); 

  if (error) return <div>Error: {error}</div>;
  if (!whispers.length) return <div>Loading whispers...</div>;

  return (
    <ul>
      {whispers.map((w) => (
        <li key={w.id}>{w.content}</li> 
      ))}
    </ul>
  );
}

export default Whispers
