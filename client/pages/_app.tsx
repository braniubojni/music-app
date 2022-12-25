import { FC } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
        <Component {...props} />
    </Provider>
  );
};

export default MyApp;
