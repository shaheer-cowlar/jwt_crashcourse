const router = require("express").Router();
const { publicPosts } = require("../db");
const { privatePosts } = require("../db");
const checkAuth = require("../routes/middleware/checkAuth")


router.get('/', (req, res) => {
  res.json({
    publicPosts
});
});

router.get('/private',checkAuth,(req,res)=>{
    res.json({
    privatePosts
    });
})
module.exports = router;