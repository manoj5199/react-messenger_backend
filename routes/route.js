import { Router } from "express";
import { User } from "../models/userSchema.js";
import { encrypt, decrypt } from "../constants/constants.js";
import jsonwebtoken from "jsonwebtoken";
import {
  getInterest,
  getUser,
  insertUserInterest,
  interestExist,
  searchUserInterest,
  userInterest,
} from "../database/utils.js";
import InterestMaster from "../models/intrestsMaster.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  const encryptPassword = encrypt(password);
  console.log(encryptPassword);
  const userData = await getUser(firstName);
  if (!userData) {
    const result = new User({
      firstName,
      lastName,
      password: encryptPassword,
      email,
    });
    await result.save().catch((err) => {
      console.log(err);
    });
    res.json({
      error: false,
      code: 200,
      message: "User inserted successfully!",
    });
  } else {
    res.json({ error: true, code: 404, message: "User already exist!" });
  }
});

router.post("/login", async (req, res) => {
  console.log("reeeeeeqqqqq", req.body);
  const { firstName, password, email } = req.body;

  if (!email || !password) {
    res
      .status(401)
      .json({ error: true, message: "Email or password is empty" });
    return;
  }

  const userData = await getUser(email);
  if (userData) {
    if (password === decrypt(userData.password)) {
      const secret = "testing";
      const token = jsonwebtoken.sign({ email: email }, secret, {
        expiresIn: "2m",
      });

      res.json({
        error: false,
        code: 200,
        message: "Get all Users!",
        Token: token,
        data: userData,
      });
    } else {
      res.status(401).json({
        error: false,
        code: 200,
        message: "Invalid Password!",
        data: [],
      });
    }
  } else {
    res.status(404).json({
      error: false,
      code: 404,
      message: "User Not Found Please Register!",
      data: [],
    });
  }
});

router.get("/getInterest", async (req, res) => {
  const InterestData = getInterest();
  InterestData.then((result) =>
    res.json({ code: 200, message: "Get all Interests!", data: result })
  );
});

router.get("/getUserInterest", async (req, res) => {
  const UserId = req.query.userId;
  console.log(req.query,"body1111111111111");
  const InterestData = await userInterest(UserId);
  console.log(InterestData);
  res.json({ message: "get User Interest", data: InterestData });
});

router.post("/addUserInterest", async (req, res) => {
  const { userId, Interests } = req.body;
  const InterestData = await userInterest(userId);
  // console.log(InterestData);

  if (InterestData === null) {
    const resultData = await insertUserInterest({ userId, Interests });
    res.json({ message: "Get All User Interest Data!", data: resultData });
  } else {
    res.json({ message: "Data already Exist!", data: InterestData });

  }
});

router.post("/add-Interest", async (req, res) => {
  const { interest, description } = req.body;
  const exist = await interestExist(interest);
  if (exist) {
    console.log("if block");
    res.json({ Code: 200, error: false, message: "Data already exist!" });
  } else {
    console.log("else block");
    InterestMaster.find({})
      .exec()
      .then(async (interestData) => {
        // console.log(interestData)
        const InterestData = new InterestMaster({
          Interest: interest,
          Description: description,
        });
        await InterestData.save();
        res.json({
          Code: 200,
          error: false,
          message: "Data inserted successfully!",
          data: InterestData,
        });
        //inserting data into database
        // if(interestData.length > 0){
        //   res.json({Code :200,error: false , message : "Data already exist!"})
        //   //updating data
        //   // updatedData.Interest = interest;
        //   // updatedData.Description = description;
        //   // updatedData.updatedData = Date.now()
        //   // const InterestData = new InterestMaster(updatedData);
        //   // await InterestData.save().then(update => res.json({Code :200,error: false , message : "Data updated successfully!", data: interestData})).catch(err => res.json({Code : 404, error: true , message : err.message}))
        // } else {
        //   //inserting data into database
        //   console.log("else block")
        //   const InterestData = new InterestMaster({Interest:interest,Description:description})
        //   await InterestData.save();
        //   res.json({Code :200,error: false , message : "Data inserted successfully!", data: InterestData})
        // }
      })
      .catch((err) => {
        console.log(err);
        res.json({ Code: 404, error: true, message: err.message });
      });
  }
});

router.get("/searchInterest",async(req,res) => {
  const interest = req.query.interests;
  const searchData = await searchUserInterest(interest);
  console.log(searchData)
  if(searchData != undefined){
    const finalData = searchData.map(user => user.usersData)
    console.log("finalData"+JSON.stringify(finalData))
    res.status(200).json({error:false , message:"Get All User Interest Data" , data: finalData})
  } else {
    res.status(404).json({error:false , message:"No Record Found!" , data: []})
  }
})

export default router;
