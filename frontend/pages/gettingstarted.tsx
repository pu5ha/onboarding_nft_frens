import React from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import faucet from '../contracts/faucet'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BeatLoader } from 'react-spinners'

export default function gettingstarted() {
  const { config } = usePrepareContractWrite({
    address: faucet.address as `0x${string}`,
    abi: faucet.abi,
    functionName: 'drip',
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const handleClick = async () => {
    if (write) {
      await write()
    }
  }

  return (
    <div className="bg-start min-h-screen">
      <Navbar />
      <div
        className="flex flex-col items-center justify-center h-full text-white"
        style={{
          textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        }}
      >
        <h1 className="text-5xl font-bold mb-5">Getting Started</h1>
        <ol className="list-decimal text-2xl text-center mb-10">
          <li>
            Download the{' '}
            <a href="https://metamask.io/download.html" className="underline">
              Metamask extension
            </a>{' '}
            and set up a wallet
          </li>
          <li>
            Click the button below to connect your newly downloaded metamask
            wallet
          </li>
          <div className="mt-4 mb-4 flex justify-center items-center">
            <ConnectButton />
          </div>
          <li>
            Click the button below and accept all the transaction to get some
            free ETH
          </li>
          <button
            className="button mt-4 mb-4 text-2xl font-bold py-4 px-8 bg-blue-900 text-white rounded-full"
            onClick={handleClick}
          >
            Free ETH
          </button>
          {isLoading && <BeatLoader color="#FFFFFF" size={15} />}
          {isSuccess && !isLoading && (
            <p className="text-xl mb-2">You got yourself some ETH!</p>
          )}
          <li>
            Once you have some ETH, click the button below to go to the mint NFT
            page:
          </li>
          <button className="button mt-4 text-2xl font-bold py-4 px-8 bg-blue-900 text-white rounded-full">
            <Link href="/mint">Mint NFT Page</Link>
          </button>
        </ol>
      </div>
    </div>
  )
}
