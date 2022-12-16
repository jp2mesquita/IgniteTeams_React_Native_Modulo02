import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupsGetAll';

export async function groupCreate(newGroup: string) {
  try {

    const storeGroups =  await groupsGetAll()

    const toStorage = JSON.stringify([...storeGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, toStorage)

  } catch (error) {
    throw error;
  }
}