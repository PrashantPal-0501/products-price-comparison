const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;

// ---------------------------------------------------------------
// Mock data store. Swap this out for a real database / call to
// another microservice (e.g. separate prodlist / dealerdetails
// Code Engine services) whenever you're ready.
// ---------------------------------------------------------------
const dealerPrices = {
  "Headphones": { "Binglee": 30, "DXC Electronics": 20, "Bobay": 20 },
  "Laptop":     { "Binglee": 900, "DXC Electronics": 850, "Bobay": 875 },
  "Mouse":      { "Binglee": 15, "DXC Electronics": 12, "Bobay": 18 },
  "Printer":    { "Binglee": 120, "DXC Electronics": 99, "Bobay": 110 }
};

// Serve the frontend (index.html, products.json, etc.)
app.use(express.static(path.join(__dirname, "html")));

// GET /products -> ["Headphones", "Laptop", ...]
app.get("/products", (req, res) => {
  res.json(Object.keys(dealerPrices));
});

// GET /dealers?product=Headphones -> ["Binglee", "DXC Electronics", "Bobay"]
app.get("/dealers", (req, res) => {
  const product = req.query.product;
  const dealers = dealerPrices[product] ? Object.keys(dealerPrices[product]) : [];
  res.json(dealers);
});

// GET /prices?product=Headphones&dealer=all|<dealerName>
// -> { "Binglee": 30, "DXC Electronics": 20, ... } or { "Binglee": 30 }
app.get("/prices", (req, res) => {
  const { product, dealer } = req.query;
  const prices = dealerPrices[product] || {};

  if (!dealer || dealer === "all") {
    return res.json(prices);
  }

  if (prices[dealer] === undefined) {
    return res.json({});
  }

  res.json({ [dealer]: prices[dealer] });
});

app.listen(PORT, () => {
  console.log(`Products price comparison app listening on port ${PORT}`);
});
