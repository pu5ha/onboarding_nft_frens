// pages/index.tsx

import React, { useRef } from 'react'
import styles from '@/styles/Home.module.css'
import Navbar from '../components/Navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-custom min-h-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center h-full w-1/2">
          <div
            className="text-white text-center"
            style={{
              textShadow:
                '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
            }}
          >
            <h1 className="text-5xl font-bold mb-5">
              Welcome to the Alliance of the Goo NFT Universe
            </h1>
            <p className="text-2xl mb-1">
              Introducing our unique NFT collection featuring 15 different
              images of our squad! With each mint, you will be the lucky owner
              of one of these exclusive and memorable pieces. Don't miss your
              chance to own a piece of our groupme and history, with every NFT
              being as special and unique as the homie they represent.
            </p>
            <Link href="/gettingstarted">
              <button className="button text-3xl font-bold py-4 px-8 bg-blue-900 text-white rounded-full border-4 border-blue-900">
                Click Here To Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
