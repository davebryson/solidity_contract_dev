
var mining_threads = 1

function checkWork() {
  if (eth.getBlock("pending").transactions.length > 0) {
    if (eth.mining) return;
    console.log("== Pending transactions! Mining...");
    miner.start(mining_threads);
  } else {
    miner.stop(); // This param means nothing
    console.log("== No transactions! Mining stopped.");
  }
}

eth.filter("latest", function(err, block) {
  checkWork();
});

eth.filter("pending", function(err, block) {
  checkWork();
});

console.log("** using mining watcher **");
checkWork();
