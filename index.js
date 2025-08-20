const app = require("./app");
app.listen(process.env.PORT, function () {
    console.log(`App Run ${process.env.PORT}`)
})

