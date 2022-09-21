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
      <div className={styles.bo}></div>
      <div className={styles.mint}>
        <div className={styles.fuck_off}>Crypto Powell.</div>
        <div className={styles.mint_info}>
          <div>supply:</div>
          <div>{totalSupply}/5555</div>
        </div>
        <div className={styles.button} onClick={firstButton}>
          {Number(totalSupply) >= 999 ? 'sold out' : 'free mint'}
        </div>
        <div className={styles.socal_button}>
          <a href="https://twitter.com/CryptoPowellNFT" target="_blank">
            <img src={twitter} alt="" />
          </a>
          <a href="https://opensea.io/collection/cryptopowell" target="_blank">
            <img src={opensea} alt="" />
          </a>
        </div>
        <div></div>
      </div>
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
