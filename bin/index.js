#!/usr/bin/env node

const jsonpath = require("jsonpath");
const args = process.argv.slice(2);

//TODO validate args
//TODO add help https://www.npmjs.com/package/jsonpath#jsonpath-syntax

if (args.length < 1) {
  console.error("missing arg [query string]");
  process.exit(1);
}

const query = (data) => {
  process.stdout.write(
    JSON.stringify(jsonpath.query(JSON.parse(data), args[0]), null, 2)
  );
};

//Accept input from standard input
const readStdIn = () => {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    let data = "";

    stdin.setEncoding("utf8");
    stdin.on("data", (chunk) => {
      data += chunk;
    });

    stdin.on("end", () => {
      resolve(data);
    });

    stdin.on("error", reject);
  });
};

if (args.length < 1) {
  process.stdout.write({ message: "missing arg" });
} else {
  readStdIn().then(query).catch(console.error);
}
