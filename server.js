require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors")
const connectDB = require("./utils/conn");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router")
const serviceRoute = require("./router/service-router")
const adminRoute = require("./router/admin-router")
const errorMiddleware = require("./middleware/error-middleware");


// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
//   credentials: true
// }

// app.use(cors(corsOptions))


const allowedOrigins = [
  'http://localhost:5173',
  'https://ubiquitous-banoffee-c23539.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true
}));



app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute)
app.use("/api/data", serviceRoute)
app.use("/api/admin", adminRoute)

app.use(errorMiddleware);


connectDB().then(()=>{
  app.listen(port, ()=>{
    console.log(`server is running at ${port}`);  
  })
})