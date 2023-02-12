import { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { EHT_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from './utils/config';
import { connectWallet, disconnectWallet, getStarknet, initialConnect } from './utils/starknet';
import { useResponsiveValue } from './utils/useResponsiveValue';
import web3Utils from 'web3-utils';
import { toast } from 'react-toastify';
window.Buffer = window.Buffer || require('buffer').Buffer;

export const mintOverlayHeight = { desktop: 80, tablet: 80, mobile: 60 };

enum MintType {
  OG,
  WHITELIST,
  PUBLIC,
}

const isOpenMintWhitelist = () => {
  const openTime = 1676213940000; // 15h UTC
  return new Date().getTime() >= openTime;
};

export const MintOverlay = () => {
  const height = useResponsiveValue(mintOverlayHeight);
  const isMobile = useResponsiveValue({ desktop: false, tablet: false, mobile: true });
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [openPopoverMint, setOpenPopoverMint] = useState<MintType>();
  const [openMintWhitelist, setOpenMintWhitelist] = useState(isOpenMintWhitelist());

  useEffect(() => {
    const timeout = setInterval(() => {
      setOpenMintWhitelist(isOpenMintWhitelist());
    }, 1000);
    return () => clearInterval(timeout);
  }, [setOpenMintWhitelist]);

  const loadInfo = useCallback(() => {
    const starknet = getStarknet();
    if (starknet.isConnected) {
      setIsConnected(true);
      setWalletAddress(starknet.account.address);
    } else {
      setIsConnected(false);
      setWalletAddress('');
    }
  }, [setWalletAddress, setIsConnected]);

  useEffect(() => {
    initialConnect().then(loadInfo);
  }, [loadInfo]);

  return (
    <Container style={{ height }}>
      <Left>
        {!isConnected && (
          <Button
            outline={false}
            onClick={async () => {
              await connectWallet();
              loadInfo();
            }}
          >
            MINT NOW
          </Button>
        )}
        {!!isConnected && (
          <>
            {/* <Button outline={false} onClick={() => setOpenPopoverMint(MintType.OG)}>
              MINT OG
            </Button>
            &nbsp;&nbsp;&nbsp; */}
            <Button
              outline={false}
              disabled={!openMintWhitelist}
              onClick={() => setOpenPopoverMint(MintType.WHITELIST)}
            >
              MINT WHITELIST
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button outline disabled onClick={() => setOpenPopoverMint(MintType.PUBLIC)}>
              MINT PUBLIC
            </Button>
            {!isMobile && (
              <>
                &nbsp;&nbsp;&nbsp;
                <a
                  href="#disconnect"
                  onClick={async () => {
                    await disconnectWallet();
                    loadInfo();
                    setOpenPopoverMint(undefined);
                  }}
                >
                  {walletAddress.slice(0, 3)}
                  ...
                  {walletAddress.slice(-4)}
                  &nbsp; (DISCONNECT)
                </a>
              </>
            )}
          </>
        )}
      </Left>
      {/* <div>Minted 0/{maxSupply}</div> */}
      <Right>
        {/* <a target="_blank" href="#discord">
          Mint Square
        </a>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; */}
        <a target="_blank" href="https://twitter.com/starknetcity">
          Twitter
        </a>
      </Right>
      {openPopoverMint === MintType.OG && (
        <Popover>
          <PopoverClose onClick={() => setOpenPopoverMint(undefined)}></PopoverClose>
          <PopoverTitle>MINT OG</PopoverTitle>
          {new Array(5).fill('0').map((_, index) => (
            <Mint
              key={index}
              amount={index + 1}
              type={MintType.OG}
              onClick={() => setOpenPopoverMint(undefined)}
            />
          ))}
        </Popover>
      )}
      {openPopoverMint === MintType.WHITELIST && (
        <Popover>
          <PopoverClose onClick={() => setOpenPopoverMint(undefined)}></PopoverClose>
          <PopoverTitle>MINT WHITELIST</PopoverTitle>
          {new Array(10).fill('0').map((_, index) => (
            <Mint
              key={index}
              amount={index + 1}
              type={MintType.WHITELIST}
              onClick={() => setOpenPopoverMint(undefined)}
            />
          ))}
        </Popover>
      )}
      {openPopoverMint === MintType.PUBLIC && (
        <Popover>
          <PopoverClose onClick={() => setOpenPopoverMint(undefined)}></PopoverClose>
          <PopoverTitle>MINT PUBLIC</PopoverTitle>
          {new Array(10).fill('0').map((_, index) => (
            <Mint
              key={index}
              amount={index + 1}
              type={MintType.PUBLIC}
              onClick={() => setOpenPopoverMint(undefined)}
            />
          ))}
        </Popover>
      )}
    </Container>
  );
};

const mintEntrypointMapping = {
  [MintType.OG]: 'ogMint',
  [MintType.WHITELIST]: 'whitelistMint',
  [MintType.PUBLIC]: 'mint',
};
type MintProps = { amount: number; type: MintType; onClick?: () => any };
const Mint: FC<MintProps> = ({ amount, type, onClick }) => {
  const onMint = async () => {
    const loadingId = toast.loading('Minting...');
    try {
      onClick?.();
      const starknet = getStarknet();
      const fee = await getMintFee(type);
      const approvePrice = fee.mul(web3Utils.toBN(amount));
      const entrypoint = mintEntrypointMapping[type];

      await starknet.account.execute([
        {
          contractAddress: EHT_CONTRACT_ADDRESS,
          entrypoint: 'approve',
          calldata: [NFT_CONTRACT_ADDRESS, approvePrice.toNumber(), 0],
        },
        ...Array(amount).fill({
          contractAddress: NFT_CONTRACT_ADDRESS,
          entrypoint: entrypoint,
          calldata: [starknet.account.address],
        }),
      ]);
      toast.dismiss(loadingId);
      toast.success('Minted successfully');
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingId);
      toast.error('Mint failure');
    }
  };
  return (
    <MintButton block outline onClick={onMint}>
      Mint {amount} NFT{amount > 1 ? 's' : ''}
    </MintButton>
  );
};

const getFeeEntrypointMapping = {
  [MintType.OG]: 'getOgMintFee',
  [MintType.WHITELIST]: 'getWhitelistMintFee',
  [MintType.PUBLIC]: 'getMintFee',
};
const getMintFee = async (type: MintType) => {
  const starknet = getStarknet();
  const { result } = await starknet.account.callContract({
    contractAddress: NFT_CONTRACT_ADDRESS,
    entrypoint: getFeeEntrypointMapping[type],
    calldata: [],
  });
  return web3Utils.toBN(result[0]);
};

const Container = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  border-top: 1px solid #fff;
  padding: 15px 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 700px) {
    padding: 15px;
    justify-content: center;
  }
`;

const Left = styled.div`
  @media screen and (max-width: 700px) {
    button {
      font-size: 12px;
      padding: 0 10px;
      height: 38px;
    }
  }
`;
const Right = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Popover = styled.div`
  position: absolute;
  bottom: 100%;
  padding: 15px 20px;
  margin-bottom: 1px;
  background-color: rgba(0, 0, 0, 0.9);
  width: 500px;
  left: 42px;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid #99ff66;
  @media screen and (max-width: 700px) {
    width: calc(100% - 30px);
    left: 15px;
  }
`;
const PopoverTitle = styled.div`
  text-align: center;
  border-bottom: 1px solid #fff;
  padding-bottom: 10px;
  font-weight: bold;
`;
const MintButton = styled(Button)`
  margin-top: 8px;
  height: 30px;
  border: none !important;
`;
const PopoverClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 10;
  &::after,
  &::before {
    content: '';
    width: 70%;
    height: 1px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 15%;
    transform: rotate(-45deg);
  }
  &::after {
    transform: rotate(45deg);
  }
`;
