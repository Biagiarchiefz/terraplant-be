import express from "express"


const app = express();
const PORT = 8000;


    app.get("/", (req, res) => {
        res.status(200).json({
          message: "get data success",
          data: {
            title: "bunga sakuran",
            harga: 20000
          }
        })
    })


     app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });