"use strict";

//此例子来自：https://opensearch.org/docs/latest/clients/javascript/

var host = "search-cds-search-fqgynf7qdjrteyoswsm5ea7nbq.us-west-2.es.amazonaws.com";
var protocol = "https";
var port = 443;
var auth = "admin:Clickdishes.2020"; // For testing only. Don't store credentials in code.
var ca_certs_path = "/full/path/to/root-ca.pem";

// Optional client certificates if you don't want to use HTTP basic authentication.
// var client_cert_path = '/full/path/to/client.pem'
// var client_key_path = '/full/path/to/client-key.pem'

// Create a client with SSL/TLS enabled.
var { Client } = require("@opensearch-project/opensearch");
var fs = require("fs");
var client = new Client({
  node: protocol + "://" + auth + "@" + host + ":" + port,
  // ssl: {
  //   ca: fs.readFileSync(ca_certs_path),
  //   // You can turn off certificate verification (rejectUnauthorized: false) if you're using self-signed certificates with a hostname mismatch.
  //   // cert: fs.readFileSync(client_cert_path),
  //   // key: fs.readFileSync(client_key_path)
  // },
});

async function search() {
  // Create an index with non-default settings.
  var index_name = "mu_*";
  var settings = {
    settings: {
      index: {
        number_of_shards: 4,
        number_of_replicas: 3,
      },
    },
  };

  // var response = await client.indices.create({
  //   index: index_name,
  //   body: settings,
  // });

  // console.log("Creating index:");
  // console.log(response.body);

  // Add a document to the index.
  // var document = {
  //   name: "Chicken*"
  // };

  // var id = "1";

  // var response = await client.index({
  //   id: id,
  //   index: index_name,
  //   body: document,
  //   refresh: true,
  // });

  // console.log("Adding document:");
  // console.log(response.body);

  // Search for the document.
  // var query = {
  //   query: {
  //     match: {
  //       name: {
  //         query: "Chicken*",
  //       }
  //     },
  //   },
  // };

  var query = {
    query: {
      multi_match: {
        "query": "Model Milk",
        "fields": ["title^4", "name", "RestaurnatName"]
      }
    }
  };

  var response = await client.search({
    index: index_name,
    body: query,
  });

  console.log("Search results:");
  console.log(response.body.hits);

//   // Delete the document.
//   var response = await client.delete({
//     index: index_name,
//     id: id,
//   });

//   console.log("Deleting document:");
//   console.log(response.body);

//   // Delete the index.
//   var response = await client.indices.delete({
//     index: index_name,
//   });

//   console.log("Deleting index:");
//   console.log(response.body);
}

search().catch(console.log);
