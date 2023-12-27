import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getDataPosts } from "../../redux/actions";
import { AppDispatch } from "../../redux/store";

function Posts() {
  const dispatch: AppDispatch = useDispatch();
  const { dataPost, loading, error, isCreatePost } = useSelector(
    (state: any) => state
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(getDataPosts());
  }, [dispatch, isCreatePost]);

  const handleCreatePost = () => {
    dispatch(createPost({ title, content }));
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{ padding: 2, borderRadius: 2, width: "30%", marginLeft: "35%" }}
      >
        <Typography
          sx={{ textAlign: "center" }}
          variant="h4"
          color="initial"
          gutterBottom
        >
          Create Post
        </Typography>
        <Box>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Content"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreatePost}
            sx={{ marginBottom: 2 }}
          >
            Post
          </Button>
        </Box>
      </Paper>
      <Container sx={{ marginTop: 4 }} maxWidth="md">
        <Grid container spacing={2}>
          {dataPost?.list_post.map((post: any) => (
            <Grid item key={post.id} xs={12}>
              <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar src={post.user.avatar} alt={post.user.username} />
                    }
                    title={post.user.username}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Posts;
