import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FazendaStackParamList } from "./FazendaStack";
import PageHeader from "@/presentation/components/ui/PageHeader";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { FazendaLista } from "@/presentation/components/Fazenda/FazendaLista";

type ProdutosNavigationProp = NativeStackNavigationProp<
  FazendaStackParamList,
  "Lista"
>;

export function TelaDeProducao() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { user } = useAuth();

  const userCanEdit =
    user?.setor === UsuarioSetorEnum.ADMIN ||
    user?.setor === UsuarioSetorEnum.PRODUCAO;

  return (
    <View className="flex-1 ">
      <PageHeader
        pageName="Fazendas"
        showAdd={userCanEdit}
        onAdicionar={() => navigation.navigate("AdicionarFazenda")}
      ></PageHeader>

      <FazendaLista
        onPress={(fazenda) =>
          navigation.navigate("EditarFazenda", { fazenda: fazenda })
        }
      ></FazendaLista>
    </View>
  );
}

export default function Fazenda() {
  return <TelaDeProducao />;
}
