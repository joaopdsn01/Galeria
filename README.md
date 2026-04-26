# Galeria

Um aplicativo mobile de galeria de fotos e vídeos, desenvolvido com React Native e Expo.

## ✨ Funcionalidades

- Visualização de fotos e vídeos do dispositivo em grade
- ▶Player de vídeo com controles de play/pause e salto de 10 segundos
- Scroll infinito com carregamento paginado
- Pull-to-refresh para atualizar a galeria
- Tela de permissão integrada (com suporte a acesso parcial no iOS)
- Interface totalmente em tema escuro

## Tecnologias

- [React Native](https://reactnative.dev/) `0.83`
- [Expo](https://expo.dev/) `~55`
- [Expo Router](https://expo.github.io/router/) — navegação baseada em arquivos
- [expo-media-library](https://docs.expo.dev/versions/latest/sdk/media-library/) — acesso à galeria do dispositivo
- [expo-video](https://docs.expo.dev/versions/latest/sdk/video/) — reprodução de vídeos
- [TypeScript](https://www.typescriptlang.org/)

## 📁 Estrutura do projeto

```
galeria/
├── app/
│   ├── _layout.tsx        # Layout raiz (Stack navigator)
│   ├── index.tsx          # Tela principal (grade de mídia)
│   └── viewer/
│       └── [id].tsx       # Tela de visualização de foto/vídeo
├── src/
│   ├── components/
│   │   ├── MediaGrid/     # Grade paginada de fotos e vídeos
│   │   ├── PermissionGate/# Controle de permissão de acesso
│   │   └── VideoPlayer/   # Player de vídeo com controles
│   └── hooks/
│       ├── useMediaLibrary.ts  # Busca e paginação de assets
│       └── usePermissions.ts   # Gerenciamento de permissões
└── assets/                # Ícones e splash screen
```

## Como rodar

**Pré-requisitos:** Node.js, Expo CLI e Android SDK (ou Expo Go no celular)

```bash
# Instalar dependências
npm install

# Rodar no emulador Android
npx expo run:android

# Rodar no Expo Go (funcionalidades nativas limitadas)
npx expo start
```

## Build APK

```bash
# Build na nuvem via EAS
eas build --platform android --profile preview
```

---

