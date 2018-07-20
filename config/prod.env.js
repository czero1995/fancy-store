
// prod.env.js

let gitSha = require('child_process').execSync('git rev-parse HEAD').toString().trim()

// process.env.RELEASE_VERSION = gitSha.substr(2, 9) 不應截取

process.env.RELEASE_VERSION = gitSha

module.exports = {
  RELEASE_VERSION: `"${gitSha}"`,
  NODE_ENV: '"production"'
}// prod.env.js