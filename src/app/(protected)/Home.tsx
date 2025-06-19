import { ScrollView } from "react-native";
import GraficosCard from "@/presentation/components/Graficos/GraficosCard";

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-agroflow-light-green p-6 h-full">
      <GraficosCard />
    </ScrollView>
  );
}
