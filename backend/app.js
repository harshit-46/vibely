const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const apiAuthRoutes = require("./routes/apiAuth");
const apiPostRoutes = require("./routes/apiPosts");
const userModel = require('./models/user');
const postModel = require('./models/post');
const commentModel = require('./models/comment')
const upload = require('./middlewares/upload');
const cookieParser = require('cookie-parser');
const isLoggedIn = require('./middlewares/isLoggedin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use("/api/auth", apiAuthRoutes);
app.use("/api/posts", apiPostRoutes);

app.get("/", (req, res) => {
    if (req.cookies.token) {
        return res.redirect("/home");
    }
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { username, name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let user = await userModel.create({
        username,
        name,
        email,
        password: hash
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    res.cookie("token", token);
    res.redirect("/home");
});

app.get("/home", isLoggedIn, async (req, res) => {
    const posts = await postModel
        .find()
        .populate("userId", "username")
        .sort({ createdAt: -1 });
    res.render("home", { user: req.user, posts });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
        return res.redirect("/?error=notfound");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.redirect("/?error=invalid");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    res.cookie("token", token);
    res.redirect("/home");
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

app.get("/createpost", isLoggedIn, (req, res) => {
    let userdata = req.user;
    res.render("createpost", { userdata });
});

app.post("/createpost", isLoggedIn, upload.single("media"), async (req, res) => {
    const postData = {
        content: req.body.content,
        userId: req.user._id
    };

    if (req.file) {
        postData.imageUrl = req.file.path;
        postData.imagePublicId = req.file.filename;
    }

    await postModel.create(postData);
    res.redirect("/home");
});

app.get("/profile", isLoggedIn, async (req, res) => {
    let userdata = req.user;
    let posts = await postModel.find({ userId: userdata._id }).sort({ createdAt: -1 });
    res.render("profile", { userdata, posts });
});

app.get("/profile/:name", async (req, res) => {
    let username = req.params.name;
    let userdata = await userModel.findOne({ username });

    if (!userdata) return res.send("user not found");
    let posts = await postModel.find({ userId: userdata._id }).sort({ createdAt: -1 });
    res.render("profile", { userdata, posts });
});

app.get("/search", async (req, res) => {
    res.render("search", { users: [] });
});

app.get("/api/search", async (req, res) => {
    const query = req.query.query || "";

    const users = await userModel.find({
        $or: [
            { username: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } }
        ]
    }).select("username name bio");
    res.json(users);
});

app.get("/post/:id", isLoggedIn, async (req, res) => {
    const postId = req.params.id;

    const post = await postModel
        .findById(postId)
        .populate("userId");

    if (!post) {
        return res.status(404).send("Post not found");
    }

    const comments = await commentModel
        .find({ postId })
        .populate("userId")
        .sort({ createdAt: -1 });

    res.render("comment", {
        post,
        comments,
        currentUser: req.user
    });
});

app.post("/post/:id/comment", isLoggedIn, async (req, res) => {
    const postId = req.params.id;
    const { text } = req.body;
    if (!text || text.trim() === "") {
        return res.redirect(`/post/${postId}`);
    }
    await commentModel.create({
        userId: req.user._id,
        postId,
        text: text.trim()
    });
    res.redirect(`/post/${postId}`);
});

app.post("/post/:postid/comment/:commentid/delete", isLoggedIn, async (req, res) => {
    const { postid, commentid } = req.params;

    const comment = await commentModel.findById(commentid);

    if (!comment) {
        return res.redirect(`/post/${postid}`);
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
        return res.status(403).send("Unauthorized");
    }

    await commentModel.findByIdAndDelete(commentid);
    res.redirect(`/post/${postid}`);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});