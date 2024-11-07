import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://blog-platform.kata.academy/api';
const token = localStorage.getItem('authToken');
const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

export const getPosts = createAsyncThunk('getPosts', async (offset, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/articles?offset=${offset}`, authHeaders);
    if (!response.ok) {
      return rejectWithValue(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.message });
  }
});

export const getArticle = createAsyncThunk('getArticle', async ({ slug }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}`, authHeaders);
    if (!response.ok) {
      return rejectWithValue(response.statusText);
    }
    const data = await response.json();
    return data.article;
  } catch (error) {
    return rejectWithValue({ message: error.message });
  }
});

export const createUser = createAsyncThunk('createUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.errors);
    }

    const data = await response.json();
    return data.user.token;
  } catch (error) {
    return rejectWithValue({ networkError: error.message });
  }
});

export const loginUser = createAsyncThunk('loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.errors);
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    return rejectWithValue({ networkError: error.message });
  }
});

export const isLoggedIn = createAsyncThunk('isLoggedIn', async (_, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('No token found');
  }
  try {
    if (token) {
      const response = await fetch(`${baseUrl}/user`, authHeaders);
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      const data = await response.json();
      return data.user;
    } else {
      return null;
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editProfile = createAsyncThunk('editProfile', async (userData, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('Something went wrong');
  }
  const user = { ...userData, image: userData.avatar, password: userData['new password'] };
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user: user }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.errors);
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createArticle = createAsyncThunk('createArticle', async (articleData, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('Something went wrong');
  }
  try {
    const response = await fetch(`${baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.errors);
    }
    const data = await response.json();
    return data.article;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editArticle = createAsyncThunk('editArticle', async (articleData, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('Something went wrong');
  }
  try {
    const response = await fetch(`${baseUrl}/articles/${articleData.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.errors);
    }
    const data = await response.json();
    return data.article;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteArticle = createAsyncThunk('deleteArticle', async (slugParam, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('Something went wrong');
  }
  try {
    const response = await fetch(`${baseUrl}/articles/${slugParam}`, { method: 'DELETE', ...authHeaders });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.errors);
    }
    const data = await response.json();
    return data.article;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const toFavorite = createAsyncThunk('toFavorite', async (slugParam, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('Log In first');
  }
  try {
    const response = await fetch(`${baseUrl}/articles/${slugParam}/favorite`, { method: 'POST', ...authHeaders });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.errors);
    }
    const data = await response.json();
    return data.article;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteFavorite = createAsyncThunk('deleteFavorite', async (slug, { rejectWithValue }) => {
  if (!token) {
    return rejectWithValue('Log In first');
  }
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, { method: 'DELETE', ...authHeaders });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.errors);
    }
    const data = await response.json();
    return data.article;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
