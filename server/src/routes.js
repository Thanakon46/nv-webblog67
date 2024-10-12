const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const CapController = require('./controllers/CapController');

let multer = require("multer");

// upload section
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        console.log(file);
        callback(null, file.originalname);
    }
});
let upload = multer({ storage: storage }).array("userPhoto", 10);

module.exports = (app) => {
    // User routes
    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);

    // Cap routes
    app.post('/cap', isAuthenController, CapController.create); // ใช้ isAuthenController เพื่อตรวจสอบการยืนยันตัวตน
    app.get('/caps', CapController.findAll);
    app.get('/cap/:id', CapController.findOne);
    app.put('/cap/:id', isAuthenController, CapController.update); // ใช้ isAuthenController เพื่อตรวจสอบการยืนยันตัวตน
    app.delete('/cap/:id', isAuthenController, CapController.delete); // ใช้ isAuthenController เพื่อตรวจสอบการยืนยันตัวตน

    // upload
    app.post("/upload", function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });

    // delete file uploaded function
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs');
            console.log(req.body.filename);

            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
                if (err) throw err;
                res.send("Delete successful");
            });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to delete the file'
            });
        }
    });
};
