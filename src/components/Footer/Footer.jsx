import { useDispatch, useSelector } from 'react-redux';
import { Pagination, ConfigProvider } from 'antd';

import { changePage } from '../../store/reducer';

import './Footer.css';

function Footer() {
  const dispatch = useDispatch();
  const total = useSelector((state) => {
    return state.app.total;
  });
  const offset = useSelector((state) => {
    return state.app.offset;
  });
  const changePagePagination = (page) => {
    dispatch(changePage(page));
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorPrimary: 'white',
            itemActiveBg: '#007bff',
          },
        },
      }}
    >
      <Pagination
        onChange={changePagePagination}
        className="pagination"
        align="center"
        current={offset / 20 + 1}
        defaultPageSize={20}
        showSizeChanger={false}
        total={total}
      />
    </ConfigProvider>
  );
}

export default Footer;
