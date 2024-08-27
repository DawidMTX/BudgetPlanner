import AsyncStorage from "@react-native-async-storage/async-storage";


const removeValue = async (kindOfOperation: string) => {
    try {
        await AsyncStorage.removeItem(kindOfOperation);
    } catch (e) {
       console.log("Error: ",)
    }

    console.log("Done.");
};

export default removeValue;