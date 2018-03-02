const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

function getEntry(globPath) {
    var entries = {},
      basename,
      tmp,
      pathname;
    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;
    });
    return entries;
}

let entries = getEntry('./js/pages/*.js'); // 获得入口js文件
entries['vendor'] = ['jquery', 'vue', './js/common.js'];

console.log(entries);

module.exports = {
  entry : entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'static/assets'),
    chunkFilename: '[name].js',
    // publicPath: '//192.168.1.31:3000/assets/js/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.resolve('./src'), path.resolve('./js')]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sprite-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min.js',
      'jquery$': 'jquery/dist/jquery.min.js'
    }
  }
}
