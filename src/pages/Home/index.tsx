import { FC } from 'react';
import { MintOverlay, mintOverlayHeight } from '../../components/MintOverlay';
import { Template } from './Template';

export const HomePage: FC = () => {
  return (
    <>
      <Template offsetBottom={mintOverlayHeight} />
      <MintOverlay />
    </>
  );
};
