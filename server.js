const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const productArr = data.products;

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/product")) {
    const id = req.url.split("/")[2];
    const product = productArr.find((p) => p.id === +id);
    res.setHeader("Content-type", "text/html");
    let modifiedIndex = index
      .replace("**title**", product.title)
      .replace("**price**", product.price)
      .replace("**rating**", product.rating)
      .replace("**url**", product.thumbnail);
    res.end(modifiedIndex);
    return;
  }
  switch (req.url) {
    case "/": {
      res.setHeader("Content-type", "text/html");
      res.end(index);
      break;
    }
    // case '/product' : {
    //     res.setHeader('Content-type' , 'text/html')
    //     let modifiedIndex = index.replace('**title**', product.title).replace('**price**', product.price).replace('**rating**', product.rating).replace('**url**', product.thumbnail)
    //     res.end(modifiedIndex);
    //     break;
    // }
    case "/api": {
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify(data));
      break;
    }
    default:
      res.writeHead(404, "Wrong Call");
      res.end();
  }
  console.log("server started");
});

server.listen(8080);
