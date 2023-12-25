import axios from "axios";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Avatar, Box, Button } from "@mui/material";

function Me() {
  const [user, setUser] = useState<any>();
  const handleAvatarClick = () => {
    alert("Upload avatar");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/detail`, {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {user && (
        <Card sx={{ textAlign: "center" }}>
          <CardHeader
            title={
              <Typography variant="h4" color="primary">
                PROFILE
              </Typography>
            }
          />
          <CardContent>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={user.avatar}
                style={{ width: 100, height: 100, marginBottom: 10 }}
                onClick={handleAvatarClick}
                sx={{ cursor: "pointer" }}
              />
              <Typography variant="body1" color="textPrimary">
                Username: <strong> {user.username}</strong>
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Email: <strong>{user.email}</strong>
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Posts: <strong>{user.posts.length}</strong>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default Me;
