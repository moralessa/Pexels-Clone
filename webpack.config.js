const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
      rules: [
        {
            test: /\.(s(a|c)ss)$/,
            use: ['style-loader','css-loader', 'sass-loader']
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
      ]
  }
};