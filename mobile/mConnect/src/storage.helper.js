import AsyncStorage from '@react-native-community/async-storage';

export const setValToStorage = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    console.error('Could not store the value ', e);
  }
};

export const getValfromStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error('Could not read the value ', e);
  }
};
