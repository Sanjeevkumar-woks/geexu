import { client } from "./index.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

//Blogs
export function getBlogsByFilter(req) {
  return client.db("geexu").collection("blogs").find(req.query).toArray();
}
export function getBlogById(id) {
  return client
    .db("geexu")
    .collection("blogs")
    .findOne({ _id: ObjectId(id) });
}
export function deleteBlogById(id) {
  return client
    .db("geexu")
    .collection("blogs")
    .deleteOne({ _id: ObjectId(id) });
}
export function updateBlogById(id, updateBlog) {
  return client
    .db("geexu")
    .collection("blogs")
    .updateOne({ _id: ObjectId(id) }, { $set: updateBlog });
}
export async function addBlogs(newblogs) {
  return await client.db("geexu").collection("blogs").insertMany(newblogs);
}

// users
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no. of rounds)
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function addUser(newUser) {
  return await client.db("geexu").collection("users").insertOne(newUser);
}

export async function getUserByName(display_name) {
  return await client
    .db("geexu")
    .collection("users")
    .findOne({ display_name: display_name });
}
export async function getUserByEmail(email) {
  return await client.db("geexu").collection("users").findOne({ email: email });
}

export function getUsersByFilter(req) {
  return client.db("geexu").collection("users").find(req.query).toArray();
}

export function getAllUsers() {
  return client.db("geexu").collection("users").find().toArray();
}

export function deleteUserByDisplay_name(display_name) {
  return client.db("geexu").collection("users").deleteOne({ display_name });
}

//
export function updatePassword(userdata)
{
    const{email,Password}=userdata
    return client.db('geexu').collection('users').updateOne({email},{$set:{Password:Password}})
}