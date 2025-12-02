import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";   // use promise-based API
import { clusterStrings } from "./embeddings.js";

import { askGemini } from "./answer-bot.js";

//DB CONNECT
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satyam721",
  database: "test"
});




dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Test GET route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// DOUBT SECTION (Write)

app.post("/doubt", async(req, res) => {
  const { sname,subject, topic, doubt, type } = req.body;

  console.log("Received data from client:", subject, topic, doubt);
    // Here, you can add code to store the doubt in a database

    let query = 'INSERT INTO doubt (sname,subject, topic, doubt,type) VALUES (?, ?, ?, ?, ?)';
    let values = [sname,subject, topic, doubt,type];

    try{
      connection.query(query,values,(error,result)=>{   //if there is any '?' it will take elemnt from data
          if(error) throw(error);
          console.log(result);     //returns an array
      });
    } catch(e){
      console.log(e);
    }


  res.json({
    received: { sname,subject,topic,doubt,type }
  });
});

// DOUBT FETCH SECTION (Read)
app.get("/doubtfetch",async(req,res)=>{
  let query = 'SELECT subject,doubt,type,answer FROM doubt';
  try{
    connection.query(query,(error,result)=>{
        if(error) throw(error);
        console.log(result);     //returns an array
        
        res.json(result);
    });
  } catch(e){
    console.log(e);
  }
})


app.get("/doubtteacher", (req, res) => {
  const query = 'SELECT sname, doubt, subject FROM doubt WHERE type="pending"';

  connection.query(query, async (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Database error" });
    }

    const doubtlist = result.map(row => row.doubt);
    console.log("DOUBT LIST:", doubtlist);

    try {
      const groups = await clusterStrings(doubtlist, { threshold: 0.65 });
      console.log("GROUPS:", groups);

      const doubtClusters = {};

      groups.forEach((group, i) => {
        const clusterItems = group.map(text => {
          const row = result.find(r => r.doubt === text);
          return {
            student: row ? row.sname : null,
            doubt: text,
            subject: row ? row.subject : null,
            time: "2 min ago"
          };
        });

        doubtClusters[i + 1] = clusterItems;
      });

      console.log("DOUBT CLUSTERS:", doubtClusters);

      // ensure getAnswer returns the model output
      async function getAnswer(question) {
        const answer = await askGemini(question); // answer will be an array
        console.log("gemini answer:-", answer);
        return answer;
      }

      const answers = [];



      //Get answers of the first doubt of each cluster through gemini ai
      for (const clusterId in doubtClusters) {
        const firstDoubt = doubtClusters[clusterId][0];
        const question = firstDoubt ? firstDoubt.doubt : null;

        try {
          const answer = await getAnswer(question);
          answers.push({
            clusterId,
            question,
            answer
          });
        } catch (err) {
          console.error(`Error getting answer for cluster ${clusterId}:`, err);
          answers.push({
            clusterId,
            question,
            answer: null,
            error: err.message
          });
        }
      }

      console.log("ANSWERS GENERATED:", answers);



      return res.json({
        doubtClusters,
        answers
      });
    } catch (err) {
      console.error("Error while clustering:", err);
      return res.status(500).json({ error: "Clustering error" });
    }
  });
});




// app.get("/doubtteacher", (req, res) => {
//   const query = 'SELECT sname, doubt, subject FROM doubt WHERE type="pending"';

//   connection.query(query, async (error, result) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({ error: "Database error" });
//     }

//     // result is an array of { sname, doubt }
//     const doubtlist = result.map(row => row.doubt);
//     console.log("DOUBT LIST:", doubtlist);

//     try {
//       // clusterStrings returns something like: [ [text1, text2], [text3], ... ]
//       const groups = await clusterStrings(doubtlist, { threshold: 0.65 });
//       console.log("GROUPS:", groups);

//       const doubtClusters = {};

//       groups.forEach((group, i) => {
//         // group = array of doubt texts
//         const clusterItems = group.map(text => {
//           // find the original row for this text
//           const row = result.find(r => r.doubt === text);
//           return {
//             student: row ? row.sname : null,
//             doubt: text,
//             subject: row ? row.subject : null,
//             time: "2 min ago" // Placeholder; replace with actual timestamp if available
//           };
//         });

//         doubtClusters[i + 1] = clusterItems;
//       });

//       console.log("DOUBT CLUSTERS:", doubtClusters);


//       //Getting answers from AI
//       async function getAnswer(question) {
//         const answer=await askGemini(question);
//         console.log("gemini answer:- "+answer);
//       }
//       console.log("First doubt to get answer for:", doubtClusters[0]);
//       getAnswer(doubtClusters[0][0].doubt);


//       // Decide what you want to send to client
//       return res.json({
//         doubtClusters
//       });

      

//     } catch (err) {
//       console.error("Error while clustering:", err);
//       return res.status(500).json({ error: "Clustering error" });
//     }
//   });
// });






app.post("/doubtanswer", (req, res) => {
    const { questions, answer } = req.body;

    console.log("---- RECEIVED DOUBT ANSWERS ----");

    console.log("Answer: ", answer);
    
    console.log("Questions received:");
    console.log(questions);


    // if (Array.isArray(questions)) {
    //     questions.forEach((q, i) => {
    //         console.log(`${i + 1}. Student: ${q.student}`);
    //         console.log(`   Doubt: ${q.doubt}`);
    //     });
    // } else {
    //     console.log("No questions received or invalid format.");
    // }

    for(let i=0;i<questions.length;i++){
      let query = 'UPDATE doubt SET answer=?, type="answered" WHERE doubt=?';
      let values = [answer,questions[i].doubt];

       try{
        connection.query(query,values,(error,result)=>{   //if there is any '?' it will take elemnt from data
            if(error) throw(error);
            console.log(result);     //returns an array
        });
      } catch(e){
        console.log(e);
      }

    }
    return res.json({
        status: "success",
        message: "Answer and questions received.",
        received: { questions, answer }
    });
});

//to change the type of doubt for students

app.post("/doubttype", (req, res) => {
    const {question} = req.body;
    console.log(question)
    let query = `UPDATE doubt SET type="resolved" WHERE doubt="${question}" `;
    try{
        connection.query(query,(error,result)=>{
            if(error) throw(error);
            console.log(result);     //returns an array
            
            res.json(result);
        });
    } catch(e){
        console.log(e);
    }
    return 
});


app.post("/assignmentnotes", (req, res) => {
  const { title, editorContent, subject, classGrade, topic, tags } = req.body;

  console.log("Received assignment notes:");
  console.log("Title:", title);
  console.log("Content:", editorContent);
  console.log("Subject:", subject);
  console.log("Class Grade:", classGrade);
  console.log("Topic:", topic);
  console.log("Tags:", tags);
  // Here, you can add code to store the notes in a database
  try{
    let query = 'INSERT INTO assignment (title, editorContent, subject, classGrade, topic) VALUES (?, ?, ?, ?, ?)';
    let values = [title, editorContent, subject, classGrade, topic]
    connection.query(query,values,(error,result)=>{   
        if(error) throw(error);
        console.log(result);     
    });
  }
  catch(e){
    console.log(e);
  }

  res.json({ status: "success", message: "Notes received." });
});

//go to CONTENT.JSX
app.post("/assignmentnotesfetch",(req,res)=>{
    let query = 'SELECT editorContent, title, subject, classGrade, topic FROM assignment';
    try{
      connection.query(query,(error,result)=>{
          if(error) throw(error);
          console.log(result);     //returns an array
          
          res.json(result);
      });
    } catch(e){
      console.log(e);
    }

})



















const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
