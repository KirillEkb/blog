import { HeartOutlined } from '@ant-design/icons';
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
  return <HeartOutlined onClick={FavoriteChange} />;
};

export default Like;
