import { FC, useEffect, useState } from 'react';
import { NFT_CONTRACT_ADDRESS } from '../../components/MintOverlay/utils/config';
import { getStarknet, initialConnect } from '../../components/MintOverlay/utils/starknet';
import { withdraw } from '../../components/MintOverlay/utils/withdraw';

export const AdminPage = () => {
  useEffect(() => {
    initialConnect();
  }, []);

  return (
    <div>
      <button onClick={withdraw}>Withdraw</button>
      <br />
      <br />
      <br />
      <SetOgMint />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x0139FF35F01F19212F5767bDB188d991cB3487474Ba0c0ca2ae53b6C47393CF9"
        defaultAmount={7}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x02f68CB031440777dBe8FC2920C7BCA55977bdB1B6DfEdf5300f0CfF40B32c73"
        defaultAmount={7}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x051F829Ae8F65A59d789Ca358164753127d582414012F91673CbF2B2d1D12ce0"
        defaultAmount={7}
      />
      <br />
      <br />
      <br />
      
      <Mint
        defaultAddress="0x0587aE0b7E9FC0e7Ec6051dFc1b192b657d136344f18d03fc5A0E50f4d712E54"
        defaultAmount={7}
      />
      <br />
      <br />
      <br />
      
      <Mint
        defaultAddress="0x0000b0Fe6a9364fbd8e43342a734D5220888c761163E835217431C26a7fB235D"
        defaultAmount={7}
      />
      <br />
      <br />
      <br />
      
      <Mint
        defaultAddress="0x05f7beffA8388153A5FA5E4a9403A673D0e5522fBeC5F1aABcB69e57c3A818B8"
        defaultAmount={7}
      />
      <br />
      <br />
      <br />
      
      <Mint
        defaultAddress="0x00bFEbf5E716a8d0429FDe3e9F738291c625eaB055ec0DBFd47BEEf2f8905067"
        defaultAmount={7}
      />
      <br />
      <br />
      <br />
      
      <Mint
        defaultAddress="0x03a9B04d3Ef6F0C53584fa909b8E22AE8DE8900b6665C4b3c2C445f936371112"
        defaultAmount={7}
      />
      <br />
      <br />
      <br />
      
      <Mint
        defaultAddress="0x057876086D9D93A96F168325C4458ab78F088549F723a3115E8C0A8877DEFe21"
        defaultAmount={7}
      />
      <br />
      <br />
      <br />
      
      <Mint
        defaultAddress="0x047817Fe25CE9D7d8C0943FEcb4455320D710b95E638A59DE64C5D271BdA38df"
        defaultAmount={4}
      />
      <br />
      <br />
      <br />
      
    </div>
  );
};

const Mint: FC<{ defaultAddress?: string; defaultAmount?: number }> = ({
  defaultAddress = '',
  defaultAmount = 1,
}) => {
  const [address, setAddress] = useState(defaultAddress);
  const [amount, setAmount] = useState(defaultAmount);
  const mint = async () => {
    try {
      const starknet = getStarknet();

      await starknet.account.execute([
        ...Array(amount).fill({
          contractAddress: NFT_CONTRACT_ADDRESS,
          entrypoint: 'mint',
          calldata: [address],
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <input
        placeholder="Address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        type="number"
        onChange={(event) => setAmount(parseInt(event.target.value))}
      />
      <button onClick={mint}>Mint</button>
    </>
  );
};

const SetOgMint: FC = () => {
  const [count, setCount] = useState(1);
  const [addresses, setAddresses] = useState('');
  const onSetOgMintAddress = async () => {
    const starknet = getStarknet();

    const options = addresses
      .split('\n')
      .filter((item) => !!item)
      .map((address) => {
        return {
          contractAddress: NFT_CONTRACT_ADDRESS,
          entrypoint: 'setOGWhitelistWallets',
          calldata: [address, '1', '0'],
        };
      });
    await starknet.account.execute(options);
  };
  return (
    <div style={{ color: '#000' }}>
      <div>Amount</div>
      <input
        type="number"
        value={count}
        onChange={(event) => setCount(parseInt(event.target.value))}
      />
      <div>Addresses</div>
      <textarea
        style={{ width: '100%' }}
        rows={10}
        value={addresses}
        onChange={(event) => setAddresses(event.target.value)}
      />
      <div></div>
      <button onClick={onSetOgMintAddress}>Submit</button>
    </div>
  );
};
