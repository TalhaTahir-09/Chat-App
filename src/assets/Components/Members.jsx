import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Members() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const commentListRef = collection(db, "comments");
    const q = query(commentListRef, orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const uniqueMembers = [];
      const seenUsernames = new Set();

      comments.forEach((comment) => {
        if (!seenUsernames.has(comment.username)) {
          seenUsernames.add(comment.username);
          uniqueMembers.push({
            username: comment.username,
            userImg: comment.userImg,
          });
        }
      });

      setMemberList(uniqueMembers);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-700/50 p-6">
        <h2 className="text-xl font-bold text-white">Members</h2>
        <p className="mt-1 text-sm text-slate-400">
          {memberList.length} {memberList.length === 1 ? "person" : "people"} online
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {memberList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-slate-800 p-4">
                <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-slate-400">No members yet</p>
              <p className="text-sm text-slate-500">Start chatting to see who's here!</p>
            </div>
          ) : (
            memberList.map((member, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 rounded-xl bg-slate-800/50 p-3 transition-all hover:bg-slate-800 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={
                      member.userImg ||
                      "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                    }
                    alt={member.username}
                    className="h-10 w-10 rounded-full border-2 border-slate-600 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border border-slate-800"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {member.username || "Anonymous"}
                  </p>
                  <p className="text-xs text-slate-400">Active now</p>
                </div>
                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                  <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border-t border-slate-700/50 p-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Real-time updates</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}