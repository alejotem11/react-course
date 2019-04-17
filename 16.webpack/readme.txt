- $ npm init
  $ npm install --save react react-dom react-router-dom
 
- The "webpack-sample" is created from scratch without using create-react-app

- Installing the required dependencies (In dev $ npm install --save-dev):
webpack
webpack-dev-server --> To test our app locally
babel-core --> babel loader is the standard for transpiling next generation JS to current gen JS
babel-plugin-syntax-dynamic-import --> To manage the lazy loading (dynamic imports)
babel-loader --> This just provides the hook for webpack
babel-preset-react --> To support react
babel-preset-env --> For the environment adjustement
css-loader --> Tells webpack what to do with css imports
style-loader --> extract the css code from the css files and inject it at the top of the html file hence reducing the amount of file downloads we have to make
postcss-loader --> To add vendor prefixes to CSS rules (-webkit-, -moz-, ...)
autoprefixer --> To handle auto prefixing in css
url-loader --> loader that will take our images and if they are below a certain limit we define it will convert them into data 64 urls which we can inline into our documents (so we don't have to download extra files), and because for bigger files that would be inefficient, files above that specified limit will be copied to our output folder and it will then generate a link to these files (In the latter case we use the file-loader to copy the files)
file-loader --> To copy files to a new direction and gives us a link to them
html-webpack-plugin --> To inject our bundle.js into our html file
rimraf --> To delete folders or files

- Configuring Babel:
	 - Create the ".babelrc" file in the root folder
	 - Configure the presets we already installed (react and env presets) in the .babelrc file
	 
- Setting up the basic Webpack Config:
	- Create the "start" script in the package.json file as follows:
		"start": "wepack-dev-server"
	- Create the webpack.config.js file in the root folder and configure it (check the webpack.config.js file)

- To run the project in development (this is going to create the assets in memory):
$ npm start

- To build the optimized assets under the /dist folder:
$ npm run build