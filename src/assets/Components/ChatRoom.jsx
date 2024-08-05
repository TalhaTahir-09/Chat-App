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
    return () => unsubscribe()
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

  return (
    <>
      <div className="bg-chat w-full h-full pt-16 pr-24 pl-24 pb-12">
        <div className="chat-input-container flex flex-col relative w-full h-full">
          <div className="chat-messages-container gap-3 pb-24 scroll-p-8 flex flex-col h-full">
            {commentList.map((user) => {
              return (
                <div
                  key={user.time}
                  className="flex justify-center items-center chat-message-container gap-4 p-4 pr-4"
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
                    <div className="flex comment-date-holder">
                      <div
                        className="user-comment text-white"
                        style={fontWeight(500)}
                      >
                        {user.comment}
                      </div>
                      <div
                        className="text-white comment-date"
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
          <div className="input-container w-full left-0 bg-chat pt-2 absolute flex justify-center items-center">
            <div className="relative grow">
              <input
                onChange={(e) => {
                  setInputComment(e.target.value);
                }}
                value={inputComment}
                onKeyDown={handleEnter}
                type="text"
                className="Text-sender-input focus:border-purple-400 border-white text-base focus:border-solid focus:border-2  border-2 border-solid p-4 pl-12 rounded-2xl w-full"
                placeholder="Send a message....."
                style={fontWeight(500)}
              />
              <div
                className="sender-container flex justify-center items-center absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
                style={{ left: `95%` }}
              >
                <button
                  className="bx bxs-arrow-to-top input-sender"
                  onClick={handleSend}
                ></button>
              </div>
            </div>
            <button
              className="bg-cyan text-white flex justify-center items-center sign-in-btn chat-sign-in"
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
