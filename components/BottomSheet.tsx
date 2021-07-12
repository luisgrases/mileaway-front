import ReanimatedBottomSheet from "reanimated-bottom-sheet";
import { View } from "./View";
import { BlurView } from "components/BlurView";
import { Flexbox } from "components/Flexbox";
import React from "react";

const BORDER_RADIUS = 15;

export const BottomSheet: React.FC<any> = ({
  children,
  renderContent,
  snapPoints,
  ...props
}) => {
  return (
    <ReanimatedBottomSheet
      snapPoints={snapPoints}
      renderContent={() => (
        <>
          <View
            style={{
              backgroundColor: "transparent",
              paddingTop: 5,
            }}
          >
            <View
              style={{
                shadowOffset: { width: 0, height: 2 },
                shadowColor: "#000",
                shadowOpacity: 0.2,
                elevation: 5,
                zIndex: 30,
                borderTopLeftRadius: BORDER_RADIUS,
                borderTopRightRadius: BORDER_RADIUS,
              }}
            >
              <BlurView
                style={{
                  borderTopLeftRadius: BORDER_RADIUS,
                  borderTopRightRadius: BORDER_RADIUS,
                }}
              >
                <Flexbox justify="center" style={{ marginTop: 14 }}>
                  <DraggableIcon />
                </Flexbox>
                {renderContent()}
              </BlurView>
            </View>
          </View>
        </>
      )}
      {...props}
    />
  );
};

const DraggableIcon = () => {
  return (
    <View
      style={{
        backgroundColor: "lightgray",
        width: 35,
        height: 5,
        borderRadius: 5,
      }}
    ></View>
  );
};
