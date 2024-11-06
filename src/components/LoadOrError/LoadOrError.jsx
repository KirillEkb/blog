import { useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

const LoadOrError = () => {
  const loading = useSelector((state) => state.app.loading);
  const error = useSelector((state) => state.app.error);
  return (
    <>
      {loading && <Spin size="large" />}
      {error && !loading && (
        <Offline>
          <Alert type="error" message={`Check your connection, error: ${error}`}></Alert>
        </Offline>
      )}
      {error && (
        <Online>
          <Alert type="error" message={`Something went wrong, error: ${error}`}></Alert>
        </Online>
      )}
    </>
  );
};

export default LoadOrError;
