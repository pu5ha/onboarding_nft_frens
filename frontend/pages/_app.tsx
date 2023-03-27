import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import '../styles/button.css'

const alchemyId = process.env.ALCHEMY_ID ?? ''
console.log('alchemyId', alchemyId)

const { chains, provider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: alchemyId }), publicProvider()]
)
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
