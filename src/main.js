import express from 'express'
import {noteController, userController } from './modules/index.js'
import { globalErrorHandling } from './middleware/index.js'
import { bootstrap } from './DB/connection.db.js'
import { PORT } from './config.js'

const app = express()

bootstrap(app , PORT)

app.use(express.json())

app.all("/", (req, res) => res.status(200).send({ message: "Welcome to BE API 🌸" }))

app.use("/users", userController)
app.use("/notes", noteController)

app.all("{/*dummy}", (req, res) => res.status(404).send({ message: "Invalid application routing" }))

app.use(globalErrorHandling)

