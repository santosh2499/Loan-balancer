const nodes = require("../config/nodes");

// Hash function
function hashIP(ip) {
   let hash = 0;
   for (let i = 0; i < ip.length; i++) {
      hash = (hash * 31 + ip.charCodeAt(i)) % 100000;
   }
   return hash;
}

// Load Balancer
function loadBalancer(ip, identifyNode) {

   const hash = hashIP(ip);
   const index = hash % nodes.length;
   const selectedNode = nodes[index];

   // Use given function
   identifyNode(ip, selectedNode);

   return selectedNode;
}

module.exports = loadBalancer;