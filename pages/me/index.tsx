import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Avatar, Box, Button, Container, Input } from "@mui/material";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDataUser, uploadImage } from "../../redux/actions";

function Me() {
  const dispatch: AppDispatch = useDispatch();
  const { dataUser, isUploadImage, loading, error } = useSelector(
    (state: any) => state
  );
  const [previewImage, setPreviewImage] = useState<any>();
  const fileInputRef = useRef<any>(null);
  const [file, setFile] = useState<any>();

  useEffect(() => {
    fileInputRef.current = document.getElementById("fileInput");
    dispatch(getDataUser());
  }, [dispatch, isUploadImage]);

  useEffect(() => {
    deleteImagePreview();
  }, [dataUser]);

  const handleChangeFile = (event: any) => {
    try {
      const fileImage = event.target.files[0];

      if (fileImage) {
        setFile(fileImage);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(fileImage);
      }
    } catch (error) {
      console.error("Error uploading CSV file:", error);
    }
  };

  const handleUploadAvatar = () => {
    dispatch(uploadImage(file));
  };

  const deleteImagePreview = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile("");
    setPreviewImage(null);
  };

  const handleAvatarClick = () => {
    alert("Upload avatar");
  };

  return (
    <>
      <Box>
        {dataUser && (
          <Card
            sx={{
              textAlign: "center",
              width: "30%",
              marginLeft: "35%",
            }}
          >
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
                  src={dataUser.user?.avatar}
                  style={{ width: 100, height: 100, marginBottom: 10 }}
                  onClick={handleAvatarClick}
                  sx={{ cursor: "pointer" }}
                />
                <Typography variant="body1" color="textPrimary">
                  Username: <strong> {dataUser.user?.username}</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Email: <strong>{dataUser.user?.email}</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Posts: <strong>{dataUser.user?.posts.length}</strong>
                </Typography>
              </Box>
            </CardContent>

            <Container sx={{ paddingTop: 4 }}>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h5"
                color="initial"
              >
                Upload Avatar
              </Typography>
              <Box
                sx={{
                  "& > :not(style)": { m: 3, width: "20%", marginLeft: "40%" },
                }}
              >
                <Box>
                  <Input
                    type="file"
                    onChange={handleChangeFile}
                    id="fileInput"
                  />
                </Box>
                {previewImage && (
                  <Box>
                    <img
                      onClick={deleteImagePreview}
                      src={previewImage}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  </Box>
                )}
                <Box>
                  <Button
                    onClick={handleUploadAvatar}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Register
                  </Button>
                </Box>
              </Box>
            </Container>
          </Card>
        )}
      </Box>
    </>
  );
}

export default Me;
