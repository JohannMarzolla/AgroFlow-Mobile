# 📱 Projeto AgroFlow Mobile

Este é um projeto **mobile** construído com **React Native** e **TypeScript** sobre **Expo**, oferecendo:

---

## 📦 Tecnologias

- **React Native (via Expo)**
- **TypeScript**
- **Expo Router**
- **Tailwind CSS (via NativeWind)**
- **Socket.IO (cliente)**
- **Firebase Firestore**
- **React Navigation (Drawer + Stack)**
- **AsyncStorage** (armazenamento local)

---

## ⚙️ Variáveis de ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
EXPO_PUBLIC_API_URL=url-api --> ex: http://192.168.0.6:3000/api/
EXPO_PUBLIC_NOTIF_WS_URL=url-ws-notificacao --> ex: http://192.168.0.6:3000
```

---

## ⚙️ Configuração Firebase

Configurar Firebase Client para atualização em tempo real.

### 📌 Passo 1 – Criar o projeto no Firebase

Crie o projeto no Firebase conforme o readme do projeto da API
Link: https://github.com/FIAP-TechChallenger/fase5-api

Se já possuir, siga para o próximo passo.

---

### 📌 Passo 2 – Acesse o Console do Firebase

Acesse: [https://console.firebase.google.com](https://console.firebase.google.com)  
Faça login com sua conta Google.

---

### 📌 Passo 3 – Copiar configuração

1. Vá até `Configurações do Projeto > Geral`
2. Na seção `Seus aplicativos` selecione o app web.
3. Copie a criação da constante `firebaseConfig ` em `Configuração do SDK`
4. Cole a configuração no arquivo `src/shared/constants/firebase-config.ts`

---

## ⚙️ Instalação e Execução

1. **Instale as dependências** (no diretório raiz):

```bash
npm install
```

1. **Inicie o projeto no Expo:**

```bash
npm run start
```

---

## ✅ Requisitos

- Node.js 20+;
- Expo CLI (npm install -g expo-cli)
- Conta no Firebase com Firestore e Authentication ativados;
- [API](https://github.com/FIAP-TechChallenger/fase5-api)

---

## 📄 Licença

Este projeto está licenciado sob a MIT License.

---

## 👨‍💻 Autor

Desenvolvido por Lucas R. Janzen e Johann Marzolla.
