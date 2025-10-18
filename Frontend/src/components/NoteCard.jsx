import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { ford } from "./utils";

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-300 hover:shadow-2xl hover:shadow-green-500 transition-all duration-200 border-t-4 border-b-4 border-solid border-[#138e5f]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-action justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {ford(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
