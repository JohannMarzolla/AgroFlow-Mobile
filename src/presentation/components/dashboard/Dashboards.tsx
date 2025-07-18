import { ScrollView, View } from "react-native";
import PageHeader from "@/presentation/components/ui/PageHeader";
import DashboardLucroPorFazenda from "@/presentation/components/dashboard/DashboardLucroPorFazenda";
import DashboardProducaoPorStatus from "@/presentation/components/dashboard/DashboardProducaoPorStatus";
import DashboardProduzidoXPerdas from "@/presentation/components/dashboard/DashboardProduzidoXPerdas";
import DashboardLucroPorProduto from "@/presentation/components/dashboard/DashboardLucroPorProduto";
import DashboardLucroPorMes from "./DashboardLucroPorMes";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";

export default function Dashboards() {
  const { user } = useAuth();

  return (
    <ScrollView className="flex-1 h-full">
      <PageHeader pageName="Dashboards"></PageHeader>

      <View className="px-5 pt-3 pb-20 gap-5">
        {user?.setor !== UsuarioSetorEnum.COMERCIAL && (
          <>
            <DashboardProduzidoXPerdas />
            <DashboardProducaoPorStatus />
          </>
        )}
        {user?.setor !== UsuarioSetorEnum.PRODUCAO && (
          <DashboardLucroPorProduto />
        )}
        {/* <DashboardLucroPorMes /> */}
        {/* <DashboardLucroPorFazenda /> */}
      </View>
    </ScrollView>
  );
}
