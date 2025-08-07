import { H3 } from '@/components/HeadingsView';
import { color } from '@/styles/color';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ButtonView from './ButtonView';

export default function ModalView({ visible, onClose, onPress, title, content, btnContent }) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <H3 textColor={color.intermediate}>{title}</H3>
          <Text style={styles.content}>{content}</Text>
          
          <View style={{ width: '100%', alignItems: 'center' }}>
            <ButtonView onPress={onPress}>{btnContent}</ButtonView>
          </View>

          <Pressable onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)', // dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    alignItems: 'center',       // center horizontally
    justifyContent: 'center',   // center vertically
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  content: { color: color.gray, marginBottom: 20, textAlign: 'center' },
  closeText: { marginTop: 15, color: 'gray' },
})
