require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/database")
// const {resume , selfDescription, jobDescription} = require("./src/services/temp")
// const {generateInterviewReport} = require("./src/services/ai.service")

connectDB()
// generateInterviewReport({ resume, selfDescription, jobDescription })

    .then((report) => {
        console.log(JSON.stringify(report, null, 2))  // 👈 result print hoga
    })
    .catch((err) => {
        console.error("Error:", err)
    })

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})