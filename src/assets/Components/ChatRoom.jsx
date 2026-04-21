import React, { useEffect, useRef, useState } from "react";
import useOnlineStatus from "./useOnlineStatus.jsx";
import PfpPopup from "./pfpPopup.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import { db } from "../firebase-config";
import Members from "./Members.jsx";
import {
  getDocs,
  collection,
  setDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { fontWeight } from "../index.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase-config.js";

export default function ChatRoom() {
  // State
  const containerRef = useRef(null);
  const [commentList, setCommentList] = useState([]);
  const [username, setUsername] = useState("");
  const [userImg, setUserImg] = useState(null);
  const [userId, setUserId] = useState("");
  const [showPfpPopup, setShowPfpPopup] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [inputComment, setInputComment] = useState("");

  useEffect(() => {
    async function fetchData() {
      onAuthStateChanged(auth, (user) => {
        const userImg = user.email;
        if (user) {
          setUserId(user.uid);
          setUserImg(user.photoURL);
          setUsername(user.displayName);
        }
        const imgStorage = localStorage.getItem("avatar");
        if (user.photoURL === null && imgStorage === null) {
          console.log(user.photoURL);
          setShowPfpPopup(true);
          setIsSaved(false);
          console.log("afafsa");
        } else {
          setShowPfpPopup(false);
          setIsSaved(true);
        }
        setIsAuthLoading(false);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const commentListRef = collection(db, "comments");
    const q = query(commentListRef, orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommentList(comments);
    });

    return () => unsubscribe();
  }, []);

  const isOnline = useOnlineStatus();

  function handleSignOut() {
    localStorage.clear();
    signOut(auth);
    window.location.replace("/");
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
      setInputComment("");
    }
  };

  const handleSend = async () => {
    setInputComment("");
    try {
      await setDoc(doc(db, "comments", `${Date.now()}`), {
        username: username,
        comment: inputComment,
        userImg: userImg,
        time: Date.now(),
        id: userId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Date formater
  const dateFormat = new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric",
  });

  function handleSubmitProfile(avatar, username) {
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", avatar);
    setShowPfpPopup(false);
    setIsSaved(true);
  }
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [commentList]);

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  if (isOnline) {
    return (
      <>
        <div className="min-h-screen bg-gray-900">
          <div className="mx-auto flex h-screen max-w-7xl">
            <div className="hidden w-80 border-r border-gray-700 bg-gray-800 lg:block">
              <Members />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={
                        userImg ||
                        localStorage.getItem("avatar") ||
                        "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                      }
                      alt="Current avatar"
                      className="h-8 w-8 rounded-full border-2 border-gray-600 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-gray-900 bg-green-500"></div>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-white">
                      {username || localStorage.getItem("username") || "Guest"}
                    </h1>
                    <p className="text-sm text-gray-400">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPfpPopup(true)}
                    className={`rounded bg-gray-700 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 hover:text-white ${isSaved ? "hidden": ""}`}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <div ref={containerRef} className="h-full overflow-y-auto p-4">
                  <div className="space-y-4">
                    {commentList.map((message) => (
                      <div
                        key={message.time}
                        className="flex items-start gap-3"
                      >
                        {message.id !== userId && (
                          <div className="flex min-w-40 max-w-xs items-center justify-center gap-4">
                            <img
                              src={
                                message.userImg || localStorage.getItem("avatar") ||
                                "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                              }
                              alt={message.username}
                              className="h-8 w-8 rounded-full border border-gray-600 object-cover"
                            />
                            <div className="flex w-full max-w-xs flex-col gap-1 rounded-lg bg-gray-700 px-3 py-1">
                              <p className="mt-1 text-white">
                                {message.comment}
                              </p>
                              <p className="text-right text-xs text-gray-400">
                                {dateFormat.format(message.time)}
                              </p>
                            </div>
                          </div>
                        )}
                        {message.id === userId && (
                          <div className="ml-auto flex min-w-40 max-w-xs items-center justify-center gap-4">
                            <div className="flex w-full max-w-xs flex-col gap-1 rounded-lg bg-gray-700 px-3 py-1">
                              <p className="mt-1 text-left text-white">
                                {message.comment}
                              </p>
                              <p className="text-right text-xs text-gray-400">
                                {dateFormat.format(message.time)}
                              </p>
                            </div>
                            <img
                              src={
                                message.userImg || localStorage.getItem("avatar") ||
                                "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                              }
                              alt={message.username}
                              className="h-8 w-8 rounded-full border border-gray-600 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 bg-gray-800 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputComment}
                    onChange={(e) => setInputComment(e.target.value)}
                    onKeyDown={handleEnter}
                    placeholder="Type a message..."
                    className="flex-1 rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputComment.trim()}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PfpPopup
          visible={showPfpPopup}
          onClose={() => setShowPfpPopup(false)}
          onSubmit={handleSubmitProfile}
          selectedAvatar={userImg}
          selectedName={username}
          onSelectAvatar={setUserImg}
          onNameChange={setUsername}
          saved={isSaved}
        />
      </>
    );
  }

  return null;
}
