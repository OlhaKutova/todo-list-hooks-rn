import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Item = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.onDelete(props.id)}>
        <Text style={styles.deleteBtn}>DELETE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  deleteBtn: {
    color: 'darkred',
    fontWeight: 'bold',
  },
});

export default Item;
