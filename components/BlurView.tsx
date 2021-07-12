import React from "react";
import { ViewProps } from "react-native";
import { View } from "./View";
import { BlurView as NativeBlurView } from "expo-blur";

export const BlurView: React.FC<ViewProps> = ({ children, style }) => {
  return (
    <View style={[{ overflow: "hidden" }, style]}>
      <NativeBlurView style={{ height: "100%" }} intensity={85} tint="light">
        <NativeBlurView style={{ height: "100%" }} intensity={85} tint="light">
          {children}
        </NativeBlurView>
      </NativeBlurView>
    </View>
  );
};
