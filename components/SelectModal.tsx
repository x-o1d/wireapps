import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableHighlight } from "react-native";

const SelectModal = forwardRef(function SelectModal( props: {
  selectionString: string,
}, ref) {
  const [showModal, setShowModal] = useState(false);
  const [ selectOptions, setSelectOptions ] = useState<string[]>([])
  const [ selected, setSelected ] = useState(0);
  const changeFunction = useRef<Function>(() => {});
  
  useImperativeHandle(ref, () => {
    return {
      show(selectOptions: string[], selected: number, onChange: Function) {
        setSelectOptions(selectOptions);
        setSelected(selected);
        changeFunction.current = onChange;
        setShowModal(true);
      },
    };
  }, []);

  const onSelect = (index: number) => {
    setSelected(index);
    changeFunction.current(index);
  }

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {

        }}>
          <View style={styles.modal}>
            <View style={styles.centered}>
              <Text>Select {props.selectionString}</Text>
              {selectOptions.map((option, index) => {
                return (
                  <TouchableHighlight 
                    key={index}
                    style={styles.selectArea}
                    onPress={() => onSelect(index)}>
                    <View style={[styles.selectButton, index === selected ? styles.selectActive: null]}>
                      <Text>{option}</Text>
                    </View>
                  </TouchableHighlight>
                )
              })}
              <TouchableHighlight onPress={() => setShowModal(false)}>
                <View>
                  <Text>Close</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
      </Modal>
  )
});

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#35b8b1',
    padding: 10
  },
  selectArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    margin: 10,
  },
  selectButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  selectActive: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
  }
})
export default SelectModal;