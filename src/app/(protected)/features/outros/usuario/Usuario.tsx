import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import InputSelect from "@/presentation/components/ui/InputSelect";
import PageHeader from "@/presentation/components/ui/PageHeader";
import { UsuarioStackParamList } from "./UsuarioStack";
import { Usuario } from "@/domain/models/outros/Usuario";
import { useUsuario } from "@/presentation/contexts/outros/UsuarioContext";
import UsuarioConsts from "@/shared/constants/usuario.consts";
import PaginatedList from "@/presentation/components/ui/PaginatedList";
import { UsuarioItem } from "@/presentation/components/outros/usuario/UsuarioItem";

type UsuarioNavigationProp = NativeStackNavigationProp<
  UsuarioStackParamList,
  "Lista"
>;

export function Tela() {
  const navigation = useNavigation<UsuarioNavigationProp>();
  const { usuarios, loading, carregar } = useUsuario();

  return (
    <View className="flex-1">
      <PageHeader
        pageName="Usuários"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarUsuario")}
      ></PageHeader>

      <View className="px-6 pb-4">
        <InputSelect
          label="Setor"
          labelTextBold={false}
          options={UsuarioConsts.Setor}
        />
      </View>

      <PaginatedList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UsuarioItem usuario={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: Usuario) =>
          navigation.navigate("EditarUsuario", { usuario: item })
        }
      />
    </View>
  );
}

export default function Usuarios() {
  return <Tela />;
}
