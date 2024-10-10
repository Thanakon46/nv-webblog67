const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const CapController = require('./controllers/CapController');

let multer = require("multer")

// upload section
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now());
        console.log(file);
        callback(null, file.originalname);
    }
})
let upload = multer({ storage: storage }).array("userPhoto", 10)

module.exports = (app) => {
    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);
    app.post('/cap', CapController.create);
    app.put('/cap/:capId', CapController.put);
    app.delete('/cap/:capId', CapController.remove);
    app.get('/cap/:capId', CapController.show);
    app.get('/caps', CapController.index);

    // upload
    app.post("/upload", function (req, res) {
        // isUserAuthenticated,
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        })
    }),

    //delete file uploaded function
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs'); 
            console.log(req.body.filename)

            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
                if (err) throw err;
                res.send("Delete sucessful")
                // console.log('successfully deleted material file');
            });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete file the material'
            })
        }
    })
}