import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPost, getDataPosts, getDataUser, postComment, uploadImage } from "./actions";

interface ApiState {
  dataPost: null | any;
  loading: boolean;
  error: null | string;
  isCreatePost: null;
  dataUser: null;
  isUploadImage: null;
  isComment: null;
}

const initialState: ApiState = {
  dataPost: null,
  isCreatePost: null,
  loading: false,
  error: null,
  dataUser: null,
  isUploadImage: null,
  isComment: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Get Post */
      .addCase(getDataPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataPosts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataPost = action.payload;
      })
      .addCase(getDataPosts.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Create Post */
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isCreatePost = action.payload;
      })
      .addCase(createPost.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Get User */
      .addCase(getDataUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataUser = action.payload;
      })
      .addCase(getDataUser.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Upload Image User */
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isUploadImage = action.payload;
      })
      .addCase(uploadImage.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* User Comment */
      .addCase(postComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isComment = action.payload;
      })
      .addCase(postComment.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
