const net = require("net");

const connect = function () {
  const conn = net.createConnection({
    host: "165.227.47.243",
    port: 50541,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");
//サーバーに接続されたら下記のactionが行われる
  conn.on("connect", () => {
    console.log("Successfully connected");
    conn.write('Name: ERK');
  })
  //サーバーから情報を受け取る
  conn.on('data', (data) => {
    console.log('Server says: ', data)
  });
//自由に動かせるようになる
  process.stdin.on('data', function(message) {
    conn.write(message);
    // conn.write('Move: up');

  });
  return conn;
};

// setup interface to handle user input from stdin

const setupInput = function () {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", handlerUserInput);
  return stdin;
};

const handlerUserInput = function(data) {
  //\u0003' means ctrl + c
  if (data === '\u0003') {
    console.log("exiting terminal")
    process.exit();
    }
}
module.exports = { connect, setupInput };