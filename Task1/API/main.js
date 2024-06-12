const express = require('express');
const cors = require('cors');
const dbHelper = require('./helpers/db-helpers');
const bodyParser = require('body-parser');
const TODO = require('../API/TO-DO/model/model');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(3001, async (err) => {
  if (err) {
    console.log('console error', err);
    return;
  }
  console.log('Express framework started here');
  
  try {
    await dbHelper.connection();
    console.log(`DB Connected`);
  } catch (err) {
    console.log('DB connection failed. The error is', err);
  }

    app.post("/", async (req, res) => {
        const { note } = req.body;
        console.log(note);
        const data = {
          id:note.id,
          Title: note.title,
          content: note.content
        };
        const result = await TODO.insertMany(data);
        console.log(result);
      });
    
    app.delete("/note/:id",async(req,res)=>{
      const _id = req.params.id;
      console.log(_id);
      const filter={id:_id};
      await TODO.deleteOne(filter);
  });
  app.patch("/update/:id",async(req,res)=>{
    const id3  = req.params.id;
    const {title,content} = req.body;
    console.log(title);
    console.log(content);
    console.log(id3);
    const filter={id:id3}
   const result = await TODO.updateOne(filter, { Title: title, content: content }, { new: true });
   console.log(result);
  });
});