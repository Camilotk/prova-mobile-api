import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({ navigation, title, subtitle, icon }) => {
  return (
    <Appbar.Header style={{backgroundColor: "darkred", height: 80}}>
      <Appbar.Content title={title} subtitle={subtitle} style={{paddingTop: 10}}/>
      <Appbar.Action icon={icon} onPress={() => navigation()} />
    </Appbar.Header>
  );
};

export default Header;