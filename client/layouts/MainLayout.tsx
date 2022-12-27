import { Container } from '@mui/system';
import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import styles from '../style/MainLayoutContainer.module.scss';

interface IMainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{title || 'Music Platform'}</title>
        <meta
          name="description"
          content={
            'Music Platform. Here any one can have his own tracks and leave comments.' +
              description || ''
          }
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="index, follow" />
        <meta name="keywords" content={keywords || 'Music, tracks, artists'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container className={styles.Container}>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
