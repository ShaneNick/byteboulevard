const { BlogPost } = require('../models');

const createPost = async (req, res) => {
    try {
        const newPost = await BlogPost.create(req.body);
        res.status(201).json(newPost);
    } catch (err) {
        console.log(err); 
        res.status(500).json(err);
    }
};


const updatePost = async (req, res) => {
    try {
        const updatedPost = await BlogPost.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updatedPost[0]) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.json(updatedPost);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deletePost = async (req, res) => {
    try {
        const deletedPost = await BlogPost.destroy({
            where: { id: req.params.id }
        });
        if (!deletedPost) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(204).json({ message: 'Post deleted' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await BlogPost.findAll();
        const postsData = posts.map((post) => post.get({ plain: true }));
        res.render('home', { posts: postsData });
    } catch (err) {
        console.log("Error finding posts: " + err);
        res.status(500).json(err);
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await BlogPost.findByPk(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.json(post);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
