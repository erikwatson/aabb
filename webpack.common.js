const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dest')
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },

      {
        test: /(\.scss|.sass)$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'style-loader'
          },

          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },

          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
