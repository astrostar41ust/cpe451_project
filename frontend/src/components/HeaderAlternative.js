import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import styles, { colors,sizes } from "../styles/style";
import { useState } from "react";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
export default function HeaderAlternative({
  isResetPasswordPage,
  activeScreen,
  updateActiveScreen,
}) {
  const headerText =
    activeScreen === "signin"
      ? "Let’s get you signed in !"
      : "Let’s get you registered !";

  return (
    <View style={[headerAlternative.container]}>
        <IconFontAwesome5
                name={"dumbbell"}
                size={60}
                color={colors.clr_white}
                style={[headerAlternative.dumbbell_top]}
              ></IconFontAwesome5>
              <IconFontAwesome5
                name={"dumbbell"}
                size={40}
                color={colors.clr_white}
                style={[headerAlternative.dumbbell_middle]}
              ></IconFontAwesome5>
              <IconFontAwesome5
                name={"dumbbell"}
                size={80}
                color={colors.clr_white}
                style={[headerAlternative.dumbbell_bottom]}
              ></IconFontAwesome5>
      <Text
        style={[
          styles.whiteText,
          isResetPasswordPage === true && headerAlternative.hide,
          { fontSize: sizes.size_2xl, fontWeight: "bold", paddingTop: 70 },
        ]}
      >
        {headerText}
      </Text>
      <Text
        style={[
          styles.whiteText,
          isResetPasswordPage === false && headerAlternative.hide,
          { fontSize: sizes.size_xl, fontWeight: "bold", paddingTop: 105 },
        ]}
      >
        Let’s reset your password!
      </Text>
      <View
        style={[
          headerAlternative.button__section,
          isResetPasswordPage === true && headerAlternative.hide,
        ]}
      >
        <TouchableOpacity
          style={[
            headerAlternative.button,
            { left: 26 },
            activeScreen === "signin" && headerAlternative.activeButton,
          ]}
          onPress={() => updateActiveScreen("signin")}
        >
          <Text
            style={[
              headerAlternative.buttonText,
              activeScreen === "signin" && headerAlternative.activeButtonText,
            ]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            headerAlternative.button,
            { right: 26 },
            activeScreen === "signup" && headerAlternative.activeButton,
          ]}
          onPress={() => updateActiveScreen("signup")}
        >
          <Text
            style={[
              headerAlternative.buttonText,
              activeScreen === "signup" && headerAlternative.activeButtonText,
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const headerAlternative = StyleSheet.create({
  container: {
    flexBasis: 200,
    marginHorizontal: 0,
    paddingHorizontal: 40,
    backgroundColor: colors.clr_slate,
    borderRadius: 20,
    marginTop: -20,
  },
  button__section: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },
  button: {
    borderRadius: 40,
    paddingVertical: 16,
    paddingHorizontal: 66,
    backgroundColor: colors.clr_white,
  },
  buttonText: {
    fontSize: sizes.size_base,
    fontWeight: "bold",
  },
  activeButton: {
    backgroundColor: colors.clr_orange,
    zIndex: 1,
  },
  activeButtonText: {
    color: colors.clr_white,
  },
  hide: {
    display: "none",
  },
  dumbbell_top: {
    position: "absolute",
    top: 15,
    right: 35,
    opacity: 0.1,
    zIndex: 0,
    transform: [{ rotate: "-55deg" }],
  },
  dumbbell_middle: {
    position: "absolute",
    top: 60,
    right: 120,
    opacity: 0.2,
    zIndex: 0,
    transform: [{ rotate: "45deg" }],
  },
  dumbbell_bottom: {
    position: "absolute",
    top: 130,
    right: 50,
    opacity: 0.3,
    zIndex: 0,
    transform: [{ rotate: "-50deg" }],
  },
});
