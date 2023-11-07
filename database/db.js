import mongoose from "mongoose";

export const Connection = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "react-messenger",
    });
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
};
