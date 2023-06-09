const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
        // Fetch the post again, including its comments
        const updatedPost = await BlogPost.findByPk(req.body.post_id, {
            include: [
              { model: Comment, include: User }
            ]
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User }],
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that id!' });
            return;
        }

        const comment = commentData.get({ plain: true });

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;