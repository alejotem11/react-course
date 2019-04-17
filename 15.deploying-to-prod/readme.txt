- If needed, adjust the basepath of your project if you are using Routing and you plan to serve your app from a certain path (in the BrowserRouter component). i.e. if you are serving your app from 'www.example.com/my-app':
<BrowserRouter basename="/my-app/">
	<App />
</BrowserRouter>

- Build & Optimize Project in create-react-app projects
$ npm run build

- The server must ALWAYS serve index.html (also for 404 cases), otherwise your Routing dependent React applications won't work. All static hosts typically allow you to configure it. If you are not using a static host you must catch all route and return index.html file if any error happens.

- Upload build artifacts to (static) server --> in /build folder when using create-react-app
	- On Firebase:
		- Select your project
		- Click "Hosting" in the side menu (From the "Develop" section)
		- Follow the steps indicated on Firebase. When you run the command [firebase init] in your terminal, you will be prompted for the next questions:
			- ? Are you ready to proceed? Yes
			- ? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confi
rm your choices. Hosting: Configure and deploy Firebase Hosting sites
			- ? Select a default Firebase project for this directory: react-my-burger-18ba9 (react-my-burger)
			- ? What do you want to use as your public directory? build
			- ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
			- ? File build/index.html already exists. Overwrite? No