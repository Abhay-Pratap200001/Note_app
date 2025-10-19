import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router"; // ✅ FIXED import
import { api } from "../components/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Loader, Trash2Icon } from "lucide-react";

const NoteDetails = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        console.log(res.data);

        setNote(res.data.data);
        toast.success("Welcome to notes detail");
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note details");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };
  

  const handlesave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add atleast one field");
      return;
    }
    setSaving(true);
    try {
      await api.put(`notes/${id}`, note);
      toast.success('NOte updated')
    } catch (error) {
      toast.error("Failed to updated")
      console.log(error);

    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center text-red-500 mt-10">Note not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-base-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline"
            disabled={saving}
          >
            <Trash2Icon className="h-5 w-5" />
            Delete Note
          </button>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Update title"
                className="input input-bordered"
                value={note.title || ""}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Write your note..."
                className="textarea textarea-bordered h-32"
                value={note.content || ""}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn btn-primary"
              disabled={saving}
              onClick={handlesave}
            >
              {saving ? "saving..." : "save the note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
