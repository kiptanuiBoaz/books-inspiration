const express = require('express');
const mysql = require("mysql");
const cors = require("cors");
const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user: 'root',
    password:"@Serem123",
    database:"test"
})

// ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '@Serem123';

app.get("/", (req, res) => {
    res.json({"msg":"Hello World!"})
})

app.get("/books", (req, res) => {
    const queryAllBooks = "SELECT * FROM books";

    db.query(queryAllBooks, (err, data)=>{
        if(err){
            return res.status(500).json({"message": err.message});
        }else{
            return res.json(data);
        }
    }); 
})

app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const queryBook = "SELECT * FROM books  WHERE id = ?";
    
    db.query(queryBook,[bookId], (err, data)=>{
        if(err){
            console.log(err);
            return res.status(500).json({"message": err.message});
        }else{

            return res.json(data[0]);
        }
    }); 
})


app.post("/books",(req,res)=>{
    const addBooksQuery = "INSERT INTO books (`title`,`description`,`cover`,`price`) VALUES(?)"
    const values = Object.values(req.body);

    db.query(addBooksQuery,[values],(err,data)=>{
        if (err) return res.json(err.message);
        return res.json(data)

    })
})

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const deleteQuery = "DELETE FROM books WHERE id = ?"

    db.query(deleteQuery, [bookId], (err,data)=>{
        if (err) return res.json(err.message);
        return res.json(data)

    })
})

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const updateQuery = "UPDATE books SET `title`= ?, `description` = ?,  `price` = ?,  `cover` = ? WHERE  id = ? ";

    const values = Object.values(req.body)
    

    db.query(updateQuery, [...values, bookId], (err,data)=>{
        if (err){
            console.log(err);
            return res.json(err.message);
        }else{
            return res.json(data);
        }
        

    })
})


app.listen(PORT, ()=>{
    console.log("server running on port 8080...")
})