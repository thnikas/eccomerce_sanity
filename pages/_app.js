import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
 
  return (
    <StateContext>
      <script src="https://www.gstatic.com/dialogflow-console/fast/messenger-cx/bootstrap.js?v=1"></script>
      <df-messenger //the chat bot
        df-cx="true"
        location="europe-west3"
        chat-title="ecommerceBot"
        agent-id={process.env.NEXT_PUBLIC_AGENT_ID}
        language-code="en"
      ></df-messenger>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp