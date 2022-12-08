import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri:"https://api-sa-east-1.graphcms.com/v2/cl4ozypzy1h2801xscbvd4dc7/master",

  cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ApolloProvider client={client}>
  <Component {...pageProps} />
  </ApolloProvider>
)}

export default MyApp
