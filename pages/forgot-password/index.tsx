import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SendmailModal from "../../components/SendmailModel";

function ForgotPassword() {
  const [isSending, setIsSending] = useState(false);
  const [id, setId] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [sendmailSuccess, setSendmailSuccess] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
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
        const { id } = response.data.user;
        setId(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleForgotPassword = async () => {
    try {
      setIsSending(true);
      const response = await axios.post(
        "http://localhost:3000/users/send-email",
        {
          id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const { status } = response.data;
      if (status === 200) {
        setIsSending(false);
        setSendmailSuccess(true);
      }
      setModalOpen(true);
    } catch (error) {
      setSendmailSuccess(false);
      setModalOpen(true);
      setIsSending(false);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          maxWidth: 400,
          margin: "auto",
          marginTop: 50,
        }}
      >
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" color="initial">
            Send Password your gmail
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleForgotPassword}
          disabled={isSending}
        >
          {isSending ? <CircularProgress size={25} color="inherit" /> : "Send"}
        </Button>
      </Box>

      <SendmailModal
        open={modalOpen}
        onClose={handleCloseModal}
        success={sendmailSuccess}
      />
    </>
  );
}

export default ForgotPassword;
