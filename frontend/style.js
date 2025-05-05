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
    priorityContainer: {
      marginBottom: 16,
    },
    priorityLabel: {
      fontSize: 16,
      marginBottom: 8,
    },
    priorityButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priorityButton: {
      flex: 1,
      padding: 10,
      marginHorizontal: 4,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#03A9F4',
      backgroundColor: 'white',
    },
    priorityButtonSelected: {
      backgroundColor: '#03A9F4',
    },
    priorityButtonText: {
      textAlign: 'center',
      color: '#03A9F4',
    },
    priorityButtonTextSelected: {
      color: 'white',
    },
    dateContainer: {
      marginVertical: 10,
      width: '100%',
    },
    dateLabel: {
      fontSize: 16,
      marginBottom: 5,
      color: '#333',
    },
    dateInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    dateText: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: '100%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
    },
    modalButton: {
      padding: 10,
    },
    modalButtonText: {
      fontSize: 16,
      color: '#666',
    },
    dateTimePicker: {
      width: '100%',
      height: 200,
      backgroundColor: '#f5f5f5',
    },
    pickerContainer: {
      width: '100%',
      backgroundColor: '#f5f5f5',
      paddingHorizontal: 0,
      marginHorizontal: 0,
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
      backgroundColor: "lightblue",
      borderRadius: 8,
      height: 60,
      margin: 5,
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