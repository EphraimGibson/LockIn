import {Text, View, StyleSheet} from "react-native";

export default function Guest(){
    return (
        <View style={styles.container}>
            <Text>Hello Great Tasker!</Text>
            <Text> Click the + button to add a new task</Text>
        </View>
    )
}


const styles = StyleSheet.create({
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
  