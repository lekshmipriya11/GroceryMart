import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BLACK } from "../../utils/Colors";
import GreenText from "./GreenText";

const MainHeaders =(label, customStyle)=>{
    return(
        <View>
       <GreenText label={label} customStyle={customStyle}/>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: BLACK,
    alignSelf:'center',
    marginTop: 10,
  },
});
export default MainHeaders;