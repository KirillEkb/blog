import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { deleteFavorite, toFavorite } from '../../api/api';

const Like = ({ favorited, slugParam }) => {
  const dispatch = useDispatch();
  const FavoriteChange = () => {
    if (favorited) {
      dispatch(deleteFavorite(slugParam));
    } else {
      dispatch(toFavorite(slugParam));
    }
  };
  return favorited ? (
    <HeartFilled style={{ color: 'rgba(255, 7, 7, 1)' }} onClick={FavoriteChange} />
  ) : (
    <HeartOutlined onClick={FavoriteChange} />
  );
};

export default Like;
