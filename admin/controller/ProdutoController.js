const Produtos = require('../model/Produtos');

module.exports = {
  index: (res, req) => {
    Produtos.get(req.con, (err, rows) => {
      res.render("/", {data: rows})
    });
  },
  create: (req, res) => {
    res.render("/create")
  },

  store: (req, res) => {
    Produtos.create(req.con, req.body, (err) => {
      res.redirect("/")
    })
  },

  update: (req, res) => {
    Produtos.update(req.con, req.body, req.params.cod_bar, (err) => {

  res.redirect("/")
    })
  },

  destroy: (req, res) => {
    Produtos.destroy(req.con, req.params.cod_bar, (err) => {
      res.redirect("/")
    })
  }
};
