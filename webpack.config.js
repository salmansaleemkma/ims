module.exports = {
    entry: "./js/app.js",
    output: {
	filename: "build/main.js"
    },
    module: {
	loaders: [
	    { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['react'] } },
	    { test: /\.css$/, loader: "style-loader!css-loader" }
	    ]
    },
    resolve: {
	extensions: ['','.js']
    },
    watch: true
}
