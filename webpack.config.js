const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWithImgPulgin = require('html-withimg-loader');

const webSite = {
  path: 'http://127.0.0.1:8080/dist/'
}

module.exports = {
  //入口文件的配置项
  entry: {
    // 入口名可以自己定义，配套对应文件路径即可
    test: './src/js/test.js',
    index: './src/js/index.js'
  },
  //出口文件的配置项
  output: {
    // node的path模块，提供dist的绝对路径
    path: path.resolve(__dirname, 'dist'),
    // [name].js 生产匹配入口文件名的出口文件
    filename: 'js/[name][hash].js',
    // chunkFilename: '[name][hash].js',
    publicPath: webSite.path
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module: {
    rules: [{
      test: /\.css$/,
      use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.(jsx|js)$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif)/,
      use: [{
        loader: "url-loader",
        options: {
          limit: 50000,
          name: "img/[name][hash].[ext]"
        }
      }]
    }, {
      test: /\.(htm|html)$/i,
      loader: 'html-withimg-loader'
    }]
  },
  //插件，用于生产模版和各项功能
  plugins: [
    new htmlPlugin({
      // 设置min版本,可有可无
      minify: {
        // 移除id="title"的""，变成id=title
        removeAttributeQuotes: true
      },
      // 为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      hash: true,
      // 需要打包生产的html文件路径，或者叫模版
      template: './src/index.html',
    }),
    // css文件分离
    new extractTextPlugin("css/index.css"),
  ],
  //配置webpack开发服务功能
  devServer: {
    //设置基本目录结构
    // contentBase: 配置服务器基本运行路径， 用于找到程序打包地址。
    contentBase: path.resolve(__dirname, 'dist'),
    //服务器的IP地址，可以使用IP也可以使用localhost
    // host： 服务运行地址， 建议使用本机IP， 这里为了讲解方便， 所以用localhost。
    host: 'localhost',
    //服务端压缩是否开启
    // compress： 服务器端压缩选型， 一般设置为开启， 如果你对服务器压缩感兴趣， 可以自行学习。
    compress: true,
    //配置服务端口号
    // port： 服务运行端口， 建议不使用80， 很容易被占用， 这里使用了1717.
    port: 1717,
    // 自动拉起浏览器
    open: true,
  }
}
