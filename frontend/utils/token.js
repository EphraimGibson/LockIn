import AsyncStorage from  "@react-native-async-storage/async-storage";

export async function saveTokens(accessToken,refreshToken){
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken)

}

export async function getTokens(key){
    return await AsyncStorage.getItem(key);
}