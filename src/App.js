// import React, { useState, useRef, useEffect } from "react";
// import { FiPaperclip } from "react-icons/fi";
// import { IoPersonCircle } from "react-icons/io5";
// import { GiFarmer } from "react-icons/gi";
// import { FaPaperPlane } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import "./App.css";

// const ChatInterface = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [conversationId,setConversationId] = useState("");
//   const [chats, setChats] = useState({}); // Stores chat history by date
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [isConnected, setIsConnected] = useState(false);
//   const [responseStatus, setResponseStatus] = useState(false);
//   const [wsLoading, setwsLoading] = useState(true);
//   const token = useRef(null);
//   const clientId = useRef(null);
//   const [loadResponse, setLoadResponse] = useState(false);
//   const [backendResponse, setBackendResponse] = useState('');
//   const ws = useRef(null);
//   const response = useRef('');
//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const textareaRef = useRef(null);
//   const chatBoxRef = useRef(null);
//   const navigate = useNavigate();

//   // Function to start a new chat
//   const handleNewChat = () => {
//     if (messages.length > 0) {
//       const today = new Date();
//       const formattedDate = formatDate(today);
//       // Save current chat to history
//       setChats((prevChats) => ({
//         ...prevChats,
//         [formattedDate]: { text: messages[0].text || "Sent a file" }, // Use first message as preview
//       }));
//     }
//     // Clear current chat
//     setMessages([]);
//     setInput("");
//     setSelectedFile(null);
//     setFileName("");
//     setLoading(false);
//     setBackendResponse('');
//     resetTextareaHeight();
//     scrollToBottom();
//   };

  // const getCookie = (name) => {
  //   let cookieArray = document.cookie.split("; ");
  //   for (let cookie of cookieArray) {
  //     let [key, value] = cookie.split("=");
  //     if (key === name) {
  //       return value;
  //     }
  //   }
  //   return null;
  // };

//   useEffect(() => {
//     const getUser = async () => {
//       let access_token = getCookie("access_token");
//       token.current = access_token;
//       try {
//         const response = await axios.get('http://localhost:8000/auth/get-user/', {
//           headers: {
//             'Authorization': `Bearer ${access_token}`,
//           },
//         });
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
//     getUser();
//   }, []);

//   useEffect(() => {
//     if (backendResponse) {
//       setMessages((prev) => [...prev, { text: backendResponse, sender: "ai" }]);
//       setLoading(false);
//       scrollToBottom();
//     }
//   }, [backendResponse]);

//   const MAX_RETRIES = 5;
//   let retryCount = 0;

//   const handleUserQuestion = () => {
//     if (conversationId){
//       axios.post(`http://localhost:8000/chatbot/send-message/${conversationId}/`,{ question: input },{
//         headers:{
//           Authorization: `Bearer ${token.current}`
//         }
//       })
//         .then((response) => {
//           setResponseStatus(false);
//           setMessages((prev) => [...prev, { text: response.data.response, sender: "ai" }]);
//           setInput("");
//         })
//         .catch((error) => {
//           console.error("Error sending question:", error);
//         });
//     }else{
//       axios.post('http://localhost:8000/chatbot/send-message/',{ question: input },{
//         headers:{
//           Authorization: `Bearer ${token.current}`
//         }
//       })
//         .then((response) => {
//           setResponseStatus(false);
//           setConversationId(response.data.conversation_id)
//           setMessages((prev) => [...prev, { text: response.data.response, sender: "ai" }]);
//           setInput("");
//         })
//         .catch((error) => {
//           console.error("Error sending question:", error);
//         });
//     }
   
//   };

//   const sendMessage = () => {
//     setBackendResponse('');
//     setResponseStatus(true);
//     handleUserQuestion();
//     if (input.trim() === "" && !selectedFile) return;

//     const today = new Date();
//     const formattedDate = formatDate(today);

//     const newMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setChats((prevChats) => {
//       const updatedChats = { ...prevChats };
//       if (!updatedChats[formattedDate]) {
//         updatedChats[formattedDate] = newMessage;
//       }
//       return updatedChats;
//     });
//     setInput("");
//     textareaRef.current?.focus();
//     setSelectedFile(null);
//     setFileName("");
//     resetTextareaHeight();
//     setLoading(true);
//   };

//   const formatDate = (date) => {
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);
//     if (date.toDateString() === today.toDateString()) return "Today";
//     if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
//     return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     adjustTextareaHeight();
//   };

//   const adjustTextareaHeight = () => {
//     const textarea = textareaRef.current;
//     if (textarea) {
//       textarea.style.height = "24px";
//       textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
//     }
//   };

//   const resetTextareaHeight = () => {
//     const textarea = textareaRef.current;
//     if (textarea) {
//       textarea.style.height = "24px";
//     }
//   };

//   const scrollToBottom = () => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   };

//   const handleLogoutClick = () => {
//     setIsLogoutModalOpen(true);
//   };

//   const confirmLogout = () => {
//     console.log("User logged out");
//     setIsLogoutModalOpen(false);
//     navigate("/");
//   };

//   const cancelLogout = () => {
//     setIsLogoutModalOpen(false);
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <div className="chat-container">
//       <div className="sidebar">
//         <h3 className="sidebar-title">Recent Searches</h3>
//         {Object.keys(chats).length === 0 ? (
//           <p className="empty-sidebar">No recent searches</p>
//         ) : (
//           Object.entries(chats).map(([date, chat], index) => (
//             <div key={index} className="date-section">
//               <p className="date-header">{date}</p>
//               <p className="chat-item">{chat.text || "Sent a file"}</p>
//             </div>
//           ))
//         )}
//         <button className="new-chat-btn" onClick={handleNewChat}>
//           New Chat
//         </button>
//       </div>
//       <div className="chat-main">
//         <div className="chat-header">
//           <div className="header-center">
//             <GiFarmer className="header-icon" />
//             <h1 className="header-title">GreenDale</h1>
//           </div>
//           <div className="profile-container">
//             <IoPersonCircle className="account-icon" onClick={handleLogoutClick} />
//           </div>
//         </div>
//         <div className="chat-box" ref={chatBoxRef}>
//           {messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.sender}`}>
//               {msg.file && (
//                 <img
//                   src={msg.file}
//                   alt={msg.fileName}
//                   className="chat-image"
//                 />
//               )}
//               {msg.text && <p>{msg.text}</p>}
//             </div>
//           ))}
//           {responseStatus && (
//             <div className="loading-message">
//               <GiFarmer className="bouncing-icon" />
//               <span className="loading-text">Typing...</span>
//             </div>
//           )}
//         </div>
//         <div className="input-box-container">
//           <div className="input-box">
//             {selectedFile && (
//               <div className="preview-container">
//                 <img
//                   src={selectedFile}
//                   alt={fileName}
//                   className="preview-image"
//                 />
//                 <button className="remove-image" onClick={() => setSelectedFile(null)}>×</button>
//               </div>
//             )}
//             <textarea
//               ref={textareaRef}
//               value={input}
//               onChange={handleInputChange}
//               placeholder="How can GreenDale help?..."
//               className="chat-textarea"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   sendMessage();
//                 }
//               }}
//             />
//             <button className="send-btn" onClick={sendMessage}>
//               <FaPaperPlane className="send-icon" />
//             </button>
//           </div>
//         </div>
//         {isLogoutModalOpen && (
//           <div className="logout-modal">
//             <div className="modal-content">
//               <p>Are you sure you want to logout?</p>
//               <div className="modal-buttons">
//                 <button className="modal-yes" onClick={confirmLogout}>
//                   Yes
//                 </button>
//                 <button className="modal-no" onClick={cancelLogout}>
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;



import React, { useState, useRef, useEffect } from "react";
import { FiPaperclip } from "react-icons/fi";
import { IoPersonCircle } from "react-icons/io5";
import { GiFarmer } from "react-icons/gi";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./App.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [responseStatus, setResponseStatus] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [backendResponse, setBackendResponse] = useState('');
  const navigate = useNavigate();
  const token = useRef(null);
  const textareaRef = useRef(null);
  const chatBoxRef = useRef(null);

    const getCookie = (name) => {
    let cookieArray = document.cookie.split("; ");
    for (let cookie of cookieArray) {
      let [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
        const getUser = async () => {
          let access_token = getCookie("access_token");
          token.current = access_token;
          try {
            const response = await axios.get('http://localhost:8000/auth/get-user/', {
              headers: {
                'Authorization': `Bearer ${access_token}`,
              },
            });
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        getUser();
      }, []);

    useEffect(() => {
    if (backendResponse) {
      // setMessages((prev) => [...prev, { text: backendResponse, sender: "ai" }]);
      setLoading(false);
      scrollToBottom();
    }
  }, [backendResponse]);

  useEffect(() => {
    const fetchConversations = async () => {
      let access_token = getCookie("access_token");
      token.current = access_token;
      try {
        const response = await axios.get('http://localhost:8000/chatbot/conversations/', {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        });
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, []);

  const loadConversation = async (convId) => {
    setConversationId(convId);
    try {
      const response = await axios.get(`http://localhost:8000/chatbot/fetch-messages/${convId}/`, {
        headers: {
          'Authorization': `Bearer ${token.current}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleUserQuestion = () => {
    if (!input.trim()) return; // Prevent sending empty messages
  
    const userMessage = { sender: "user", content: input };
  
    setMessages((prev) => [...prev, userMessage]); // Add user's message to chat immediately
  
    if (conversationId) {
      axios
        .post(`http://localhost:8000/chatbot/send-message/${conversationId}/`, { question: input }, {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        })
        .then((response) => {
          const botMessage = { sender: "AI Chatbot", content: response.data.response, audio: response.data.audio_url };
          setMessages((prev) => [...prev, botMessage]);
        })
        .catch((error) => console.error("Error sending question:", error));
    } else {
      axios
        .post("http://localhost:8000/chatbot/send-message/", { question: input }, {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        })
        .then((response) => {
          setConversationId(response.data.conversation_id);
          const botMessage = { sender: "AI Chatbot", content: response.data.response, audio: response.data.audio_url };
          setMessages((prev) => [...prev, botMessage]);
        })
        .catch((error) => console.error("Error sending question:", error));
    }
  
    setInput(""); // Clear input field after sending
  };
  
      const handleInputChange = (e) => {
            setInput(e.target.value);
            adjustTextareaHeight();
          };

      const adjustTextareaHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
              textarea.style.height = "24px";
              textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
            }
          };
        
          const resetTextareaHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
              textarea.style.height = "24px";
            }
          };
        
          const scrollToBottom = () => {
            if (chatBoxRef.current) {
              chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
          };
        
          const handleLogoutClick = () => {
            setIsLogoutModalOpen(true);
          };
        
          const confirmLogout = () => {
            console.log("User logged out");
            setIsLogoutModalOpen(false);
            navigate("/");
          };
        
          const cancelLogout = () => {
            setIsLogoutModalOpen(false);
          };
        
          useEffect(() => {
            scrollToBottom();
          }, [messages]);
            

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h3 className="sidebar-title">Conversations</h3>
        {conversations.length === 0 ? (
          <p className="empty-sidebar">No conversations</p>
        ) : (
          conversations.map((conv) => (
            <p key={conv.id} className="chat-item" onClick={() => loadConversation(conv.id)}>
              Conversation {conv.id}
            </p>
          ))
        )}
        <button className="new-chat-btn" onClick={() => { setConversationId(null); setMessages([]); resetTextareaHeight(); scrollToBottom(); setLoading(false); setBackendResponse(''); setInput('')}}>New Chat</button>
      </div>
      <div className="chat-main">
        <div className="chat-header">
        <div className="header-center">
          <GiFarmer className="header-icon" />
          <h1 className="header-title">GreenDale</h1>
        </div>
        <div className="profile-container">
           <IoPersonCircle className="account-icon" onClick={handleLogoutClick} />
          </div>
        </div>
        <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === "AI Chatbot" ? "ai" : "user"}`}>
              <p>{msg.content}</p>
              {msg.audio && (
                <audio controls>
                  <source src={msg.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          ))}
          {responseStatus && (
            <div className="loading-message">
              <GiFarmer className="bouncing-icon" />
              <span className="loading-text">Typing...</span>
            </div>
          )}
        </div>
        <div className="input-box-container">
          <div className="input-box">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              placeholder="How can GreenDale help?..."
              className="chat-textarea"
              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleUserQuestion();
                                }
                              }}
            />
            <button className="send-btn" onClick={handleUserQuestion}>
              <FaPaperPlane className="send-icon" />
            </button>
          </div>
        </div>
        {isLogoutModalOpen && (
          <div className="logout-modal">
            <div className="modal-content">
              <p>Are you sure you want to logout?</p>
              <div className="modal-buttons">
                <button className="modal-yes" onClick={confirmLogout}>
                  Yes
                </button>
                <button className="modal-no" onClick={cancelLogout}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;

