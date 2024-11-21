const Users = require("../model/users");

export const getAllUsers = async () => {
  try {
    return await Users.find({});
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserById = async (id: string) => {
  try {
    return await Users.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    return await Users.findOne({ username: username });
  } catch (error) {
    throw new Error(error.message);
  }
};
