// HomeController.js

const { BlogPost, User, Comment } = require('../models');

const getPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        // Serialize data
        const posts = blogPosts.map((post) => post.get({ plain: true }));

        // Render home page with all posts
        res.render('home', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        if (!blogPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // Serialize data
        const post = blogPost.get({ plain: true });

        // Render post page with the post data
        res.render('post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getPosts,
    getPostById
};
