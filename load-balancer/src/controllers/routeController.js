const loadBalancer = require("../services/loadBalancer");

exports.routeRequest = (req, res) => {
  const ip = req.query.ip;
  const node = loadBalancer(ip);

  res.json({ ip, node });
};