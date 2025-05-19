import '../styles/globals.css';

import { LanguageProvider } from '../context/LanguageContext';
import { ApplicationCardProps } from '../interfaces/components/molecules/CardProps.interface';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
