// components/Navbar.tsx

import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useRef } from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className="font-roboto text-white font-bold flex justify-between px-5 py-2">
      <ul className="flex item-center space-x-2">
        <li>
          <Link href="/">
            <div className="flex items-center space-x-2 p-5">
              <img className="h-10 w-10" src="/images/logo.png" alt="logo" />
              <span className="uppercase">Goo NFT Universe</span>
            </div>
          </Link>
        </li>
      </ul>
      <ul className="flex item-center space-x-2 flex items-center space-x-2 p-5">
        <li className="mr-2">
          <Link href="/gettingstarted">
            <span className="uppercase">Getting Started</span>
          </Link>
        </li>
        <li className="mr-2">
          <Link href="/mint">
            <span className="uppercase">mint page</span>
          </Link>
        </li>
        <ConnectButton />
      </ul>
    </nav>
  )
}

export default Navbar
