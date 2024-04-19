'use client';

import { useState } from 'react';

import { NextUIProvider } from '@nextui-org/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { Children } from '@/types';

export interface ProvidersProps extends Children {
   themeProps?: Partial<Omit<ThemeProviderProps, 'children'>>;
}

const config = createConfig(
   getDefaultConfig({
      chains: [mainnet],
      transports: {
         [mainnet.id]: http(),
      },

      // Required API Keys
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

      // Required App Info
      appName: 'Your App Name',

      // Optional App Info
      appDescription: 'Your App Description',
      appUrl: 'https://family.co', // your app's url
      appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
   }),
);

export function Providers({ children, themeProps }: ProvidersProps) {
   const router = useRouter();

   const [queryClient] = useState(() => new QueryClient());

   return (
      <WagmiProvider config={config}>
         <QueryClientProvider client={queryClient}>
            <ConnectKitProvider mode="auto">
               <NextUIProvider navigate={router.push as any}>
                  <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
               </NextUIProvider>
            </ConnectKitProvider>
         </QueryClientProvider>
      </WagmiProvider>
   );
}
