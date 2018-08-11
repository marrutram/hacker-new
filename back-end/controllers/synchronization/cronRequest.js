const cron = require("node-cron");
const requestHnAlgolia = require('./requestHnAlgolia');

exports.cronActive  = () => {
  requestHnAlgolia.getApiHn();
  cron.schedule("* * 1 * *", () => {
    requestHnAlgolia.getApiHn();
  });
};
