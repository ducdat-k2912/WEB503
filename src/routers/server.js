const express = require("express");
const app = express();
const PORT = 3000;

app.get("/api/posts/greet", (req, res) => {
  const name = req.query.name || "Ken";
  res.send(`Xin chào, ${name}!`);
});

app.get("/api/posts/sum", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send("Vui lòng truyền đúng số a và b!");
  }

  const sum = a + b;
  res.send(`Tổng của ${a} và ${b} là: ${sum}`);
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
