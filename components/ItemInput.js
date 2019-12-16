import React, {useState} from 'react';
import {Modal, View, StyleSheet, TextInput, Button} from 'react-native';

const ItemInput = props => {
  const [enteredItem, setEnteredItem] = useState('');

  const itemInputHandler = enteredText => {
    setEnteredItem(enteredText);
  };

  const addItemHandler = () => {
    props.onAddItem(enteredItem);
    setEnteredItem('');
  };

  const cancelItemAdditionHandler = () => {
    props.onCancel();
    setEnteredItem('');
  };
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="enter text"
          style={styles.input}
          value={enteredItem}
          onChangeText={itemInputHandler}
        />
        <View style={styles.btnContainer}>
          <View style={styles.btn}>
            <Button
              title="CANCEL"
              onPress={cancelItemAdditionHandler}
              color="red"
            />
          </View>
          <View style={styles.btn}>
            <Button title="ADD" onPress={addItemHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  btnContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 7,
  },
  btn: {
    width: '40%',
  },
});

export default ItemInput;
