// // // components/ColheitaModal.tsx
// import { View, Text, Modal, StyleSheet } from "react-native";
// import Input from "@/presentation/components/ui/Input";
// import Button from "@/presentation/components/ui/Button";
// import { useState } from "react";

// interface ColheitaModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSave: (data: ColheitaData) => void;
// }

// export interface ColheitaData {
//   perdas: number;
//   quantidadeColhida: number;
//   precoVenda: number;
// }

// export default function ColheitaModal({ visible, onClose, onSave }: ColheitaModalProps) {
//   const [perdas, setPerdas] = useState("");
//   const [quantidadeColhida, setQuantidadeColhida] = useState("");
//   const [precoVenda, setPrecoVenda] = useState("");

//   const handleSave = () => {
//     onSave({
//       perdas: Number(perdas),
//       quantidadeColhida: Number(quantidadeColhida),
//       precoVenda: Number(precoVenda),
//     });
//     onClose();
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Registro de Colheita</Text>
          
//           <Input
//             label="Perdas"
//             type="number"
//             value={perdas}
//             onValueChanged={setPerdas}
//           />
          
//           <Input
//             label="Quantidade Colhida"
//             type="number"
//             value={quantidadeColhida}
//             onValueChanged={setQuantidadeColhida}
//           />
          
//           <Input
//             label="Preço de Venda"
//             type="number"
//             value={precoVenda}
//             onValueChanged={setPrecoVenda}
//           />
          
//           <View style={styles.buttonContainer}>
//             <Button
//               text="Cancelar"
//               color="red"
//               onPress={onClose}
//               style={styles.button}
//             />
//             <Button
//               text="Salvar"
//               onPress={handleSave}
//               style={styles.button}
//             />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '90%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
// });