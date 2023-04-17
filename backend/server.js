const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const apiRoutes = require("./routes/apiRoutes");
const connectDB = require("./config/db");
const Product = require("./models/ProductModel");

connectDB();

app.use("/api", apiRoutes);

// Handle errors
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    console.error(error);
  }
  next(error);
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Nodemailer configuration
const oAuth2Client = new OAuth2Client(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.BASE_URL
);

// Set the access token and refresh token if available
oAuth2Client.setCredentials({
  access_token: process.env.OAUTH_ACCESS_TOKEN,
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

// Use the Google OAuth2 client to refresh the access token
oAuth2Client.on("tokens", (tokens) => {
  if (tokens.refresh_token) {
    // Store the new refresh token in the environment variables
    process.env.OAUTH_REFRESH_TOKEN = tokens.refresh_token;
  }
  // Store the new access token in the environment variables
  process.env.OAUTH_ACCESS_TOKEN = tokens.access_token;
});

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    access_token: process.env.OAUTH_ACCESS_TOKEN,
    // Pass the OAuth2 client instance to the access_token getter function
    // to automatically refresh the access token when it expires
    accessToken: () => oAuth2Client.getAccessToken(),
  },
});

// Send email route
app.post("/api/sendemail", async (req, res, next) => {
  try {
    const { from, productName, description } = req.body;
    const file = req.files.image;

    // Create email message
    const message = {
      from,
      to: process.env.EMAIL,
      subject: `Quote Products: ${productName}`,
      text: `This is: ${from},
Please find the product for us: ${productName}.
Prodcut Description: ${description}`,
      attachments: [
        {
          filename: file.name,
          content: file.data,
        },
      ],
    };

    // Send email
    await transporter.sendMail(message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
