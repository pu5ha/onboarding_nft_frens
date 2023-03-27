import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import Navbar from '../components/Navbar'
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from 'wagmi'
import { watchContractEvent } from '@wagmi/core'
import randomgoonft from '../contracts/randomgoonft'
import { BeatLoader } from 'react-spinners'
import { ethers } from 'ethers'

export default function mint() {
  const [nftImage, setNftImage] = useState<string | null>(null)
  const [nftName, setNftName] = useState(null)
  const [nftDescription, setNftDescription] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [tokenId, setTokenId] = useState(null)
  const [showOverlay, setShowOverlay] = useState(false)

  const { config } = usePrepareContractWrite({
    address: randomgoonft.address as `0x${string}`,
    abi: randomgoonft.abi,
    functionName: 'mintNft',
    overrides: {
      value: ethers.utils.parseEther('0.001'),
    },
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const unwatch = watchContractEvent(
    {
      address: randomgoonft.address as `0x${string}`,
      abi: randomgoonft.abi,
      eventName: 'Transfer',
    },
    (from, to, tokenId: any) => {
      const normalNumber = tokenId.toNumber()
      console.log(normalNumber)
      setTokenId(normalNumber)
    }
  )

  const handleCloseOverlay = () => {
    setShowOverlay(false)
    setShowConfetti(false)
    setNftImage(null)
    setNftName(null)
    setNftDescription(null)
  }

  const { data: tokenURI } = useContractRead({
    address: randomgoonft.address as `0x${string}`,
    abi: randomgoonft.abi,
    functionName: 'tokenURI',
    args: tokenId !== null ? [tokenId] : [],
    cacheOnBlock: true,
  }) as { data: string | null }

  useEffect(() => {
    const fetchData = async () => {
      if (tokenId !== null && tokenURI) {
        const cid = tokenURI.slice(7)
        const newTokenURI = `https://gateway.pinata.cloud/ipfs/${cid}`
        console.log("NFT's tokenURI:", newTokenURI)
        try {
          const response = await fetch(newTokenURI)
          const metadata = await response.json()
          const imageCid = metadata.image.slice(7)
          const newImageUrl = `https://gateway.pinata.cloud/ipfs/${imageCid}`
          console.log('NFT Image URL:', newImageUrl)
          setNftImage(newImageUrl)
          setNftName(metadata.name)
          setNftDescription(metadata.description)
          setShowConfetti(true)
          setShowOverlay(true)
        } catch (error) {
          console.error('Error while fetching and parsing metadata:', error)
        }
      }
    }
    fetchData()
  }, [tokenId, tokenURI])

  const handleClick = async () => {
    console.log('Mint button clicked')
    if (write) {
      try {
        await write()
      } catch (error) {
        console.error('Error during contract interaction:', error)
      }
    }
  }

  return (
    <div className="bg-mint min-h-screen">
      {showConfetti && <Confetti />}
      <Navbar />
      <div className="flex justify-center items-center mt-5 text-white">
        <div className="flex w-3/5">
          <img
            className="rounded-l-xl object-cover h-full w-1/2"
            src="/images/cream.jpg"
            alt="creamcouch"
          />
          <div className="p-8 bg-black bg-opacity-75 w-1/2 rounded-r-xl">
            <h1 className="text-xl font-bold mb-4">Enter the Goo Universe</h1>
            <p className="mb-6 leading-7">
              The moment you've been waiting for is here. With 15
              randomly-generated options, there's no telling which one will be
              your new BFF (Best Fun Find). Will it be a Hob or JRein? Only one
              way to find out - hit that mint button and let fate decide!
            </p>
            <div className="flex text-xl font-bold items-center mt-10 mb-10">
              <img
                className="h-8 w-8 mr-2"
                src="/images/ethereum-logo.svg.png"
                alt="ethereum-logo"
              />
              <span>0.001 ETH</span>
            </div>
            <div className="flex justify-center w-full">
              <button
                className="text-2xl font-bold py-5 px-12 bg-blue-900 text-white rounded-full"
                onClick={handleClick}
              >
                Mint
              </button>
            </div>
            {isLoading && (
              <div className="mt-4 flex justify-center w-full">
                <BeatLoader color="#FFFFFF" size={15} />
              </div>
            )}
          </div>
        </div>
      </div>
      {showConfetti && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-60 w-full h-full absolute"></div>
          <div className="bg-white p-8 rounded-xl relative z-10">
            {nftImage && (
              <img
                key={nftImage}
                className="w-48 h-48 mx-auto mb-4"
                src={nftImage}
                alt="Minted NFT"
              />
            )}
            <h2 className="text-2xl font-bold text-center mb-2">
              Congratulations!
            </h2>
            <p className="text-center mb-4">
              You just minted <strong>{nftName}</strong> with the description:
            </p>
            <p className="text-center">{nftDescription}</p>
          </div>
        </div>
      )}
      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-60 w-full h-full absolute"></div>
          <div className="bg-white p-8 rounded-xl relative z-10">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={handleCloseOverlay}
            >
              &times;
            </button>
            {nftImage && (
              <img
                key={nftImage}
                className="w-48 h-48 mx-auto mb-4"
                src={nftImage}
                alt="Minted NFT"
              />
            )}
            <h2 className="text-2xl font-bold text-center mb-2">
              Congratulations!
            </h2>
            <p className="text-center mb-4">
              You just minted <strong>{nftName}</strong> with the description:
            </p>
            <p className="text-center">{nftDescription}</p>
          </div>
        </div>
      )}
    </div>
  )
}
