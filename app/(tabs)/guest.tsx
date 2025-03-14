import {Text, View, StyleSheet, Pressable} from "react-native";
import { useRouter } from "expo-router";

export default function Guest(){
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text>Hello Great Tasker!</Text>
            <Text>Click the + button to add a new task</Text>
            
            <Pressable 
                style={styles.fab} 
                onPress={() => {
                    router.push("/addTask");
                }}
            >
                <Text style={styles.fabText}>+</Text>
            </Pressable>
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
    },
    fab: {
      position: 'absolute',
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      right: 20,
      bottom: 20,
      backgroundColor: '#03A9F4',
      borderRadius: 28,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    fabText: {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
    }
  });
  