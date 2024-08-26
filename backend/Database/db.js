import mongoose from "mongoose";
const connectToDB = async () => {
  const url = process.env.MANGO_DB_URL;
  try {
    const { connection } = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log(`Connected to Database ${connection.host} `);
    }
  } catch (err) {
    console.log("Error connecting to Database", err);
  }
};
export default connectToDB;
