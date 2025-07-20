import React, { ReactNode, useState } from "react";
import {
  Modal as ReactModal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "../ui/Icon";

interface ModalProps {
  title: string;
  visible: boolean;
  children: ReactNode;
  onClose(): void;
}

export default function Modal({
  title,
  visible,
  children,
  onClose,
}: ModalProps) {
  return (
    <ReactModal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={() => onClose()}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/60 justify-center items-center p-4">
        <View className="bg-white w-full max-h-[85%] rounded-2xl overflow-hidden shadow-lg shadow-black/25">
          <View className="flex-row justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
            <Text className="text-xl font-bold ">{title}</Text>

            <TouchableOpacity onPress={onClose} className="p-1">
              <Icon className="p-1" name="close" size={24} color="#444" />
            </TouchableOpacity>
          </View>

          <View className="flex-grow h-full">{children}</View>
        </View>
      </View>
    </ReactModal>
  );
}
