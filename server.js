import express from "express";
import dotenv from 'dotenv';
import posts from './posts.js';

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json(posts);
});

app.get("/posts", (req, res) => {
    res.json([{ title: "Title One", body: "Title Two" }]);
});

app.get("/:Id", (req, res) => {
    const post = posts.filter(post => post.id == req.params.Id);
    res.json(post);
});

app.post("/new-post", (req, res) => {
    posts.push(req.body);
    // console.log(newPost);
    res.json(posts);
});

app.post("/update-post", (req, res) => {
    posts.map((post) => {
        if (post.id == req.body.id) {
            post.title = req.body.title;
            post.body = req.body.body;
        }
    });
    res.json(posts);
});

app.post("/delete-post", (req, res) => {
    let newPosts = posts.filter(post => post.id != req.body.id);
    res.json(newPosts);
});


app.listen(process.env.PORT, () => { console.log(`App is listen on port ${process.env.PORT}`); });

console.log("express");