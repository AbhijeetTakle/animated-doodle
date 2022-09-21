const router = require("express").Router();

router.route("/api/v1/allusers").get((req, res) => {
  const allusers = [
    {
      id: "sdf23ds",
      products: [{ productid: 1 }, { productid: 2 }, { productid: 3 }],
    },
    {
      id: "sdef23ds",
      products: [{ productid: 1 }, { productid: 2 }, { productid: 3 }],
    },
    {
      id: "sdfs23ds",
      products: [{ productid: 1 }, { productid: 2 }, { productid: 3 }],
    },
    {
      id: "sdf2s3ds",
      products: [{ productid: 1 }, { productid: 2 }, { productid: 3 }],
    },
  ];
  res.json(allusers);
  res.send();
});

module.exports = { router };
