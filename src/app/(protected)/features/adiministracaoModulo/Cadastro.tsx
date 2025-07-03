import { View, Image, Text, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  CadastroUsuarioFormErrors,
  CadastroUsuarioForm,
} from "@/presentation/models/CadastroUsuarioForm";
import InputCheckbox from "@/presentation/components/ui/InputCheckbox";
import Input from "@/presentation/components/ui/Input";
import Button from "@/presentation/components/ui/Button";
import { AuthService } from "@/application/services/outros/AuthService";
import { ShowToast } from "@/presentation/components/ui/Toast";
import { Loading } from "@/presentation/components/ui/Loading";
import { UsuarioService } from "@/application/services/outros/UsuarioService";

export default function Cadastro() {
  const [values, setValues] = useState<CadastroUsuarioForm>(
    new CadastroUsuarioForm()
  );
  const [errors, setErrors] = useState<CadastroUsuarioFormErrors>({});
  const [saveRunning, setSaveRunning] = useState(false);

  function handleOnChange(field: string, value: any) {
    setValues(new CadastroUsuarioForm({ ...values, [field]: value }));
  }

  const onConfirm = async () => {
    if (!saveRunning) {
      Loading.show();
      setSaveRunning(true);

      const { isValid, errors } = values.validate();
      setErrors(errors);

      if (isValid) {
        await cadastrar(values.email, values.password);
      }

      setSaveRunning(false);
      Loading.hide();
    }
  };

  const cadastrar = async (email: string, password: string) => {
    try {
      await UsuarioService.cadastrar(email, password);
      ShowToast("success", "Usuário cadastrado com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        ShowToast("error", error.message || "Erro ao cadastrar usuario.");
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-agroflow-white">
      <View className="w-full p-8">
        <Input
          className="pb-5"
          type="email"
          label="Email"
          value={values.email}
          error={errors.email}
          onValueChanged={(value) => handleOnChange("email", value)}
        />

        <Input
          className="pb-5"
          type="password"
          label="Senha"
          value={values.password}
          error={errors.password}
          onValueChanged={(value) => handleOnChange("password", value)}
        />

        <Button text="Criar conta" onPress={onConfirm} />
      </View>
    </ScrollView>
  );
}
