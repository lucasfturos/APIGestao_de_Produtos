module.exports = {
  get: function(con, callback) {
    con.query("select * from Produtos" , callback)
  },

  getCodBar: function(con, cod_bar, callback) {
    con.query(`select * from Produtos where cod_bar = ${cod_bar}`, callback)
  },

  create: (con, data, callback) => {
    con.query(`insert into Produtos
    (cod_bar, nome, descricao, quantidade, preco) value
    ('${data.cod_bar}', '${data.nome}', '${data.descricao}', '${data.quantidade}', '${data.preco}')`,
      callback)
  },

  update: (con, data, cod_bar, callback) => {
    con.query(`update Produtos set
      cod_bar = '${data.cod_bar}',
      nome = '${data.nome}',
      descricao = '${data.descricao}',
      quantidade = '${data.quantidade}',
      preco = '${data.preco}' where cod_bar = ${cod_bar}`, callback)
  },

  destroy: (con, cod_bar, callback) => {
    con.query(`delete from Produtos where cod_bar = ${cod_bar}`, callback)
  }
};
