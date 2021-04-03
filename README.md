# jpath

Command Line node application to query JSON using jsonpath

## Motivation

jq is an awsome json query utility however jsonpath has (IMHO) a much simpler query language and easier to learn. I did not find a command line implementation to directly use JSON path queries.

## How to install

```
npm install -g jsonpath-cli
```

## How to execute

```
cat <input.json> | jpath <jsonpath query>
```

### Jsonpath query quick Reference:

https://www.npmjs.com/package/jsonpath#jsonpath-syntax
