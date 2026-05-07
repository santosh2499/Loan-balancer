function hashIP(ip) {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash += ip.charCodeAt(i);
  }
  return hash;
}
module.exports = hashIP;