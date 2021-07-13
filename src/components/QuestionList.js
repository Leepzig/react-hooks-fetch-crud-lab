import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList(props) {

  const [questions, setQuestions] = useState([])

  useEffect( () => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  }, [])

  const handleDelete = (id) => {
    fetch("http://localhost:4000/questions/" + id, {
      method:"DELETE",
      headers:{"Content-Type":"application/json"}
    })
    const newQuestions = questions.filter(question => question.id !== id)
    setQuestions(newQuestions)
  }

  const handleQuestionUpdate = (id, e) => {
    const value = e.target.value
    const question = questions.find(question => question.id === id)

    fetch("http://localhost:4000/questions/" + id, {
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({...question, correctIndex:value})
    })
  }


  const allQuestions = questions.map(question => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} handleQuestionUpdate={handleQuestionUpdate}/>)


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{allQuestions}</ul>
    </section>
  );
}

export default QuestionList;
