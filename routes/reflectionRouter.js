const express = require("express")
const reflectionRouter = express.Router()
const Reflection = require('../models/reflection.js')

// Get all reflections
reflectionRouter.get("/", (req, res, next) => {
  Reflection.find((err, reflections) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(reflections)
  })
})

// Get reflections by user id
reflectionRouter.get("/user", (req, res, next) => {
  console.log("getting refleciton by user")
  Reflection.find({ user: req.auth._id }, (err, reflections) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(reflections)
  })
})

// Add new reflection
reflectionRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id
  const newReflection = new Reflection(req.body)
  newReflection.save((err, savedReflection) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedReflection)
  })
})

// Delete reflection
reflectionRouter.delete("/:reflectionId", (req, res, next) => {
  Reflection.findOneAndDelete(
    { _id: req.params.reflectionId, user: req.auth._id },
    (err, deletedReflection) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete reflection: ${deletedReflection._id}`)
    }
  )
})

// NOT IN USE - Update reflection
reflectionRouter.put("/:reflectionId", (req, res, next) => {
  Reflection.findOneAndUpdate(
    { _id: req.params.todoId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedReflection) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedReflection)
    }
  )
})

module.exports = reflectionRouter