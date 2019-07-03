import React from "react";
import { AppBar, Toolbar, IconButton, Container } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

const SubPage = (props: RouteComponentProps) => {
  const back = () => {
    if (props.history.length <= 2) {
      props.history.replace("/");
    } else {
      props.history.goBack();
    }
  };
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton onClick={back}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>SubPage</Container>
    </div>
  );
};

export default SubPage;
