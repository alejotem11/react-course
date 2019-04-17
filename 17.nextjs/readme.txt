Next.js (Server Side Rendering) pre-renders the content we load as pages on the server and send to the client the rendered html along with the bundle.js
** The project structure is important for Next.js. The resources you defined must be locatend in the /pages folder. For example if you have:
/pages
  /auth
    index.js
    user.js
  index.js

you will reach the index.js file at the url 'example.com'
you will reach the /auth/index.js file at the url 'example.com/auth'
you will reach the user.js file at the url 'example.com/auth/user'
	
************* Project set up:
- $ npm install --save next react react-dom

- Add the scripts in the package.json:
	"scripts": {
		"dev": "next",
		"build": "next build",
		"start": "next start"
	  },
	  
- After that, the file-system is the main API. Every .js file becomes a route that gets automatically processed and rendered

- Create your different pages as functional or class based components

- Run:
$ npm run dev --> It will spin up a development server building your application and server side rendering it

- Open the url: http://localhost:3000

- To build the project for production:
$ npm run build --> This will create the /.next folder which contains all the build content
You have to deploy the entire project, not only the /.next folder, since next.js use node. So you need a host that supports Node.js. Then you will need to run:
$ npm install
$ npm start --> This will use the optimized files generated when we ran [$ npm run build]
