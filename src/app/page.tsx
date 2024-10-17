"use client";
import Image from "next/image";
import { AppBar, Toolbar, Typography, Button, Box, Grid, TextField } from '@material-ui/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState} from "react";
import './globals.css'
import { createWalletClient, http, custom } from 'viem'
import { mainnet } from "viem/chains";

import Home from './components/Home'
import Smallbiz from './components/Smallbiz'
import WalletTransfer from './components/WalletTransfer'
import WalletPage from './components/WalletPage'
import Payment from "./components/Payment";
import { ConnectWallet } from './components/ConnectWallet'
import { WagmiProvider } from "wagmi";
import { config } from '../utils/wagmi'

const URL_TMP = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=%s"
const client = new QueryClient();

export default function App() {
  const [url, setUrl] = useState('')
  const [isQrUrlSubmitted, setIsQrUrlSubmitted] = useState(false)
  const [qrUrl, setQrUrl] = useState('')

  const [pageNum, setPageNum] = useState(7)

  const handleSubmit = (e) => {
    e.preventDefault()
    let user_url = URL_TMP.replace("%s", url)
    setIsQrUrlSubmitted(true)
    setQrUrl(user_url)
  }

  useEffect(() => {
    const walletClient = createWalletClient({
      chain: mainnet,transport: http()
    })
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <div className="App">
          <main>
            <Box>
              <AppBar position="static">
                <Toolbar>
                <Typography variant="h4" component="div" >
                  Deloaner
                </Typography> 
                <Button onClick={() => setPageNum(7)} color="inherit">Home</Button>
                <Button onClick={() => setPageNum(1)} color="inherit">Auth</Button>
                <Button onClick={() => setPageNum(2)} color="inherit">Dashboard</Button>
                <Button onClick={() => setPageNum(3)} color="inherit">Payment</Button>
                <Button onClick={() => setPageNum(4)} color="inherit">Connect</Button>
                <Button onClick={() => setPageNum(5)} color="inherit">Login</Button>
                <Button onClick={() => setPageNum(6)} color="inherit">Transfer</Button>
                </Toolbar>
              </AppBar>
            </Box>

            {pageNum === 7 && <Home />}
            {pageNum === 1 && (
              <form onSubmit={handleSubmit}>
                <div style={{marginTop: '25px', marginLeft: '600px'}}>
                  <Box sx={{width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
                    <Grid item xs={12} md={6}>
                      <Stack direction="column" spacing={2}>
                        {/** 输入网址 生成二维码 */}
                        <TextField 
                          required
                          id="Website URL"
                          label="Website URL"
                          defaultValue=""
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />

                        <button type='submit'> Creat QR Code</button>
                        <button onClick={() => setPageNum(2)}> Business Owner Dashboard</button>
                        <button onClick={() => window.open(qrUrl)}>{isQrUrlSubmitted ? "View QR Code" : "Not Submitted"}</button>
                      </Stack>
                    </Grid>
                  </Box>
                </div>
              </form>
            )}
            {pageNum === 2 && (
              <Smallbiz />
            )}
            {pageNum === 3 && (
              <Payment pageNum={pageNum} setPageNum={setPageNum} />
            )}
            {pageNum === 4 && (
              <ConnectWallet />
            )}
            {pageNum === 5 && (
              <WalletPage pageNum={pageNum} setPageNum={setPageNum} />
            )}
            {pageNum === 6 && (
              <WalletTransfer  />
            )}
          </main>
          {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="https://nextjs.org/icons/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="https://nextjs.org/icons/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="https://nextjs.org/icons/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </footer> */}
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
