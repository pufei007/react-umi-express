var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var UserSQL = require('../db/usersql');
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败',
      success: false,
      data: null,
    });
  } else {
    res.send(ret);
  }
};
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    // 建立连接 增加一个用户信息
    connection.query(UserSQL.getRoom, [], function(err, result) {
      if (result) {
        console.log(result);
        result = {
          code: 200,
          data: { menu: result },
          msg: '获取成功',
          success: true,
        };
      }

      // 以json形式，把操作结果返回给前台页面
      responseJSON(res, result);

      // 释放连接
      connection.release();
    });
  });
});

module.exports = router;
