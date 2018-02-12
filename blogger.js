module.exports = function (models) {


    /*Cover page of all blog entries*/ 
const allBlogs = function (req, res, next) {
    models.blog.find({}, function (err, results) {
        if (err) {
            return next(err);
        } else {       
            res.json(results);
        }
    })
};

/*make a new blog entry*/

const entry = function (req, res, next) {
    var blogTitle = req.body.blogTitle;

    models.blog.findOne({
        title : req.body.blogTitle
    }, function (err, blog) {
        if (err) {
            return next(err);
        }
        if (!blog) {
            models.blog.create({
                blogTitle: req.body.blogTitle,
                date: req.body.blogDate,
                blogText: req.body.blogText  
            });
        }
        if (blog) {
        }
        else {
            return next(err);
        }
    })
    res.send("new entry sent to database");
}

const deletePost = function (req, res, next) {

    models.blog.remove({
        _id: req.params.id
    }, function (err, results) {
        if (err) {
            console.log(err);
            
            return next(err);
        } 
        if (results) {
console.log("success!");
        }
    })
}

return {
    allBlogs,
    entry,
    deletePost
}


} /*End*/
