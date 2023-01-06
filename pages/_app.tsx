import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '@src/styles/globalStyle';
import '@src/styles/calendar.css';
import Header from '@src/component/header';
import Footer from '@src/component/Footer';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <Footer/>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
