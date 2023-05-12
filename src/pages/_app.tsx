import { ChakraProvider } from '@chakra-ui/react'

import type { AppProps } from 'next/app'

import { Client, cacheExchange, fetchExchange, Provider } from 'urql'

const client = new Client({
  url: '/api/graphql',
  exchanges: [cacheExchange, fetchExchange],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}
