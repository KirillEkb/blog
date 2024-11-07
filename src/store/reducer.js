import { createSlice } from '@reduxjs/toolkit';

import {
  getPosts,
  getArticle,
  createUser,
  loginUser,
  isLoggedIn,
  editProfile,
  createArticle,
  deleteArticle,
  editArticle,
  toFavorite,
  deleteFavorite,
} from '../api/api';
const appSlice = createSlice({
  name: 'app',
  initialState: {
    posts: [],
    total: 0,
    userCreated: false,
    loading: false,
    error: null,
    offset: 0,
    post: null,
    user: {
      username: '',
      token: '',
      image: '',
      created_at: '',
      bio: '',
      email: '',
    },
  },
  reducers: {
    changePage(state, action) {
      state.offset = (action.payload - 1) * 20;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload.articles;
      state.loading = false;
      state.error = null;
      state.total = action.payload.articlesCount;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(getArticle.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getArticle.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getArticle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      localStorage.setItem('authToken', action.payload);
      state.loading = false;
      state.error = null;
      state.userCreated = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem('authToken', action.payload.token);
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    });

    builder.addCase(isLoggedIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(isLoggedIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(isLoggedIn.rejected, (state, action) => {
      state.loading = false;
      if (action.payload == 'No token found') {
        state.error = null;
      } else {
        state.error = action.error;
      }
    });

    builder.addCase(editProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    });

    builder.addCase(createArticle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createArticle.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(deleteArticle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(editArticle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editArticle.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(editArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(toFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(toFavorite.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.posts = state.posts.map((post) => (post.slug == action.payload.slug ? action.payload : post));
      state.post = action.payload;
    });
    builder.addCase(toFavorite.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.posts = state.posts.map((post) => (post.slug == action.payload.slug ? action.payload : post));
      state.post = action.payload;
    });
    builder.addCase(deleteFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { changePage } = appSlice.actions;
export default appSlice.reducer;
