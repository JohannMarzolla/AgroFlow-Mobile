import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { ReactNode } from "react";
import PageHeader from "./PageHeader";

type PageAdicionarLayoutProps = {
  pageName: string;
  children: ReactNode;
};

export default function PageAdicionarLayout({
  pageName,
  children,
}: PageAdicionarLayoutProps) {
  return (
    <View className="flex-1 bg-white">
      <PageHeader pageName={pageName} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled" className="p-6 pt-2">
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
