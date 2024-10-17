import { disconnect } from 'process'
import { useConnect, useAccount, useDisconnect } from 'wagmi'

export const ConnectWallet = () => {
    const {
        isConnected,
        connector,
        address
    } = useAccount()
    const { connect, connectors, isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()

    return (
        <div>
            {!isConnected && (
                connectors.map((connector, index) => {
                    console.log('connectors', connector)
                    return (
                        <div>
                            <button disabled={!connector.ready} key ={connector.id + index} onClick={() => connect({connector})} type='button'>
                                <img src={connector.icon}></img>
                                Connect with {connector.name}
                                {!connector.ready && " (unsupported)"}
                                {isLoading &&
                                connector.id === pendingConnector?.id &&
                                " (connecting)"}
                            </button>
                        </div>
                    )
                })
            )}
            {isConnected && (
                <>
                    <p>Connected as {address}</p>
                    <button onClick={() => disconnect()} type='button'>
                        Disconnect
                    </button>
                </>
            )}
        </div>

    )
}