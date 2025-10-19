import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitUi from "../components/RateLimitUi";
import { toast } from 'react-hot-toast';
import NoteCard from "../components/NoteCard";
import { api } from "../components/axios";


export const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
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

      <div className="relative mt-[10%]">
      {isRateLimit && <RateLimitUi />}
      </div>

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
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          </>
        )}

        {!loading && !isRateLimit && notes.length === 0 && (
          <div className="text-center text-base-content/70 py-60 text-4xl">
            No notes found. Try adding some!
          </div>
        )}
      </div>
    </div>
  );
};
