'use client';

import { Button } from '@nextui-org/button';
import { Avatar, ConnectKitButton } from 'connectkit';

import { cn } from '@/utils';

export default function Connect() {
   return (
      <>
         <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName, address }) => (
               <Button
                  color={isConnected ? 'default' : 'primary'}
                  {...(isConnected && {
                     startContent: (
                        <Avatar
                           size={24}
                           address={address}
                        />
                     ),
                  })}
                  onPress={show}
                  className={cn('bg-default-100 text-sm font-normal text-default-600')}>
                  {isConnected ? ensName ?? truncatedAddress : 'Connect wallet'}
               </Button>
            )}
         </ConnectKitButton.Custom>
      </>
   );
}
