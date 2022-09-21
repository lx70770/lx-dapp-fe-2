import { useLXMFERInfo } from '@/hooks/useLXMFERContract'
import useWallet from '@/hooks/useWallet'
import MetaMaskOnboarding from '@metamask/onboarding'
import { message } from 'antd'
import React from 'react'
import opensea from '../assets/opensea.jpg'
import twitter from '../assets/twitter.jpg'
import styles from './styles.less'

const App: React.FC = () => {
  const { account, isActive, isActiviting, connect, isNetworkNotSupport } = useWallet()
  const { loading, mintLoading, mint, balance, totalSupply } = useLXMFERInfo()

  const connectWallet = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      connect()
    } else {
      new MetaMaskOnboarding().startOnboarding()
    }
  }

  console.log(isActiviting)
  console.log(loading)

  const firstButton = () => {
    if (isActiviting || loading) {
      message.warn('please wait a moment.')
      return
    }

    if (!account || !isActive) {
      connectWallet()
      return
    }

    if (isNetworkNotSupport) {
      connectWallet()
      message.warn('Network error, you need switch network.')
      return
    }

    if (Number(balance) > 0) {
      message.warn('You already own an NFT')
      return
    }
    mint(account)
  }

  return (
    <div className={styles.mint_wrap}>
      <div className={styles.mint}>
        <div className={styles.fuck_off}>FUCK OFF CENTRALIZED</div>
        <div className={styles.fuck_off}>
          <div>free mint</div>
          <div>{totalSupply}/999</div>
        </div>
        <div className={styles.button} onClick={firstButton}>
          {Number(totalSupply) >= 999 ? 'sold out' : 'mint'}
        </div>
        <div className={styles.socal_button}>
          <a href="https://twitter.com/CryptoPowellNFT" target="_blank">
            <img src={twitter} alt="" />
          </a>
          <a href="https://opensea.io/collection/fuckoffcentralized" target="_blank">
            <img src={opensea} alt="" />
          </a>
        </div>
        <div></div>
      </div>
      <div className={styles.bo}></div>
    </div>
  )

  // return (
  //   <div className={styles.mint_wrap}>
  //     {/* <div className={styles.mint_button} onClick={firstButton}></div> */}
  //     <div className={styles.socal_button}>
  //       <a href="https://twitter.com/thenftisdead" target="_blank">
  //         <img src={twitter} alt="" />
  //       </a>
  //       <a href="https://opensea.io/collection/nftisdead" target="_blank">
  //         <img src={opensea} alt="" />
  //       </a>
  //       {/* <a href="https://www.instagram.com/thenftisdead" target="_blank">
  //         <img src={ins} alt="" />
  //       </a> */}
  //     </div>
  //   </div>
  // )
}

export default App
