const fs = require("fs");
const util = require("util");
const Octokit = require('@octokit/rest');
const writeFile = util.promisify(fs.writeFile);

const octokit = Octokit({
  userAgent: "likwid/stargazer 1.0.0",
  previews: ["mercy"],
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.errorA
  }
});

const starOptions = octokit.activity.listReposStarredByUser.endpoint.merge({username: "likwid"});
octokit.paginate(starOptions).then(stars => {
  console.log("Writing stars to file");
  const starsAsJson = JSON.stringify(stars);
  writeFile("likwid.json", starsAsJson, {encoding: "utf8"})
    .then(() => console.log("Finished writing stars to file"))
    .catch((err) => console.error(`Error: ${err}`));
});
