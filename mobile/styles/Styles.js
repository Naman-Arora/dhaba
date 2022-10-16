import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonStyles: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
    borderRadius: 100,
    width: 200,
    shadowOpacity: 100,
    shadowRadius: 2.5,
    shadowOffset: { width: 0, height: 0 },
  },

  welcomeButtonStyles: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 22.5,
    width: 335,
    borderRadius: 100,
    shadowOpacity: 10,
    shadowRadius: 2.5,
    shadowOffset: { width: 0, height: 0 },
  },

  changeViewButtonStyles: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    alignSelf: "bottom",
    justifyContent: "center",
    backgroundColor: "black",
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
    borderRadius: 100,
    width: 2,
    height: 2,
    shadowOpacity: 100,
    shadowRadius: 2.5,
    shadowOffset: { width: 0, height: 0 },
  },

  buttonTextStyles: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },

  welcomeButtonTextStyles: {
    fontSize: 25,
    fontWeight: "600",
    color: "white",
  },

  welcomeStyles: {
    textAlign: "center",
    fontSize: 35,
    marginVertical: 10,
    fontWeight: "bold",
  },

  textStyles: {
    textAlign: "center",
    fontSize: 25,
    marginVertical: 10,
  },

  descriptionStyles: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 20,
  },

  headerStyles: {
    marginTop: 50,
    alignSelf: "center",
    fontSize: 25,
    marginVertical: 10,
    fontWeight: "bold",
  },

  topViewStyles: {
    marginBottom: 40,
  },

  textInputStyles: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 25,
    borderRadius: 10,
    height: 50,
  },

  ownerLoginPageLine: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 17.5,
    marginVertical: 30,
    borderWidth: 1.5,
  },

  imageContainer: {
    paddingTop: 25,
  },

  imageStyles: {
    width: 240,
    height: 240,
    resizeMode: "stretch",
    alignSelf: "center",
  },

  mapImageStyles: {
    width: 90,
    height: 90,
    alignSelf: "center",
  },

  mapBoxStyles: {
    borderRadius: 25,
    backgroundColor: "white",
    resizeMode: "stretch",
    alignSelf: "center",
    position: "absolute",
    top: 50,
    width: 90,
    height: 90,
    shadowOpacity: 100,
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 0 },
  },

  changeViewStyles: {
    flex: true,
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    margin: 20,
    flexDirection: "row",
    top: 700,
    justifyContent: "space-between",
  },

  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  panelHeader: {
    alignItems: "center",
  },

  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },

  menuStyles: {
    whiteSpace: 'nowrap',
    marginHorizontal: 30,
    marginVertical: 15,
  },

  menuHeaderStyles: {
    marginTop: 50,
    alignSelf: "center",
    fontSize: 35,
    marginVertical: 15,
    fontWeight: "bold",
  },
});

export default styles;
