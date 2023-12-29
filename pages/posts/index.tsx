import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getDataPosts, postComment } from "../../redux/actions";
import { AppDispatch } from "../../redux/store";
import BackgroundSwitch from "../../components/Toggle";
import IconButtonWithPopover from "../../components/IconButtonWithPopover";

function Posts() {
  const dispatch: AppDispatch = useDispatch();
  const { dataPost, loading, error, isCreatePost, isComment } = useSelector(
    (state: any) => state
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComment("");
    setContent("");
    setTitle("");
  }, [isCreatePost, isComment]);

  useEffect(() => {
    dispatch(getDataPosts());
  }, [dispatch, isCreatePost, isComment]);

  const handleCreatePost = () => {
    dispatch(createPost({ title, content }));
  };

  const handlePostComment = (id: any) => {
    dispatch(postComment({ id, comment }));
  };

  return (
    <>
      <Box>
        {/* <Paper
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
        </Paper> */}
        <Container sx={{ marginTop: 4 }} maxWidth="md">
          <Grid container spacing={2}>
            {dataPost?.list_post.map((post: any) => (
              <Grid item key={post.id} xs={12}>
                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar
                          src={post.user.avatar}
                          alt={post.user.username}
                          sx={{ width: 75, height: 75 }}
                        />
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
                      <IconButtonWithPopover
                        postId={post.id}
                        reactions={post.reactions}
                      />
                    </CardContent>
                  </Card>
                  <Box sx={{ marginTop: 2 }}>
                    <List>
                      {post.comments?.map((item: any, index: number) => (
                        <React.Fragment key={item.id}>
                          <ListItem>
                            <Avatar
                              src={item.user.avatar}
                              alt={item.user.username}
                              sx={{ marginRight: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>{item.user.username}</strong>:{" "}
                              {item.content}
                            </Typography>
                          </ListItem>
                          {index < post.comments.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                  <Box sx={{ marginTop: 5 }}>
                    <TextField
                      label="Comment"
                      variant="outlined"
                      fullWidth
                      sx={{
                        marginBottom: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: 0 },
                      }}
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 1 }}
                      onClick={() => handlePostComment(post.id)}
                    >
                      Comment
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Posts;
