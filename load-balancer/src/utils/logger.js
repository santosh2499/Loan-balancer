function log(ip, node) {
  const time = new Date().toISOString();
  console.log(`[${time}] IP: ${ip} → ${node}`);
}
module.exports = log;