import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/appError';
import { groupsGetAll } from './groupsGetAll';

export async function groupCreate(newGroup: string) {
  try {

    const storeGroups =  await groupsGetAll()

    const groupAlreadyExists = storeGroups.includes(newGroup)

    if(!groupAlreadyExists){
      const toStorage = JSON.stringify([...storeGroups, newGroup ])

      await AsyncStorage.setItem(GROUP_COLLECTION, toStorage)
    }else{
      throw new AppError('Já existe um grupo cadastrado com esse nome.')
    }


  } catch (error) {
    throw error

  }
}