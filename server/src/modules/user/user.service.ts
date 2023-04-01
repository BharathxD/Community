import UserModel, { User } from "./user.model";
import { omit } from "lodash";

export const createUser = async (user: Omit<User, "comparePassword">) => {
  const createdUser = await UserModel.create(user);
  return omit(createdUser.toJSON(), "password");
};

export const findUserById = async (userId: string) => {
  const foundUser = await UserModel.findById(userId);
  return foundUser;
};

export const findUserByEmail = async (email: User["email"]) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const validateUser = async ({
  email,
  password,
}: {
  email: User["email"];
  password: User["password"];
}) => {
  const user = await findUserByEmail(email);
  if (!user) {
    //? User doesn't exist
    return null;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    //? The user is not Valid
    return null;
  }
  return omit(user.toJSON(), "password");
};
