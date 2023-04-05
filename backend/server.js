const express = require("express");
const cookieParser = require("cookie-parser");


const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
/* localhost:5000 去 frontend 的 package.json改一下*/
const port = 5000;

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// nodemailer related
/* app.use(express.static('src'))
app.use(cors()); */
// bodyParser 用来读取body里面的东西
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());


const apiRoutes = require("./routes/apiRoutes");

// 下面就是个middleware
app.get("/", async (req, res, next) => {
  res.json({ message: "API running..." });
});

// mongobd connection
const connectDB = require("./config/db");
const Product = require("./models/ProductModel");
connectDB();

app.use("/api", apiRoutes);

//自定义的middleware，来handle errors
app.use((error, req, res, next) => {
  /* 就是用env.NODE_ENV保护数据，如果黑客进来了，没有权限，也看不到error的消息 */
  if (process.env.NODE_ENV === "production") {
    //这个middleware仅仅showing the error in the console
    console.error(error);
  }
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({
      // message and stack 给我们展示了error的path to the file
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});


// nodemailer
/* var from;
var productName;
var description;
var path;

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage:Storage,
}).single('image');

app.post('/sendemail', (req, res) => {
  // exzecute this middleware to upload the image
  upload(req, res, function (err) {
    if (err) {
      console.log(from);
      console.log(productName);
      console.log(description);
      console.log(path);
      
      console.log(err);
      return res.end("something went wrong");
    } else {
      from = req.body.from;
      productName = req.body.productName;
      description = req.body.description;

      path = req.file.path

    }
  });
}); */



app.post("/sendemail", (req, res) => {
  const { from, productName, description } = req.body;
  const image = req.files.image;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from,
    to: "recipient_email_address@example.com",
    subject: `New product: ${productName}`,
    text: description,
    attachments: [
      {
        filename: image.name,
        content: image.data,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error: Could not send email");
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send("Email sent");
    }
  });
});

/* let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});
transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) {
  let mailOptions = {
    from: `${req.body.mailerState.name}`,
    to: process.env.EMAIL,
    subject: `Message from: ${req.body.mailerState.email}`,
    text: `Hello CTL Team,
This is ${req.body.mailerState.name}, 
Please find the following product for me: ${req.body.mailerState.message},
          
Thank you`,
    attachments: [
      {
        filename: `${req.body.file}`,
        streamSource: `${req.body.file}`,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent ==");
      res.json({
        status: "success",
      });
    }
  });
}); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
