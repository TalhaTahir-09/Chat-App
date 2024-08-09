import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase-config";
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
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase-config.js";

export default function ChatRoom() {
  const notify = () =>
    toast("🥂 Welcome to Chat Room!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  // State
  const containerRef = useRef(null);
  const [commentList, setCommentList] = useState([]);
  const [username, setUsername] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userId, setUserId] = useState("");

  const [inputComment, setInputComment] = useState("");
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

  // Fn
  function handleSignOut() {
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

  useEffect(() => {
    setUsername(auth?.currentUser?.displayName);
    setUserImg(auth?.currentUser?.photoURL);
    setUserId(auth?.currentUser?.email);
  }, [inputComment]);
  useEffect(() => {
    notify();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [commentList]);
  return (
    <>
      <div className="bg-chat h-full w-full px-6 py-10 lg:p-20 2xl:px-60">
        <div className="chat-input-container relative flex h-full w-full flex-col">
          <div
            className="chat-messages-container flex flex-col gap-3 pb-16 sm:mb-24"
            ref={containerRef}
          >
            {commentList.map((user) => {
              return (
                <div
                  key={user.time}
                  className="chat-message-container flex items-center justify-center gap-4 p-4 pr-4"
                >
                  <div className="user-img-cont">
                    <img src={user.userImg} className="user-img" />
                  </div>
                  <div className="user-comment-container flex flex-col">
                    <span
                      className="user-name-cont text-white"
                      style={fontWeight(700)}
                    >
                      {user.username}
                    </span>
                    <div className="comment-date-holder flex">
                      <div
                        className="user-comment text-white"
                        style={fontWeight(500)}
                      >
                        {user.comment}
                      </div>
                      <div
                        className="comment-date text-white"
                        style={fontWeight(500)}
                      >
                        {dateFormat.format(user.time)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="input-container bg-chat absolute left-0 flex w-full flex-col items-center justify-center pt-2 sm:flex-row">
            <div className="relative w-full grow">
              <input
                onChange={(e) => {
                  setInputComment(e.target.value);
                }}
                value={inputComment}
                onKeyDown={handleEnter}
                type="text"
                className="Text-sender-input w-full rounded-2xl border-2 border-solid border-white px-4 text-base focus:border-2 focus:border-solid focus:border-purple-400 sm:p-4 sm:pl-12"
                placeholder="Send a message....."
                style={fontWeight(500)}
              />
              <div className="sender-container absolute right-0 top-2/4 flex -translate-x-2/4 -translate-y-2/4 items-center justify-center">
                <button
                  className="bx bxs-arrow-to-top input-sender"
                  onClick={handleSend}
                ></button>
              </div>
            </div>
            <button
              className="bg-cyan sign-in-btn chat-sign-in flex w-full items-center justify-center text-white sm:w-1/5"
              style={fontWeight(500)}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}
