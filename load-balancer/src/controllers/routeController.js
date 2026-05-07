const loadBalancer = require("../services/loadBalancer");

exports.routeRequest = (req, res) => {
  const ip = req.query.ip || req.ip;
  const node = loadBalancer(ip);

  if (node === "RATE_LIMITED") {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  if (!node) {
    return res.status(503).json({ error: "No healthy nodes available" });
  }

  res.json({ ip, node });
};