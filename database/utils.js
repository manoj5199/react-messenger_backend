import Interest from "../models/interestsSchema.js";
import InterestMaster from "../models/intrestsMaster.js";
import { User } from "../models/userSchema.js";

export const getUser = async (email) => {
  return await User.findOne({ email: email })
    .exec()
    .catch((err) => console.log(err));
};

export const getInterest = async () => {
  return await InterestMaster.find({},{__v:0})
    .exec()
    .catch((err) => console.log(err));
};

export const interestExist = async (interest) => {
  return await InterestMaster.findOne({ Interest: interest })
    .exec()
    .catch((err) => console.log(err));
};

export const userInterest = async (userId) => {
  console.log("userId" + JSON.stringify(userId));
  return await Interest.findOne({ UserId: userId })
    .exec()
    .catch((err) => console.log(err));
};

export const insertUserInterest = async ({ userId, Interests }) => {
  console.log("userId" + JSON.stringify(userId));
  return await Interest.create({ UserId: userId, Interests: Interests }).catch(
    (err) => console.log(err)
  );
};

export const searchUserInterest = async(interests) => {
  const Interests = [interests]
  return await Interest.aggregate([
    {
      $match : {
        Interests : { $in : Interests}
      }
    },
    {
      $lookup : {
        from : "users",
        localField : "UserId",
        foreignField : "_id",
        as : "UserData",
      }
    },
    {
      $unwind : "$UserData"
    },
    {
      $group : {
        _id : 0,
        users : { $push : "$UserData"}
      }
    },
    {
      $unwind : "$users"
    },
    {
      $project : {
        _id: 0,
        usersData : "$users"
      }
    }
  ]).catch(err => console.log(err))
}
