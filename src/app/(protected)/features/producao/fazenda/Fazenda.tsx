import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Lista from "@/shared/utils/Lista";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { FazendaStackParamList } from "./FazendaStack";
import FazendaItem from "@/presentation/components/Fazenda/FazendaItem";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";

type ProdutosNavigationProp = NativeStackNavigationProp<
  FazendaStackParamList,
  "Fazenda"
>;

export function TelaDeProducao() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { fazenda, carregar, loading } = useFazenda();
  const { user } = useAuth();

  const userCanEdit =
    user?.setor === UsuarioSetorEnum.ADMIN ||
    user?.setor === UsuarioSetorEnum.PRODUCAO;

  return (
    <View className="flex-1 bg-white">
      <PageHeader
        pageName="Fazenda"
        showAdd={userCanEdit}
        onAdicionar={() => navigation.navigate("AdicionarFazenda")}
      ></PageHeader>
      <View className="px-6 pb-4">
        <InputSelect
          label="Tipo"
          labelTextBold={false}
          // options={MetaConsts.Tipos}
        />
      </View>
      <Lista
        data={fazenda}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FazendaItem fazenda={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        //  onEdit={(item: ProducaoModel) =>
        //   navigation.navigate("ProducaoDetalhes", { producao: item })
        // }
      />
    </View>
  );
}

export default function Fazenda() {
  return <TelaDeProducao />;
}
