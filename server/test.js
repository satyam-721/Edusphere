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
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


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
  const { title, editorContent, subject, classGrade, topic, tags, file,ytlink } = req.body;

  function toEmbedUrl(url) {
    if (!url.includes("watch?v=")) return null;

    const videoId = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  const Eytlink = toEmbedUrl(ytlink);

  

  try {
    let fileBuffer = null;
    let filename = null;
    let filetype = null;
    let filesize = null;


    // If file exists → decode Base64 → prepare buffer
    if (file && file.data) {
      const base64Data = file.data.split(",")[1];
      fileBuffer = Buffer.from(base64Data, "base64");

      filename = file.name || null;
      filetype = file.type || null;
      filesize = file.size || null;
    }

    // Insert into DB — file fields may be NULL
    let query = `
      INSERT INTO assignment 
      (title, editorContent, subject, classGrade, topic, file, filename, filetype, filesize, ytLink)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let values = [
      title,
      editorContent,
      subject,
      classGrade,
      topic,
      fileBuffer,   // NULL if no file
      filename,
      filetype,
      filesize,
      Eytlink
      
    ];
    console.log("File Buffer:", fileBuffer);
    console.log("Filename:", filename);
    console.log("Filetype:", filetype);
    console.log("Filesize:", filesize);

    connection.query(query, values, (error, result) => {
      if (error) throw error;
      console.log("DB Insert Result:", result);
      res.json({ status: "success", message: "Notes saved (file optional)." });
    });

  } catch (e) {
    console.log("Error:", e);
    res.status(500).json({ status: "error", message: "Failed to save notes." });
  }
});



//go to CONTENT.JSX and choice.jsx
app.post("/assignmentnotesfetch",(req,res)=>{
    let query = 'SELECT id, editorContent, title, subject, classGrade, topic, status, questions, file, filename, filetype, filesize, ytLink FROM assignment';
    try{
      connection.query(query,(error,result)=>{
          if(error) throw(error);
          console.log("THE RESULT IS: ",result);     //returns an array
          
          res.json(result);
      });
    } catch(e){
      console.log(e);
    }

})

app.post("/fetchaiquestions",(req,res)=>{
  let query='select editorContent from assignment where id=(select max(id) from assignment)';
  try{
    connection.query(query,(error,result)=>{
        if(error) throw(error);
        let content = result[0].editorContent;
        content=`You are a question-generation system. The content below is in HTML format. 
IGNORE all HTML tags completely and extract ONLY the meaningful text content.

Based on that extracted text, generate questions in these categories:
1. Multiple Choice Questions (mcq)
2. True/False questions (truefalse)
3. Short answer questions (short)

Follow these strict rules:

- Output MUST be a JSON array of objects.
- Each object must match exactly one of the following formats:

For MCQ:
{
    id: <number>,
    question: "<question text>",
    options: ["option1", "option2", "option3", "option4"],
    correct: <index of correct option starting from 0>,
    type: "mcq"
}

For True/False:
{
    id: <number>,
    question: "<question text>",
    answer: true OR false,
    type: "truefalse"
}

For Short Answer:
{
    id: <number>,
    question: "<question text>",
    type: "short"
}

Additional Requirements:
- Ignore all HTML tags completely.
- Use ONLY the text meaning from the provided content.
- IDs must be sequential starting from 1.
- Do NOT include explanations.
- Do NOT include extra fields.
- Ensure good conceptual variety.
- Maintain clarity and correctness.

`+content;
        
      function extractJsonFromMarkdown(text) {
        // remove ```json and ``` block markers
        // const cleaned = text
        //   .replace(/```json/i, "")
        //   .replace(/```/g, "")
        //   .trim();

        // try {
        //   return JSON.parse(cleaned);
        // } catch (err) {
        //   console.error("JSON Parse Error:", err);
        //   return null;
        // }

        return text;
      }

      async function getQuestion(content) {
        const rawAnswer = await askGemini(content);  // this returns markdown string
        console.log("gemini answer (raw):", rawAnswer);

        const parsed = extractJsonFromMarkdown(rawAnswer);  // convert to object
        console.log("gemini answer (parsed):", parsed);

        return parsed;
      }

        getQuestion(content).then(resultObj => {
          //output i am getting is string not json
          console.log(resultObj.text);
          const jsonString = resultObj.text
            .replace(/```json\n?/g, '')
            .replace(/```/g, '')
            .trim();

          const parsedQuestions = JSON.parse(jsonString);
          console.log("FINAL RESULT JSON:", parsedQuestions);
          

          res.json(parsedQuestions);  
        });



    });
  }
  catch(e){
    console.log(e);

  }
})

app.post("/saveQuestions", (req, res) => {
  let { sampleQuestions } = req.body;
  console.log("Received questions to save:", sampleQuestions);
  sampleQuestions=JSON.stringify(sampleQuestions);

  let query = `UPDATE assignment SET questions = ? ORDER BY id DESC LIMIT 1`;
  let values = [sampleQuestions];
  console.log(sampleQuestions);

  try{
    connection.query(query,values,(error,result)=>{   
        if(error) throw(error);
        console.log("QUESTIONSAVED : ",result);     //returns an array
    });
  } catch(e){
    console.log(e);
  }
});

app.post("/countAssignments",(req,res)=>{
  let query='select status, count(*) as total from assignment group by status order by status desc';
  try{
    connection.query(query,(error,result)=>{
        if(error) throw(error);
        console.log(result);     //returns an array
        res.json(result);
    });
  } catch(e){
    console.log(e);
  }
});

app.post("/countDoubts",(req,res)=>{
  let query='select count(*) as total from doubt';
  try{
    connection.query(query,(error,result)=>{
        if(error) throw(error);
        console.log(result);     //returns an array
        res.json(result);
    });
  } catch(e){
    console.log(e);
  }
});

app.post("/doubtSolved",(req,res)=>{
  let query='select count(*) as total from doubt where type="resolved" ';
  try{
    connection.query(query,(error,result)=>{
        if(error) throw(error);
        console.log(result);     //returns an array
        res.json(result);
    });
  } catch(e){
    console.log(e);
  }
});
    


app.post("/saveScore",(req,res)=>{
  let {id} =req.body;
  id=id+1;
  let query= `Update assignment set status='completed' where id = ? `
  let values=[id];
  try{
    connection.query(query,values,(error,result)=>{   
        if(error) throw(error);
        console.log(result);     //returns an array
    });
  } catch(e){
    console.log(e);
  }
})

app.post("/aianswer", async (req, res) => {
  let {text} = req.body;
  text=`I will give you a small piece of content. Your job is to generate a short, clear and simple answer based only on that content.
If an example is necessary for understanding, include one briefly.
Do not make the response long.
Here is the content: `+text;
  console.log("Received question for AI answer:", text);

  try {
    const answer = await askGemini(text); 
    // const answer=text;
    console.log("AI answer:", answer);

    res.json({
      answer
    });
  } catch (error) {
    console.error("Error getting AI answer:", error);
    res.status(500).json({ status: "error", message: "Failed to get AI answer." });
  }
});





























const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
