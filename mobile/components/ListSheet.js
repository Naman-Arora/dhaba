import React, { useRef } from "react";
import { Button } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const ListSheet = () => {
  const bottomSheetRef = useRef < BottomSheet > null;

  const handleClosePress = () => bottomSheetRef.current.close();

  return (
    <>
      <Button title="Close Sheet" onPress={handleClosePress} />
      <BottomSheet ref={bottomSheetRef} />
    </>
  );
};

export default ListSheet;
