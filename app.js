import cors from "cors";
import {config} from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import taskRoute from "./routes/taskRoute";
import userRoute from "./routes/userRoute";

config();
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({
    //origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); // folder to upload files

global.__basedir = __dirname; // very important to define base directory of the project. this is useful while creating upload scripts

// Routes
app.get('/', (req, res, next) => {
    try {
        res.json({
            status: 'success', message: 'Welcome 🙏',
        });
    } catch (err) {
        return next(err);
    }
});
app.use([taskRoute, userRoute]); // you can add more routes in this array

//404 error
app.get('*', function (req, res) {
    res.status(404).json({
        message: 'What?? 🙅',
    });
});

//An error handling middleware
app.use((err, req, res, next) => {
    console.log('🐞 Error Handler');

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status, message: err.message, err: err,
    });
});

// Run the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🐹 app listening on http://localhost:${port}`));
