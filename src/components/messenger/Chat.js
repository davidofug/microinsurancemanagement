import { useEffect, useState } from "react";
import { functions, authentication, db } from "../../helpers/firebase";
import { httpsCallable } from "firebase/functions";
import { serverTimestamp, updateDoc } from "firebase/firestore";

import { IoArrowBackOutline } from "react-icons/io5";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { BiEnvelope } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineConsoleSql, AiOutlineSend } from "react-icons/ai";

import "./messenger.css";

import useAuth from "../../contexts/Auth";
import {
  addDoc,
  collection,
  onSnapshot,
  getDocs,
  doc,
} from "firebase/firestore";

import { Form } from "react-bootstrap";
import { getFormattedDate } from "../../helpers/formatDate";

import useSound from "use-sound";
import notificationSound from "../../assets/media/audios/sound1.mp3";

function Chat() {
  const [play] = useSound(notificationSound);

  const [unread, setUnread] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [allChats, setAllChats] = useState([]);
  const [acceptedChats, setAcceptedChats] = useState([]);
  const [search, setSearch] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("Default Supervisor");
  const [selectChat, setSelectChat] = useState(true);
  const [previousChats, setPreviousChats] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");

  const [receiversUID, setReceiversUID] = useState("");

  const { authClaims } = useAuth();

  useEffect(() => {
    process();
    return () => process();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "messages"), {
      sendersUID: authentication.currentUser.uid,
      photoURL: authentication.currentUser.photoURL,
      createdAt: serverTimestamp(),
      message: message,
      receiversUID: receiversUID,
      receiversName: receiver,
      read: false,
    });

    setMessage("");
  };

  const filterAcceptedChats = ({ target: { value } }) => {
    setSearchKey(value);
    const chats = allChats.filter((chat) => {
      return chat?.name.toLowerCase().includes(value.toLowerCase());
    });
    setAcceptedChats(chats);
  };

  const process = () => {
    const listUsers = httpsCallable(functions, "listUsers");
    listUsers()
      .then(({ data }) => {
        if (authClaims?.supervisor) {
          const myAgents = data.filter(
            (user) =>
              user.role.agent === true &&
              user?.meta.added_by_uid === authentication.currentUser.uid
          );
          const incharge = data.filter(
            (user) =>
              user.uid ===
              data.filter(
                (user) => user.uid === authentication.currentUser.uid
              )[0].meta.added_by_uid
          );

          setAcceptedChats([...myAgents, ...incharge]);
          return [...myAgents, ...incharge];
        } else if (authClaims?.admin) {
          const incharge = data.filter(
            (user) =>
              user.uid ===
              data.filter(
                (user) => user.uid === authentication.currentUser.uid
              )[0].meta.added_by_uid
          );
          const supervisors = data.filter(
            (user) =>
              user?.role?.supervisor === true &&
              user?.meta?.added_by_uid === authentication.currentUser.uid
          );
          const myAgents = data.filter(
            (user) =>
              user?.role?.agent === true &&
              user?.meta?.added_by_uid === authentication.currentUser.uid
          );

          setAcceptedChats([...supervisors, ...myAgents, ...incharge]);
          return [...supervisors, ...myAgents, ...incharge];
        } else if (authClaims?.superadmin) {
          const myAdmins = data.filter(
            (user) =>
              user?.role?.admin === true &&
              user?.meta?.added_by_uid === authentication.currentUser.uid
          );
          const myAgents = data.filter(
            (user) =>
              user?.role?.agent === true &&
              user?.meta?.added_by_uid === authentication.currentUser.uid
          );
          const mySupervisors = data.filter(
            (user) =>
              user?.role?.supervisor === true &&
              user?.meta?.added_by_uid === authentication.currentUser.uid
          );

          setAcceptedChats([...myAgents, ...myAdmins, ...mySupervisors]);
          return [...myAgents, ...myAdmins, ...mySupervisors];
        } else if (authClaims?.agent) {
          const incharge = data.filter(
            (user) =>
              user.uid ===
              data.filter(
                (user) => user.uid === authentication.currentUser.uid
              )[0].meta.added_by_uid
          );
          return [...incharge];
        }
      })
      .then(async (capables) => {
        onSnapshot(collection(db, "messages"), (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const sentMessages = data.filter(
            (message) => message?.sendersUID === authentication.currentUser.uid
          );
          const receivers = sentMessages.map((message) => message.receiversUID);
          const uids = [...new Set(receivers)];
          const prevs = capables.filter((capable) =>
            uids.includes(capable.uid)
          );
          setPreviousChats(prevs);
          setAllMessages(data);
        });
        const data = await getDocs(collection(db, "messages"));
        const messages = data.docs.map((doc) => doc.data());
        const receivers = messages
          .filter(
            (message) => message?.sendersUID === authentication.currentUser.uid
          )
          .map((message) => message.receiversUID);
        const uids = [...new Set(receivers)];

        setUnread(
          messages
            .filter(
              (message) =>
                message.receiversUID === authentication.currentUser.uid
            )
            .filter((message) => message?.read !== true).length
        );
        setPreviousChats(
          capables.filter((capable) => uids.includes(capable.uid))
        );
        setAcceptedChats(capables);
        setAllChats(capables);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      id="chatbox"
      className="tw-shadow-lg tw-bg-white  tw-z-20 tw-outline tw-outline-1 tw-outline-gray-300 tw-rounded-t-lg tw-fixed tw-bottom-0 tw-right-0 lg:tw-right-10 collapse-chatbox"
    >
      {selectChat === false ? (
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            position: "relative",
            borderTopLeftRadius: "15px 15px",
            borderTopRightRadius: "15px 15px",
            paddingTop: "10px",
            paddingLeft: "20px",
            justifyContent: "space-between",
            opacity: "0.8",
          }}
          className=" tw-h-12"
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={() => {
                setSelectChat(true);
                document
                  .getElementById("msg-form")
                  .classList.add("hide-msg-form");
                document
                  .getElementById("msg-form")
                  .classList.remove("show-msg-form");
                console.log(receiversUID);
                setUnread(
                  allMessages
                    .filter(
                      (msg) =>
                        msg.receiversUID === authentication.currentUser.uid
                    )
                    .filter((msg) => msg?.read !== true).length
                );
              }}
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                border: "none",
              }}
            >
              <i
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: "#f7f9f9",
                }}
              >
                <IoArrowBackOutline />
              </i>
            </button>
            <div style={{ paddingTop: "5px" }}>{receiver}</div>
          </div>
          <button
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              border: "none",
              marginRight: "20px",
            }}
            onClick={() => {
              if (expanded === false) {
                document
                  .getElementById("chatbox")
                  .classList.remove("collapse-chatbox");
                document
                  .getElementById("msg-form")
                  .classList.remove("hide-msg-form");
                document
                  .getElementById("msg-form")
                  .classList.add("show-msg-form");
                document
                  .getElementById("msg-form")
                  .classList.remove("collapse-form");
                setExpanded(!expanded);
              } else {
                document
                  .getElementById("chatbox")
                  .classList.add("collapse-chatbox");
                document
                  .getElementById("msg-form")
                  .classList.add("collapse-form");
                setExpanded(!expanded);
              }
            }}
          >
            <i
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                backgroundColor: "#f7f9f9",
              }}
            >
              {expanded === true ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />}
            </i>
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            position: "relative",
            justifyContent: "space-between",
            opacity: "0.8",
          }}
          className="tw-h-12 tw-border-b tw-rounded-t-lg px-2 tw-overflow-hidden"
        >
          <div className="tw-flex tw-items-center tw-pt-1 tw-gap-1 tw-relative">
            <p className="tw-flex tw-items-start tw-gap-1">
              Messages{" "}
              <span className="tw-text-xs">{unread > 0 ? 0 : unread}</span>
            </p>
            {/* <BiEnvelope className="" /> */}
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            {search === true && (
              <div
                style={{
                  display: "flex",
                  width: "160px",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ height: "30px", width: "30px" }}>
                  <i
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: "#f7f9f9",
                      color: "#4aaef2",
                    }}
                  >
                    <BiSearchAlt2 />
                  </i>
                </div>
                <div>
                  <input
                    style={{
                      borderBottom: "1px solid #1d9bf0",
                      width: "120px",
                      paddingLeft: "10px",
                    }}
                    id="search-users"
                    className="search-chats"
                    value={searchKey}
                    onChange={filterAcceptedChats}
                  />
                </div>
              </div>
            )}
            <button
              onClick={() => {
                setSearch(!search);
                setSearchKey("");
              }}
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                border: "none",
              }}
            >
              <i
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: "#f7f9f9",
                }}
              >
                {search === true ? <IoCloseSharp /> : <BiSearchAlt2 />}
              </i>
            </button>
            <button
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                border: "none",
                marginRight: "20px",
              }}
              onClick={() => {
                if (expanded === false) {
                  document
                    .getElementById("chatbox")
                    .classList.remove("collapse-chatbox");
                  document
                    .getElementById("msg-form")
                    .classList.add("hide-msg-form");
                  document
                    .getElementById("msg-form")
                    .classList.remove("show-msg-form");
                  document
                    .getElementById("msg-form")
                    .classList.remove("collapse-form");
                  setExpanded(!expanded);
                } else {
                  document
                    .getElementById("chatbox")
                    .classList.add("collapse-chatbox");
                  document
                    .getElementById("msg-form")
                    .classList.add("collapse-form");
                  setExpanded(!expanded);
                }
              }}
            >
              <i
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: "#f7f9f9",
                }}
              >
                {expanded === true ? (
                  <FaAngleDoubleDown />
                ) : (
                  <FaAngleDoubleUp />
                )}
              </i>
            </button>
          </div>
        </div>
      )}

      <div
        id="display"
        style={{
          width: "300px",
          backgroundColor: "white",
          borderTopLeftRadius: "15px 15px",
          borderTopRightRadius: "15px 15px",
          paddingLeft: "20px",
          overflow: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        {selectChat === true ? (
          <>
            {search === false ? (
              <>
                <div>Previous Chats</div>

                {previousChats.map(({ name, photoURL, uid }, index) => {
                  const unseenMsgs = allMessages
                    .filter((msg) => msg.sendersUID === uid)
                    .filter(
                      (msg) =>
                        msg?.receiversUID === authentication.currentUser.uid
                    )
                    .filter((msg) => msg?.read !== true);
                  for (let msg of unseenMsgs) {
                    play();
                  }
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={async () => {
                        document
                          .getElementById("msg-form")
                          .classList.remove("hide-msg-form");
                        setReceiversUID(uid);
                        const sentMessages = await allMessages
                          .filter((message) => message?.receiversUID === uid)
                          .filter(
                            (message) =>
                              message?.sendersUID ===
                              authentication.currentUser.uid
                          );
                        const receivedMessages = await allMessages
                          .filter(
                            (message) =>
                              message?.receiversUID ===
                              authentication.currentUser.uid
                          )
                          .filter((message) => message?.sendersUID === uid);
                        setMessages(
                          [...sentMessages, ...receivedMessages].sort(
                            (a, b) =>
                              a?.createdAt?.seconds - b?.createdAt?.seconds
                          )
                        );
                        setSelectChat(!selectChat);
                        setReceiver(name);

                        unseenMsgs.map((msg) => {
                          const { id } = msg;
                          updateDoc(doc(db, "messages", id), {
                            read: true,
                          }).then((result) => console.log(result));
                        });
                      }}
                    >
                      <div>
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "gray",
                            opacity: "0.2",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            {photoURL !== null ? (
                              <img
                                src={photoURL}
                                alt={`${name
                                  .split(" ")[0][0]
                                  .toUpperCase()}${name
                                  .split(" ")[1][0]
                                  .toUpperCase()}`}
                              />
                            ) : (
                              `${name.split(" ")[0][0].toUpperCase()}${name
                                .split(" ")[1][0]
                                .toUpperCase()}`
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        key={index}
                        style={{
                          marginTop: "25px",
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <p>{name}</p>
                      </div>
                      {unseenMsgs.length > 0 && (
                        <div
                          style={{
                            height: "40px",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div
                            style={{ fontSize: "10px" }}
                          >{`${unseenMsgs.length} unread`}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div>All Chats</div>
                {acceptedChats.map(({ name, photoURL, uid }, index) => {
                  const unseenMsgs = allMessages
                    .filter((msg) => msg.sendersUID === uid)
                    .filter(
                      (msg) =>
                        msg?.receiversUID === authentication.currentUser.uid
                    )
                    .filter((msg) => msg?.read !== true);
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={async () => {
                        document
                          .getElementById("msg-form")
                          .classList.remove("hide-msg-form");
                        setReceiversUID(uid);
                        const sentMessages = await allMessages
                          .filter((message) => message?.receiversUID === uid)
                          .filter(
                            (message) =>
                              message?.sendersUID ===
                              authentication.currentUser.uid
                          );
                        const receivedMessages = await allMessages
                          .filter(
                            (message) =>
                              message?.receiversUID ===
                              authentication.currentUser.uid
                          )
                          .filter((message) => message?.sendersUID === uid);
                        setMessages(
                          [...sentMessages, ...receivedMessages].sort(
                            (a, b) =>
                              a?.createdAt?.seconds - b?.createdAt?.seconds
                          )
                        );
                        setSelectChat(!selectChat);
                        setReceiver(name);

                        unseenMsgs.map((msg) => {
                          const { id } = msg;
                          updateDoc(doc(db, "messages", id), {
                            read: true,
                          }).then((result) => console.log(result));
                        });

                        onSnapshot(collection(db, "messages")).then(
                          (snapshot) => {
                            const messages = snapshot.docs.map((doc) => ({
                              ...doc.data(),
                              id: doc.id,
                            }));
                            setUnread(
                              allMessages
                                .filter(
                                  (msg) =>
                                    msg.receiversUID ===
                                    authentication.currentUser.uid
                                )
                                .filter((msg) => msg?.read !== true).length
                            );
                          }
                        );
                      }}
                    >
                      <div>
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "gray",
                            opacity: "0.2",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            {photoURL !== null ? (
                              <img
                                src={photoURL}
                                alt={`${name
                                  .split(" ")[0][0]
                                  .toUpperCase()}${name
                                  .split(" ")[1][0]
                                  .toUpperCase()}`}
                              />
                            ) : (
                              `${name.split(" ")[0][0].toUpperCase()}${name
                                .split(" ")[1][0]
                                .toUpperCase()}`
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: "25px",
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <p>{name}</p>
                      </div>
                      {unseenMsgs > 0 && (
                        <div
                          style={{
                            height: "40px",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div
                            style={{ fontSize: "10px" }}
                          >{`${unseenMsgs} unread`}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <>
            {messages?.length > 0 &&
              messages.map((mes, index) => {
                const { message, createdAt, sendersUID, receiversUID, id } =
                  mes;

                document.getElementById("display").scrollTop =
                  document.getElementById("display").scrollHeight;
                let date = null;
                if (createdAt !== null) {
                  date = new Date(createdAt.seconds * 1000);
                }

                return (
                  <>
                    {sendersUID !== authentication.currentUser.uid ? (
                      <div key={index} style={{ marginTop: "20px" }}>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <div style={{ display: "flex", alignItems: "end" }}>
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "gray",
                                opacity: "0.2",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div>{`${receiver.split(" ")[0][0]}${
                                receiver.split(" ")[1][0]
                              }`}</div>
                            </div>
                          </div>
                          <div
                            className="msg-container"
                            style={{
                              backgroundColor: "rgb(239, 243, 244)",
                              width: "60%",
                              borderTopLeftRadius: "15px 15px",
                              borderTopRightRadius: "15px 15px",
                              borderBottomRightRadius: "15px 15px",
                              color: "#0f1419",
                              fontSize: "15px",
                            }}
                          >
                            <div style={{ padding: "10px" }}>{message}</div>
                          </div>
                        </div>
                        <span
                          style={{
                            display: "flex",
                            width: "60%",
                            paddingLeft: "50px",
                            color: "#536471",
                            fontSize: "11px",
                          }}
                        >
                          {getFormattedDate(date)}
                        </span>
                      </div>
                    ) : (
                      <div key={index} style={{ marginTop: "20px" }}>
                        <div
                          className="msg-container"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            paddingRight: "20px",
                          }}
                        >
                          <span className={{ width: "60%" }}>
                            <div
                              style={{
                                padding: "10px",
                                width: "180px",
                                backgroundColor: "#1d9bf0",
                                borderTopLeftRadius: "15px 15px",
                                borderTopRightRadius: "15px 15px",
                                borderBottomLeftRadius: "15px 15px",
                                color: "#fff",
                                fontSize: "15px",
                              }}
                            >
                              {message}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                color: "#536471",
                                fontSize: "11px",
                              }}
                            >
                              {getFormattedDate(date)}
                            </div>
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
          </>
        )}
      </div>
      <div
        id="msg-form"
        style={{
          width: "100%",
          backgroundColor: "white",
          borderTop: "solid 1px #eff3f4",
          height: "50px",
          paddingLeft: "10px",
        }}
      >
        <Form onSubmit={sendMessage} name="msgForm" id="msgForm">
          <Form.Group controlId="message">
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  borderRadius: "20px",
                  border: "1px solid #e2e8eb",
                  height: "30px",
                  alignItems: "center",
                  paddingLeft: "10px",
                  display: "flex",
                  width: "230px",
                }}
              >
                <input
                  type="text"
                  value={message}
                  placeholder="Start a new message"
                  onChange={({ target }) => {
                    setMessage(target.value);
                    onSnapshot(collection(db, "messages"), (snapshot) => {
                      const data = snapshot.docs.map((doc) => doc.data());
                      const sentMessages = data
                        .filter(
                          (message) => message?.receiversUID === receiversUID
                        )
                        .filter(
                          (message) =>
                            message?.sendersUID ===
                            authentication.currentUser.uid
                        );
                      const receivedMessages = data
                        .filter(
                          (message) =>
                            message?.receiversUID ===
                            authentication.currentUser.uid
                        )
                        .filter(
                          (message) => message?.sendersUID === receiversUID
                        );
                      setMessages(
                        [...sentMessages, ...receivedMessages].sort(
                          (a, b) =>
                            a?.createdAt?.seconds - b?.createdAt?.seconds
                        )
                      );
                      // const unseenMsgs = allMessages.filter( msg => msg.sendersUID === receiver).filter(msg => msg?.receiversUID === authentication.currentUser.uid).filter(msg => msg?.read !== true) + unread
                      // setUnread(unseenMsgs)
                    });
                  }}
                  style={{
                    backgroundColor: "#f7f9f9",
                    height: "20px",
                    border: "none",
                  }}
                />
              </div>
              {message.length > 0 ? (
                <button
                  type="submit"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    border: "none",
                  }}
                >
                  <i
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: "#f7f9f9",
                    }}
                  >
                    <AiOutlineSend style={{ color: "#1d9bf0" }} />
                  </i>
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    border: "none",
                  }}
                  disabled
                >
                  <i
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: "#f7f9f9",
                    }}
                  >
                    <AiOutlineSend style={{ color: "#1d9bf0" }} />
                  </i>
                </button>
              )}
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
export default Chat;
