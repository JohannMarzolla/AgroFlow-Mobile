import React from "react";
import { View, Text, FlatList } from "react-native";
import { useNotificationContext } from "@/presentation/contexts/outros/NotificacaoContext";

export default function Notifications() {
  const { notifications } = useNotificationContext();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
        Notificações
      </Text>

      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
