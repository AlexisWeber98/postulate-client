import '../styles/globals.css';

interface AppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
