import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme: Theme) =>
  createStyles({
    root: {
      minHeight: "calc(100vh - 90px)",
      display: "flex",
      alignItems: "center",
    },
    notes: {
      position: "absolute",
      top: "120px",
      opacity: ".5",
      left: "50%",
      transform: "translateX(-50%)",
      lineHeight: '1.2',
    },
  });
