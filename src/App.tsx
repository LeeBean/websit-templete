import React from 'react';
import { AppRouter } from '@/routes';
import { App as AntdApp } from 'antd';
import ErrorBoundary from '@/components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AntdApp>
        <AppRouter />
      </AntdApp>
    </ErrorBoundary>
  );
};

export default App;
