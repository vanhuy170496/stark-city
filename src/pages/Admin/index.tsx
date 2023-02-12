import { useEffect } from 'react';
import { initialConnect } from '../../components/MintOverlay/utils/starknet';
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
    </div>
  );
};
