import React from 'react';
import Link from 'next/link'; // We use Link from next.js instead of Link from router-dom used in client-side rendering apps
import Router from 'next/router';

class IndexPage extends React.Component {
  // Special lifecycle hook getInitialProps
  // You can use it to initialize your app before it loads
  // It executes on the server if you navigated there by typing the url or refreshing the url on the browser
  // It will execute on the client if you navigated there from the app (i.e. by clicking a link)
  // ******** without async key-word *********
  static getInitialProps(context) {
    const promise = new Promise((resolve, reject) => { // Fake reaching out a server
      setTimeout(() => {
        resolve({ appName: 'Super App' }); // Pre-populating the props this page component will recieve
      }, 1000);
    });
    return promise;
  }


/* 
  static async getInitialProps(context) {
    // ... your async code here
    return { appName: 'Super App' }; // Pre-populating the props this page component will recieve
  }
 */
  render () {
    return (
      <div>
        <h1>The Main Page of {this.props.appName}</h1>
        {/* To use the Link component you still have to use anchor <a> element without the ref attribute. Behind the scenes Next.js will add the href attribute to the <a> tag but then handles any click on the <a> so you don't really reload the page */}
        {/* Next.js automatically make code splitting so when you navigate to the link another js file is downloaded (lazy loading) */}
        <p>Go to <Link href="/auth"><a>Auth</a></Link></p>

        {/* Imperatively navigation (through code) using Router */}
        <button onClick={() => Router.push('/auth')}>Go to Auth (Routing through code)</button>
      </div>
    );
  }
}

export default IndexPage;