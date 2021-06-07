import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        fontFamily: "sans-serif",
        h5: {
          color: "white",
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: "1.5rem",
          letterSpacing: "0px",
        },
        h6: {
            color: "white",
            fontFamily: "sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            letterSpacing: "0px",
          },
          body1: {
            fontFamily: "sans-serif",
            lineHeight: 1.5,
            fontWeight: 500,
            fontSize: "1rem",
            letterSpacing: "0.1px",
            color:"white"
          },
    },
});

export default theme;
