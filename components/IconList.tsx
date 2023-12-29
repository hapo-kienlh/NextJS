import React from "react";
import { Box, ListItem, ListItemIcon } from "@mui/material";

const IconList = ({ icons, onItemClick }: any) => {
  return (
    <Box sx={{ display: "flex" }}>
      {icons.map((icon: any, index: any) => (
        <ListItem key={index} onClick={() => onItemClick(icon)}>
          <ListItemIcon>{icon}</ListItemIcon>
        </ListItem>
      ))}
    </Box>
  );
};

export default IconList;
