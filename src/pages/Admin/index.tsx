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
      <Mint
        defaultAddress="0x07DEb5d9BB6929454eeda66aC7947b3f297985B12c941acf9d20843BAD965400"
        defaultAmount={5}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x0294E799d6e10CCd99776704b0666fd1433d5a7118694bd0fAD0E55FE1A0d7d9"
        defaultAmount={5}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x0786e2D057bde22fD6eF298ca03E92f9630aFFED4cCdBBe85B981A663f64c9A4"
        defaultAmount={3}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x03a1165055c4653858CdC9E08a1561a0a6aD46649A7684f79A8878d62e61f570"
        defaultAmount={5}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x02F9c92414310EfA5B688bcE2056cCBabfEA5d7691929CF8e381a044577710EE"
        defaultAmount={1}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x05B89d6bCB7382dC48B5A4814F682B8416d93E359FDEB08fc0956E87623f51E2"
        defaultAmount={3}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x006e03D34E8dC087F0d9D7435e20738124B4A260a83695F54f3523F85669E657"
        defaultAmount={5}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x01D52A74202074181CF2A4f1D37fD5AAC7713f5CC4E5EBaA6A896b7cDf847bAe"
        defaultAmount={5}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x0180F212Ae37297a35001586f2A6A8b77cC65595E09f00FE55FBE82Bb6A0768a"
        defaultAmount={5}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x041EA712Aa41B4DF1232e466351f971b5eBde2BE1536884B4560072650b33CCf"
        defaultAmount={3}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x021A88A5F1d381360e5b9d757112f755Aa23290B9c33d7f01A5763277BA2edFb"
        defaultAmount={2}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x06b832A53B52996CF58B2Ae89c861179e821e22feD27686F3eeCfbCb7bBF06bf"
        defaultAmount={5}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x0032B6442a9d4c332F770A2F3A486B546Cb7F82084ea6eB759e41a86634e06E5"
        defaultAmount={5}
      />
      <br />
      <br />
      <br />
      <Mint
        defaultAddress="0x014Beb4d3c513966b7b4Ac7a6f845E3C725332E909818e6Bf30f89424aC2955a"
        defaultAmount={5}
      />
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
          calldata: [starknet.account.address],
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
