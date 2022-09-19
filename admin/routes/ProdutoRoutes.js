const express = require('express'),
  router = express.Router(),
  PrdutosController = require('../controller/ProdutoController');

router.get("/", PrdutosController.index)
router.get("/create", PrdutosController.create)
router.post("/:cod_bar", PrdutosController.store)
router.put("/:cod_bar", PrdutosController.update)
router.delete("/:cod_bar", PrdutosController.destroy)
module.exports = router
