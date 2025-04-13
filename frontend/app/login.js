import { Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { loginStyles } from "../style"
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function login(){ 

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    async function loginChecker(){
           try{
                const res = await fetch('http://192.168.1.230:3000/login', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email , password }),
                
            })
            if (res.ok){
                const data = await res.json();
                console.log("Login Successful:", data);
                return true;
            
            }
            else{
                console.error("Login failed: ", res.status);
                return false;
            }

           }
           catch(error){
            console.error("Issues");
           }
    };

    const formHandler = async ()=>{
        console.log("Button pressed");
        if (email && password){
            const success = await loginChecker();
            if (success){
                router.push("/guest")
            }
            else {
                Alert.alert(
                    "Login failed",
                    "Invalid Email or Password",
                    [{text: "Ok"}]
                );
            }

        }else{
            console.error("Fill in email and password");
        }
     };
    

    return (
        <View style={loginStyles.container}>
        <Text style={loginStyles.header}> Please Sign-In to Lock in</Text>
        <TextInput 
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            style= {loginStyles.input}
            />
        <TextInput
            value={password}
            onChangeText={setPass}
            placeholder="Password"
            secureTextEntry= {true}
            style= {loginStyles.input}
            />
        <Pressable 
            onPress={formHandler}
            style = {loginStyles.button}
            >
            <Text>Login</Text>
        </Pressable>
        
        
        </View>
    );
}

