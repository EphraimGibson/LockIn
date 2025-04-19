
import {  StyleSheet } from "react-native";

const addTaskstyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      fontSize: 16,
    },
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    button: {
      flex: 1,
      padding: 15,
      borderRadius: 8,
      marginHorizontal: 8,
    },
    cancelButton: {
      backgroundColor: "#ff4444",
    },
    createButton: {
      backgroundColor: "#03A9F4",
    },
    buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
    },
  });


  const Gueststyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    taskCard: {
      padding: 15,
      marginVertical: 10,
      backgroundColor: "lightblue",
      borderRadius: 8,
    },
    taskTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    fab: {
      position: "absolute",
      bottom: 20,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#03A9F4",
      alignItems: "center",
      justifyContent: "center",
    },
    fabText: {
      fontSize: 30,
      color: "white",
    },
  });


const Indexstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#654321',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 50,
  },
  buttonText:{
    color: 'black',
    fontWeight: 'light',
    fontSize: 15,
  }
});


const formStyles = StyleSheet.create(
  {
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },  
    container: {
      flex: 1,
      justifyContent: 'center', // Center components vertically
      alignItems: 'center', // Center components horizontally
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      fontSize: 16,
      
    },

    button: {
      padding: 15,
      marginTop: 20,
      backgroundColor: '#03A9F4', // Make the button visible
      borderRadius: 8,
      alignItems: 'center', 
    },
  }
)

export { addTaskstyles, Gueststyles, Indexstyles, formStyles };