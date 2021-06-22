import { AppProps } from 'next/app';
import { AuthContextProvider } from '../contexts/AuthContext';
import '../styles/globals.scss';
import '../lib/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
