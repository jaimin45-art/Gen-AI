require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/database")


connectDB()


    .then((report) => {
        console.log(JSON.stringify(report, null, 2))  // 👈 result print hoga
    })
    .catch((err) => {
        console.error("Error:", err)
    })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})