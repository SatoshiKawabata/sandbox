import React from "react";
import { Tab, Tabs } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { RouteComponentProps } from "react-router-dom";

const FooterTabs = (props: RouteComponentProps) => {
  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    props.history.push(newValue);
  }
  return (
    <Tabs
      value={props.location.pathname}
      onChange={handleChange}
      variant="fullWidth"
      indicatorColor="secondary"
      textColor="secondary"
    >
      <Tab icon={<PhoneIcon />} label="RECENTS" value="/" />
      <Tab icon={<FavoriteIcon />} label="FAVORITES" value="/page1" />
      <Tab icon={<PersonPinIcon />} label="NEARBY" value="/page2" />
    </Tabs>
  );
};

export default FooterTabs;
