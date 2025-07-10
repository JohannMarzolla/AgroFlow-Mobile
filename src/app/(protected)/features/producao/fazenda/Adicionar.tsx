import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import FazendaForm from "@/presentation/components/Fazenda/FazendaForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";


export default function AdicionarFazenda() {
   const navigation = useNavigation();
   
  return (
    <PageAdicionarLayout pageName="Adicionar Fazenda">
      <FazendaForm onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
