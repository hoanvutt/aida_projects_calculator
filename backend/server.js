const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

const allowedOrigin = process.env.FRONTEND_ORIGIN || "*";
app.use(
  cors({
    origin: allowedOrigin === "*" ? "*" : allowedOrigin,
  })
);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/calculate", (req, res) => {
  const { a, b, op } = req.body || {};

  const numA = Number(a);
  const numB = Number(b);

  if (!Number.isFinite(numA) || !Number.isFinite(numB)) {
    return res.status(400).json({ error: "a and b must be valid numbers" });
  }

  let result;
  switch (op) {
    case "+":
      result = numA + numB;
      break;
    case "-":
      result = numA - numB;
      break;
    case "*":
      result = numA * numB;
      break;
    case "/":
      if (numB === 0) return res.status(400).json({ error: "Cannot divide by zero" });
      result = numA / numB;
      break;
    default:
      return res.status(400).json({ error: "op must be one of + - * /" });
  }

  res.json({ result });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running on port ${port}`));
