#!/usr/bin/env node

const argv = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 <command> ")
  .command("<jsonpath>", "jsonpath query")
  .example(
    'cat s.json | $0 "$.store.book[*].author"',
    "The authors of all books in store"
  )
  .example('cat s.json | $0 "$..author"', "All authors")
  .example('cat s.json | $0 "$.store.*"', "All things in store")
  .example(
    'cat s.json | $0 "$.store..price"',
    "The price of everything in the store"
  )
  .example('cat s.json | $0 "$..book[2]"', "The third book")
  .example(
    'cat s.json | $0 "$..book[(@.length-1)]"',
    "The last book via script subscript"
  )
  .example('cat s.json | $0 "$..book[-1:]"', "The last book via slice")
  .example('cat s.json | $0 "$..book[0,1]"', "The first two books")
  .example('cat s.json | $0 "$..book[:2]"', "The first two books")
  .example(
    'cat s.json | $0 "$..book[?(@.isbn)]"',
    "Filter all books with isbn number"
  )
  .example(
    'cat s.json | $0 "$..book[?(@.price<10)]"',
    "Filter all books cheaper than 10"
  )
  .example(
    'cat s.json | $0 "$..book[?(@.price==8.95)]"',
    "Filter all books that cost 8.95"
  )
  .example(
    'cat s.json | $0 "$..book[?(@.price<30 && @.category=="fiction")]"',
    "Filter all fiction books cheaper than 30"
  )
  .example('cat s.json | $0 "$..*"', "All members of JSON structure")
  .help("h")
  .epilog(
    "Note: input json should be passed via std input\nFor jsonpath syntex refer to https://www.npmjs.com/package/jsonpath#jsonpath-syntax"
  )
  .demandCommand(1).argv;

const jsonpath = require("jsonpath");

const query = (data) => {
  process.stdout.write(
    JSON.stringify(jsonpath.query(JSON.parse(data), argv._[0]), null, 2)
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

readStdIn().then(query).catch(console.error);
