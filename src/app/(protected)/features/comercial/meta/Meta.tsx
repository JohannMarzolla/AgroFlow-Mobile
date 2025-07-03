import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MetaStackParamList } from "./MetaStack";
import { useMeta } from "@/presentation/contexts/comercial/MetaContext";
import InputSelect from "@/presentation/components/ui/InputSelect";
import MetaConsts from "@/shared/constants/meta.consts";
import MetaLista from "@/presentation/components/comercial/meta/MetaLista";
import PageHeader from "@/presentation/components/ui/PageHeader";
import { Meta } from "@/domain/models/comercial/Meta";

type MetaNavigationProp = NativeStackNavigationProp<
  MetaStackParamList,
  "Lista"
>;

export function Tela() {
  const navigation = useNavigation<MetaNavigationProp>();
  const { metas, loading, carregar } = useMeta();

  return (
    <View className="flex-1 bg-white">
      <PageHeader
        pageName="Metas"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarMeta")}
      ></PageHeader>

      <View className="px-6 pb-4">
        <InputSelect
          label="Tipo"
          labelTextBold={false}
          options={MetaConsts.Tipos}
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

      <MetaLista
        metas={metas}
        onEndReached={() => carregar()}
        onEdit={(item: Meta) =>
          navigation.navigate("EditarMeta", { meta: item })
        }
        loadingMore={loading}
      />
    </View>
  );
}

export default function Metas() {
  return <Tela />;
}
