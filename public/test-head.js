(function () {
  var time = new Date().toISOString();
  console.log("[test-head.js] Executed at", time);
  window.__customHeadTest = {
    executedAt: time,
    source: "polls/public/test-head.js",
  };
})();
