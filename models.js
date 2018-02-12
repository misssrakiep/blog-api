const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function (mongoUrl) {
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl , function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("We are connected to: " + mongoUrl);
    }
});

/*format in which data will be sent to the blog*/
var blogSchema = new Schema({
    blogTitle: String,
    date: String,
    blogText: String
});

const blog = mongoose.model('blog', blogSchema);

return {
    blog
}

} /*end of export*/