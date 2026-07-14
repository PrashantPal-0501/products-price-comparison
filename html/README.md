# Products Price Comparison

A single-page app that lets a user pick a product, then a dealer (or "All Dealers"),
and see the price(s) — matching the original design (alternating column shading,
serif "Products price comparison" heading, dropdown-driven table).

## Run it
Just open `index.html` in a browser. It works fully offline using built-in mock
data for 4 products (Headphones, Laptop, Mouse, Printer) and 3 dealers
(Binglee, DXC Electronics, Bobay).

## Connect to your real backend
Edit the two variables near the top of the `<script>` block in `index.html`:

```js
let prodUrl = "https://<your-prodlist-service>.codeengine.appdomain.cloud/";
let dealerUrl = "https://<your-dealerdetails-service>.codeengine.appdomain.cloud/";
```

The app expects:
- `GET {prodUrl}products` → JSON array of product name strings
- `GET {dealerUrl}dealers?product=<name>` → JSON array of dealer name strings
- Price lookup currently uses local mock data (`mockDealerPrices`); swap in a
  real `GET {dealerUrl}prices?product=<name>&dealer=<name>` call if your
  backend exposes one.

If the endpoints aren't reachable, the app automatically falls back to the
built-in mock data so the UI still works for demos.
