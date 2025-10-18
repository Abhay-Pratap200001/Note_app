import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitUi from "../components/RateLimitUi";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import NoteCard from "../components/NoteCard";

export const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/notes');
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimit(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error('Failed to load notes');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      {isRateLimit && <RateLimitUi />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading && (
          <div className="text-center text-primary py-12 text-lg font-medium">
            Loading notes...
          </div>
        )}

        {!isRateLimit && notes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-base-content mb-6 text-center">
              Your Notes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          </>
        )}

        {!loading && !isRateLimit && notes.length === 0 && (
          <div className="text-center text-base-content/70 py-12 text-md">
            No notes found. Try adding some!
          </div>
        )}
      </div>
    </div>
  );
};
