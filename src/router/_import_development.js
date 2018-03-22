// 这里注意一下该写法只支持 vue-loader at least v13.0.0+
module.exports = file => require('views/' + file + '.vue').default
