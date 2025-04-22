import { Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { formStyles } from "../style"
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function login(){ 

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    async function loginChecker(){
           try{
                const res = await fetch('http://192.168.1.230:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email , password }),
                
            })
            if (res.ok){
                const data = await res.json();
                //store the token using AsyncStorage
                await AsyncStorage.setItem('token',data.token);
                return true;
            }
            else{
                Alert.alert(
                    "Login failed",
                    "Invalid Email or Password",
                    [{text: "Ok"}]
                );
                return false;
            }

           }
           catch(error){
            Alert.alert("Problem connecting to server",
                "Please try again" ,
                [{text: 'Ok'}])

            console.error(error.message);

           }
    };

    const formHandler = async ()=>{
//        console.log("Button pressed");
        if (email && password){
            const success = await loginChecker();
            if (success) router.push("/mainScreen")
        }
        else{
            console.error("Fill in email and password");
        }
     };
    

    return (
        <View style={formStyles.container}>
        <Text style={formStyles.header}> Please Sign-In to Lock in</Text>
        <TextInput 
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            style= {formStyles.input}
            />
        <TextInput
            value={password}
            onChangeText={setPass}
            placeholder="Password"
            secureTextEntry= {true}
            style= {formStyles.input}
            />
        <Pressable 
            onPress={formHandler}
            style = {formStyles.button}
            >
            <Text>Login</Text>
        </Pressable>
        
        
        </View>
    );
}

