import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type CardProps = {
  familyName: string;
  firstName: string;
  email: string;
  point: number;
};

export const MemberCard = (props: CardProps) => {
  const { familyName, firstName, email, point } = props;
  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {familyName}&ensp;{firstName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "column" }}>
          <IconButton aria-label="add to shopping cart">
            <ArrowForwardIosIcon />
          </IconButton>
        </CardActions>
      </CardContent>
      <CardContent sx={{ display: "flex", alignItems: "baseline" }}>
        <CardContent sx={{ fontWeight: "bold" }}>
          現在の獲得ポイント：
        </CardContent>
        <CardContent
          sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
        >
          <Typography variant="h5">{point}</Typography>
          <Typography variant="body2" color="text.secondary">
            &ensp;pt
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};
