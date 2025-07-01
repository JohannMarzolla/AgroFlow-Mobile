import { View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MetaForm from "@/presentation/components/comercial/meta/MetaForm";
import { Meta } from "@/domain/models/comercial/Meta";

export default function EditarMeta() {
  const route = useRoute();
  const { meta } = route.params as { meta: Meta };
  const navigation = useNavigation();

  return (
    <View className="flex-1 p-6 bg-white">
      <MetaForm meta={meta} onCancel={() => navigation.goBack()} />
    </View>
  );
}
