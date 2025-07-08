import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import InputSelect from "@/presentation/components/ui/InputSelect";
import PageHeader from "@/presentation/components/ui/PageHeader";
import { UsuarioStackParamList } from "./UsuarioStack";
import UsuarioLista from "@/presentation/components/outros/usuario/UsuarioLista";
import { Usuario } from "@/domain/models/outros/Usuario";
import { useUsuario } from "@/presentation/contexts/outros/UsuarioContext";
import UsuarioConsts from "@/shared/constants/usuario.consts";

type UsuarioNavigationProp = NativeStackNavigationProp<
  UsuarioStackParamList,
  "Lista"
>;

export function Tela() {
  const navigation = useNavigation<UsuarioNavigationProp>();
  const { usuarios, loading, carregar } = useUsuario();

  return (
    <View className="flex-1 bg-white">
      <PageHeader
        pageName="Usuarios"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarUsuario")}
      ></PageHeader>

      <View className="px-6 pb-4">
        <InputSelect
          label="Setor"
          labelTextBold={false}
          options={UsuarioConsts.Setor}
        />
        {/* onValueChanged={setTipoFiltro} */}
        {/* value={tipoFiltro} */}

        {/* <InputDate
                    label="Data inicio:"
                    labelTextBold={false}
                    value={dataInicio}
                    showClearButton={true}
                    onValueChanged={setDataInicio}
                  />
                  <InputDate
                    label="Data fim:"
                    labelTextBold={false}
                    value={dataFim}
                    showClearButton={true}
                    onValueChanged={setDataFim}
                  />
                </View> */}
      </View>

      <UsuarioLista
        usuarios={usuarios}
        onEndReached={() => carregar()}
        onEdit={(item: Usuario) =>
          navigation.navigate("EditarUsuario", { usuario: item })
        }
        loadingMore={loading}
      />
    </View>
  );
}

export default function Usuarios() {
  return <Tela />;
}
