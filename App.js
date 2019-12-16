import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import uuidv4 from 'uuid/v4';
import Item from './components/Item';
import ItemInput from './components/ItemInput';

export default function App() {
  const [items, setItems] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = JSON.parse(await AsyncStorage.getItem('@items')) || [];
        setItems(data);
      } catch (e) {
        console.warn('getting data error');
      }
    };
    getItems().catch();
  }, []);

  useEffect(() => {
    const saveItems = async items => {
      try {
        await AsyncStorage.setItem('@items', JSON.stringify(items));
      } catch (e) {
        console.warn('saving error');
      }
    };
    saveItems(items).catch();
  }, [items]);

  const addItemHandler = itemTitle => {
    if (itemTitle.trim()) {
      setItems(currentItems => [
        ...currentItems,
        {
          id: uuidv4(),
          value: itemTitle,
        },
      ]);
      setIsOpenModal(false);
    } else {
      alert('enter text please');
    }
  };

  const removeItemHandler = itemId => {
    setItems(currentItems => {
      return currentItems.filter(item => item.id !== itemId);
    });
  };

  const cancelItemAdditionHandler = () => {
    setIsOpenModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Button title="Add New Item" onPress={() => setIsOpenModal(true)} />
        <ItemInput
          onAddItem={addItemHandler}
          onCancel={cancelItemAdditionHandler}
          visible={isOpenModal}
        />
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <Item
              title={itemData.item.value}
              id={itemData.item.id}
              onDelete={removeItemHandler}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    padding: 20,
  },
});
