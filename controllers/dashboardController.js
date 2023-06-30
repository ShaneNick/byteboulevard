const { User, BlogPost, Comment } = require('../models');

const getDashboard = async (req, res) => {
    try {
        // Fetch user's posts
        const blogPosts = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            },
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

        // Render dashboard page with user's posts
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getEditPost = async (req, res) => {
    try {
        // Fetch the post to be edited
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

        // Check if the user owns the post
        if (blogPost.user_id !== req.session.user_id) {
            res.status(403).json({ message: 'You do not have permission to edit this post' });
            return;
        }

        // Serialize data
        const post = blogPost.get({ plain: true });

        // Render edit page with the post data
        res.render('edit-post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const addPost = async (req, res) => {
    try {
        // Validate inputs
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        // Add new post
        const newPost = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        // Redirect to dashboard
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred while creating the post', error: err });
    }
};

const updatePost = async (req, res) => {
    try {
        // Validate inputs
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        // Fetch the post to be updated
        const blogPost = await BlogPost.findByPk(req.params.id);

        if (!blogPost) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        // Check if the user owns the post
        if (blogPost.user_id !== req.session.user_id) {
            return res.status(403).json({ message: 'You do not have permission to edit this post' });
        }

        // Update the post
        await blogPost.update({
            title: req.body.title,
            content: req.body.content
        });

        // Redirect to dashboard
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred while updating the post', error: err });
    }
};

// ...


const deletePost = async (req, res) => {
    try {
        // Delete the post
        const deletedPost = await BlogPost.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // Redirect to dashboard
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getDashboard,
    getEditPost,
    addPost,
    updatePost,
    deletePost
};