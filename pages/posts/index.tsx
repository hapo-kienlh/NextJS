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
import axios from "axios";
import React, { useEffect, useState } from "react";

function Posts() {
  const [change, setChange] = useState(true);
  const [posts, setPosts] = useState<any>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts/", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [change]);

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
            //onClick={handlePost}
            sx={{ marginBottom: 2 }}
          >
            Post
          </Button>
        </Box>
      </Paper>
      <Container sx={{ marginTop: 4 }} maxWidth="md">
        <Grid container spacing={2}>
          {posts?.list_post.map((post: any) => (
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
