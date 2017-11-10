var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var aws = require('aws-sdk');


var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//---------------------------------------------------------------------------------
// //AWS architecture
// app.engine('html', require('ejs').renderFile);
// const S3_BUCKET = process.env.S3_BUCKET;

// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// /*
//  * Configure the AWS region of the target bucket.
//  * Remember to change this to the relevant region.
//  */
// aws.config.region = 'eu-west-2';

// /*
//  * Load the S3 information from the environment variables.
//  */
// const S3_BUCKET = process.env.S3_BUCKET;

// /*
//  * Respond to GET requests to /account.
//  * Upon request, render the 'account.html' web page in views/ directory.
//  */
// app.get('/info', (req, res) => res.render('info.html'));

// /*
//  * Respond to GET requests to /sign-s3.
//  * Upon request, return JSON containing the temporarily-signed S3 request and
//  * the anticipated URL of the image.
//  */
// app.get('/sign-s3', (req, res) => {
//     const s3 = new aws.S3();
//     const fileName = req.query['file-name'];
//     const fileType = req.query['file-type'];
//     const s3Params = {
//         Bucket: S3_BUCKET,
//         Key: fileName,
//         Expires: 60,
//         ContentType: fileType,
//         ACL: 'public-read'
//     };

//     s3.getSignedUrl('putObject', s3Params, (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.end();
//         }
//         const returnData = {
//             signedRequest: data,
//             url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
//         };
//         res.write(JSON.stringify(returnData));
//         res.end();
//     });
// });

// /*
//  * Respond to POST requests to /submit_form.
//  * This function needs to be completed to handle the information in
//  * a way that suits your application.
//  */
// app.post('/save-details', (req, res) => {
//     // TODO: Read POSTed form data and do something useful
// });
//----------------------------------------------------------------------------------

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
