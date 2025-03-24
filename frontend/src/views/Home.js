import React, { useState, useEffect } from "react";
import { Typography, Box, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import apiCall from "../api/apiCall";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeBody: {
    display: "block",
    minHeight: "100vh",
    paddingTop: "30px",
    textAlign: "center",
    backgroundColor: "#1d2731",
  },
  titleText: {
    marginBottom: "15px",
    lineHeight: "70px",
  },
  subtitleText: {
    lineHeight: "50px",
    color: "#FFFFFF",
  },
  button: {
    margin: "15px",
  },
  inputField: {
    width: "300px",
    margin: "10px",
  },
  cssLabel: {
    color: "#FFFFFF",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  cssFocused: {},

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#FFFFFF !important",
  },
}));

export const Home = () => {
  const classes = useStyles();
  const [positions, setPositions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [radius, setRadius] = useState(Math.min(window.innerWidth, window.innerHeight) / 3);

  useEffect(() => {
    // Call endpoint to get current positions
    const fetchPositions = async () => {
      try {
        const response = await apiCall({
          endpoint: "positions/",
          method: "get"
        });
        setPositions(response.data.positions);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCenter({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
      setRadius(Math.min(window.innerWidth, window.innerHeight) / 3);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const PositionButton = ({ x, y, number }) => {
    return (
      <div
        className="box"
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          transform: "translate(-50%, -50%)", // Center each box correctly
        }}
      >
        <Button
          color="primary"
          size="large"
          variant="contained"
          className={classes.button}
          onClick={() => buttonClicked(number)}
          style={{
              backgroundColor: '#66cc91'
          }}
        >
          {number}
        </Button>
      </div>
    );
  };

  const buttonClicked = async (clickedPosition) => {
    await apiCall({
      endpoint: "launch-beer/",
      method: "post",
      data: {
        position: clickedPosition
      },
    })
      .then((result) => {
        console.log(`launch beer to ${clickedPosition}`)
      })
      .catch((err) => {
        alert(`An error occured: ${err}`)
      });
  }

  const LauncherPosition = ({ x, y }) => {
    return (
      <div
        className="box"
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          transform: "translate(-50%, -50%)", // Center each box correctly
        }}
      >
        <Button
          color="primary"
          size="large"
          variant="contained"
          className={classes.button}
          disabled={true}
          style={{
              backgroundColor: '#FF746C'
          }}
        >
          Launcher
        </Button>
      </div>
    );
  };

  const PositionLayout = () => {
    return (
      <div
        style={{ position: "relative", width: "100vw", height: "100vh", transform: "translate(0%, -12%)" }}
      >
        {Array.from({ length: (positions + 1) }).map((_, index) => {
          const angle = (1 * Math.PI) / 2 + ((index + 1) / (positions + 1)) * 2 * Math.PI;
          const x = center.x + radius * Math.cos(angle);
          const y = center.y + radius * Math.sin(angle);

          return <PositionButton key={index} x={x} y={y} number={index + 1} />;
        })}

        <LauncherPosition x={center.x} y={center.y + radius} />
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <Box color="secondary" className={classes.homeBody}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <Box color="secondary" className={classes.homeBody}>
          <Typography variant="h1" className={classes.titleText}>
            Beer Launcher
          </Typography>
          <Typography variant="h2" className={classes.subtitleText}>
              Select a position below to launch beer!
          </Typography>
          <Box>
            <PositionLayout/>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Home;