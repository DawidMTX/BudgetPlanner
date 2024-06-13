import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: any, keyName: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(keyName, jsonValue);
      console.log("wyslano")
    } catch (e) {
      // saving error
    }
  };


  export const getData = async (keyName: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(keyName);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
     console.log(e)
    }
  };

  export default storeData