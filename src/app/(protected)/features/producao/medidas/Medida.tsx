import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Lista from "@/shared/utils/Lista";
import { useMedida } from "@/presentation/contexts/MedidaContext";
import MedidaItem from "@/presentation/components/Medida/MedidaItem";
import { MedidaStackParamList } from "./MedidasStack";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { useAuth } from "@/presentation/contexts/AuthContext";

type MedidaNavigationProp = NativeStackNavigationProp<
  MedidaStackParamList,
  "Medida"
>;

export function TelaDeProducao() {
  const navigation = useNavigation<MedidaNavigationProp>();
  const { medida, carregar, loading } = useMedida();
  const { user } = useAuth();

  const userCanEdit =
    user?.setor === UsuarioSetorEnum.ADMIN ||
    user?.setor === UsuarioSetorEnum.PRODUCAO;

  return (
    <View className="flex-1 bg-white">
      <PageHeader
        pageName="Medida"
        showAdd={userCanEdit}
        onAdicionar={() => navigation.navigate("AdicionarMedida")}
      ></PageHeader>
      <View className="px-6 pb-4">
        <InputSelect label="Tipo" labelTextBold={false} />
      </View>
      <Lista
        data={medida}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MedidaItem medida={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        //  onEdit={(item: ProducaoModel) =>
        //   navigation.navigate("ProducaoDetalhes", { producao: item })
        // }
      />
    </View>
  );
}

export default function Medida() {
  return <TelaDeProducao />;
}
