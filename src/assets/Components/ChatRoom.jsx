import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { fontWeight } from "../index.js";
import { auth } from "../firebase-config.js";

export default function ChatRoom() {
  // State
  const [commentList, setCommentList] = useState([]);
  const commentListRef = collection(db, "comments");
  const [username, setUsername] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userId, setUserId] = useState("");

  const [inputComment, setInputComment] = useState("");
  const getCommentList = async () => {
    const data = getDocs(commentListRef);
    const filteredData = (await data).docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCommentList(filteredData);
  };
  // Fn
  useEffect(() => {
    getCommentList();
  }, [db]);

  useEffect(() => {
    setTimeout(() => {}, [100]);
  }, []);

  useEffect(() => {
    setUsername(auth?.currentUser?.displayName);
    setUserImg(auth?.currentUser?.photoURL);
    setUserId(auth?.currentUser?.email);
  }, [inputComment]);
  // })
  const handleSend = async () => {
    try {
      await setDoc(doc(db, "comments", `${Date.now()}`), {
        username: username,
        comment: inputComment,
        userImg: userImg,
        time: Date.now(),
        id: userId,
      });
      getCommentList();
    } catch (err) {
      console.error(err);
    }
    setInputComment("");
  };
  // Date formater
  const dateFormat = new Intl.DateTimeFormat("en-us",{
    hour: "numeric",
    minute: "numeric",
  })

  return (
    <>
      <div className="bg-chat width-100 height-100 p-5 pb-3">
        <div className="chat-input-container flex-column position-relative width-100 height-100 pr-5 pl-5">
          <div className="chat-messages-container pb-5 flex-column">
            {commentList.map((user) => {
              return (
                <div
                  key={user.id}
                  className="flex-center chat-message-container  gap-1 p-1"
                >
                  <div className="user-img-cont">
                    <img src={user.userImg} className="user-img" />
                  </div>
                  <div className="user-comment-container flex-column">
                    <span
                      className="user-name-cont color-white"
                      style={fontWeight(700)}
                    >
                      {user.username}
                    </span>
                    <div className="flex comment-date-holder">
                      <div
                        className="user-comment color-white"
                        style={fontWeight(500)}
                      >
                        {user.comment}
                      </div>
                      <div className="color-white comment-date"
                        style={fontWeight(500)}>
                        {dateFormat.format(user.time)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" input-container position-absolute ">
            <div className="position-relative">
              <input
                onChange={(e) => {
                  setInputComment(e.target.value);
                }}
                value={inputComment}
                type="text"
                className="Text-sender-input p-1 pl-3 border-radius-20px width-100"
                placeholder="Send a message....."
              />
              <div
                className="sender-container flex-center position-absolute absolute-center"
                style={{ left: `95%` }}
              >
                <button
                  className="bx bxs-arrow-to-top input-sender"
                  onClick={handleSend}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
