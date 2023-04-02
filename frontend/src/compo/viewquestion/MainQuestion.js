
import React, { useEffect, useState } from "react";
// import BookmarkIcon from "@material-ui/icons/Bookmark";
// import HistoryIcon from "@material-ui/icons/History";
import ReactQuill from "react-quill";
import Editor from "react-quill";
import axios from "axios";
import parse from 'html-react-parser';
import { Link, useParams } from "react-router-dom";
import { API } from "../login/global";
import "./index.css";

function MainQuestion() {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], 
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], 
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], 
    [{ indent: "-1" }, { indent: "+1" }], 
    [{ direction: "rtl" }], 

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [
      { color: ["#ff0000", "#00ff00", "#0000ff", "#220055"] },
      { background: [] },
    ], 
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], 
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };
  
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const {id}=useParams()
  // console.log(id)
  
  // let search = window.location.search;
  // console.log("search")
  // const params = new URLSearchParams(search);
  // console.log(params)

  // const id = params.get("/");
const intial={
  title:'',
  body:'',

}
  const [questionData, setQuestionData] = useState(intial);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState(""); 
  const [comments, setComments] = useState([]); 
// console.log(comments)
  function handleQuill(value) {
    setAnswer(value);
  }
  function getFunctionDetails() {
    fetch(`${API}/askquestion/${id}`)
    .then((data)=> data.json())
    .then((res) =>{
      setQuestionData(res)
      // console.log(res)
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
     
        // .get(`${API}/askquestion/${id}`)
        // .then((res) => setQuestionData(res.data[0]))
        // .catch((err) => console.log(err));
        getFunctionDetails()
        getUpdatedAnswer();
        getAnswer()
        
  }, []);

  async function getUpdatedAnswer() {
    // console.log(id)
    await axios
      .get(`${API}/comment/${id}`)
      .then((res) => {setComments(res.data)
      console.log(res.data.comment)})
      .catch((err) => console.log(err));
  }
  async function getAnswer() {
    await axios
      .get(`${API}/answer/${id}`)
      .then((res) => {setAnswers(res.data)
      console.log(res.data)})
      .catch((err) => console.log(err))

  }
  const handleSubmit = async () => {
    const body = {
      question_id: id,
      answer: answer,
      
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(`${API}/answer/${id}`, body, config)
      .then(() => {
        alert("Answer added successfully");
        setAnswer("");
        getAnswer();
      })
      .catch((err) => console.log(err));
  };
// console.log(show)
  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        
      };
      await axios.post(`${API}/comment/${id}`, body).then((res) => {
        setComment("");
        setShow(false);
        getUpdatedAnswer();
        
      });
    }

  }
console.log(answers.length)
  return (
    <div className="main">
        {questionData ===""?<h2>Loading...</h2>:
        <div>
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questionData?.title} </h2>
          <Link to="/askquestion">
            <button className="ask-question">Ask Question</button>
          </Link>
          
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Asked
              {/* <span>{new Date(questionData?.created_at).toLocaleString()}</span> */}
            </p>
            <p>
              Active<span>today</span>
            </p>
            <p>
              Viewed<span>43times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>

                
              </div>
              <p>{parse(questionData?.body)}</p>

            </div>
            <div className="question-answer">

              <div className="author">
                
                
              </div>
              <div className="comments">
                <div className="comment">
                  {
                   comments ? comments.map((_qd) => (
                      <p key={_qd?._id}>
                        {_qd.comment}{" "}
                        <span>
                           {_qd.name ? _qd.name : " "}
                        </span>{" "}
                        {"    "}
                        <small>
                          {new Date(_qd.createdAt).toLocaleString()}
                        </small> 
                      </p>
                    )) :" "}
                </div> 
                 <p className="add-comment" onClick={() => setShow(!show)}>Add a comment  -onclick</p> 
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                        width:"700px"
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={handleComment}
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                )}
                <span>{answers.length}ANSWES</span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
          }}
          className="all-questions"
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            {/* {questionData && questionData?.answerDetails.length} Answers */}
          </p>
          {answers.map((_q) => (
            <>
            <hr></hr>
              <div
                style={{
                  borderBottom: "1px solid #eee",
                }}
                key={_q._id}
                className="all-questions-containers"
              >
                <div className="all-questions-lefts">
                  <div className="all-options">
                    <p className="arrow">▲</p>

                    <p className="arrow">0</p>

                    <p className="arrow">▼</p>
                    </div>
                    <div>
                    {parse(_q.answer)}
                    </div>

                    
                 
                </div>
                <div className="question-answer">

                  
                  <div className="author">
                    <small>
                      {/* asked {new Date(_q.created_at).toLocaleString()} */}
                    </small>
                    <div className="auth-details">
                      {/* <p>
                        {_q?.user?.displayName
                          ? _q?.user?.displayName
                          : "Natalia lee"}
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))} 
        </div>
       
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          modules={Editor.modules}
          className="react-quill"
          theme="snow"
          style={{
            height: "200px",
          }}
        />
      </div>
      <br></br>
      <br></br>
      <button
        onClick={handleSubmit}
        
      >
       post the answer
      </button>
      
      </div>
}
    </div>
  );
}

export default MainQuestion;
