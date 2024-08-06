
// mongodb+srv://conview:con@1112@cluster0.fgdycoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:'./config/.env'});
 const {MONGO_PASSWORD,MONGO_FIRST_URI,MONGO_LAST_URI} = process.env;
mongoose.set('strictQuery',true);
const connectDB = ()=>{
    mongoose.connect(MONGO_FIRST_URI +
    encodeURIComponent(MONGO_PASSWORD) +
    MONGO_LAST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
}
module.exports={connectDB}