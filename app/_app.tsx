import { AppProps } 
                from 'next/app';
import { EleosAppProvider } 
                from '@/lib/providers/EleosAppProvider'; 

function MyApp({ Component, pageProps }:AppProps) {
    console.log("Custom App is running");

    return (
        <EleosAppProvider>
            <Component {...pageProps} />
        </EleosAppProvider>
    );
}

export default MyApp;