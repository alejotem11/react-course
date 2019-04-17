import React from 'react';

import User from '../../components/User'; // We only load the User code if we navigate to 'localhost:3000/auth' because of the code splitting

const authIndexPage = props => (
  <div>
    <h1>The Auth Index Page - {props.appName}</h1>
    <User name="Alejandro" age={28} />

    {/* Styling in Next.js (Next.js uses styled-jsx pagkage for that) */}
    <style jsx>{`
      div {
        border: 1px soled #eee;
        box-shadow: 0 2px 3px #ccc;
        padding: 20px;
        text-align: center;
      }
    `}</style>
  </div>
);

// An alternative to use the getInitialProps lifecycle hook using functional components instead of class based components (see the index.js file)
authIndexPage.getInitialProps = context => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: 'Super App (Auth)' });
    }, 1000);
  });
  return promise;
};

export default authIndexPage;