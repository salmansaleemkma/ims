module.exports = {
    entry:"./js/app.js",
    output: {
	filename: "build/main.js"
    },
    module: {
	loaders: [
	    { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['react'] } },
	    { test: /\.css$/, loader: "style-loader!css-loader" },
	    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
	    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
	    ]
    },
    resolve: {
	extensions: ['','.js']
    },
    watch: true
}
