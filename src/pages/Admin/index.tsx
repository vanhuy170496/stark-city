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
        defaultAddress="0x07DEb5d9BB6929454eeda66aC7947b3f297985B12c941acf9d20843BAD965400"
        defaultAmount={5}
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
