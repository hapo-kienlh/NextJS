import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import IconList from "./IconList";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { getDataPosts } from "../redux/actions";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { icons } from "../config";

const IconButtonWithPopover = (props: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { reactions, postId } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [change, setChange] = useState(false);

  useEffect(() => {
    dispatch(getDataPosts());
  }, [change]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconClick = async (selectedIcon: any) => {
    const reactionType = icons.indexOf(selectedIcon);
    // dispatch(reactionPost({ postId: postId, type: reactionType }));
    try {
      const response = await axios.get(
        `http://localhost:3000/posts/reaction/${postId}/${reactionType}`,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setChange((prev) => !prev);
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }

    handleClose();
  };

  return (
    <>
      <Box sx={{ padding: 1 }}>
        <Grid container spacing={1}>
          {reactions.map((reaction: any) => (
            <Grid item key={reaction.id}>
              <small style={{ fontSize: "20px" }}>{icons[reaction.type]}</small>
            </Grid>
          ))}
        </Grid>
      </Box>
      <IconButton onClick={handleClick}>
        <ThumbUpIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <IconList icons={icons} onItemClick={handleIconClick} />
      </Popover>
    </>
  );
};

export default IconButtonWithPopover;
