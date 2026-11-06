# Minha Prefeitura

Aplicativo mobile da prefeitura, desenvolvido em **React Native com Expo**. Ele reúne notícias oficiais, agenda de eventos, enquetes públicas, mapa de unidades de atendimento e acesso rápido aos serviços municipais.

## Funcionalidades

| Tela | O que faz |
| --- | --- |
| **Início** | Header com busca, aviso de utilidade pública, atalhos (Enquetes, Eventos, Mapa) e últimas notícias. A busca filtra atalhos e notícias, sem diferenciar acentos. |
| **Serviços** | Lista de serviços (Enquetes, Eventos, Mapa, Ouvidoria). Os que já têm tela abrem a navegação; os demais exibem "em breve". |
| **Notícias** | Lista completa de notícias → **Detalhe da notícia**. |
| **Perfil** | Dados do cidadão (mock) e menu da conta. |
| **Eventos** | Tela base (apenas header), a ser implementada pelo responsável do módulo. |
| **Enquetes** | Tela base (apenas header), a ser implementada pelo responsável do módulo. |
| **Mapa** | Mapa com marcadores das unidades municipais (`react-native-maps`). Na web, exibe um aviso. |

> Todos os dados são **mockados** (`src/data/`). Ainda não há integração com API.

## Tecnologias

- [Expo SDK 54](https://docs.expo.dev/) · React Native 0.81 · React 19
- [React Navigation 7](https://reactnavigation.org/): `bottom-tabs` e `native-stack`
- [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- react-native-safe-area-context · react-native-screens
- @expo/vector-icons

## Pré-requisitos

- **Node.js** 20 LTS ou superior e **npm**
- **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)), **ou**
- **Android Studio** (emulador Android) / **Xcode** (simulador iOS, apenas macOS)

## Como instalar e rodar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npx expo start
```

Com o servidor rodando:

- **Celular**: escaneie o QR Code com o Expo Go (Android) ou com a câmera (iOS).
- **Android**: pressione `a` ou rode `npm run android` (emulador aberto).
- **iOS**: pressione `i` ou rode `npm run ios` (macOS + Xcode).
- **Web**: pressione `w` ou rode `npm run web` (o mapa não é suportado na web).

> **Windows / PowerShell:** se o `npx` for bloqueado por política de execução, rode antes:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
> ```

Ao adicionar novas bibliotecas nativas, prefira `npx expo install <pacote>`, que escolhe a versão compatível com o SDK do projeto.

## Estrutura de pastas

```
.
├── App.js                  # Providers (SafeArea) + NavigationContainer
├── index.js                # Registro do componente raiz (Expo)
├── app.json                # Configuração do Expo
├── assets/                 # Ícones e splash
└── src/
    ├── navigation/
    │   ├── routes.js           # Nomes das rotas (constantes)
    │   ├── RootNavigator.js    # Stack raiz: abas + telas empilhadas
    │   └── MainTabs.js         # Bottom Tabs: Início, Serviços, Notícias, Perfil
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── ServicesScreen.js
    │   ├── NewsScreen.js
    │   ├── NewsDetailScreen.js
    │   ├── EventsScreen.js
    │   ├── PollScreen.js
    │   ├── MapScreen.js
    │   └── ProfileScreen.js
    ├── components/          # Componentes reutilizáveis (ver tabela abaixo)
    ├── data/                # Dados mockados
    │   ├── alerts.js · news.js · services.js
    │   └── mapPoints.js · user.js
    ├── theme/               # Design tokens
    │   ├── colors.js · spacing.js (espaçamentos, raios, sombras) · typography.js
    │   └── index.js
    └── utils/
        ├── text.js          # normalizeText / matchesQuery (busca sem acentos)
        └── categories.js    # cores da tag por categoria
```

### Componentes

| Componente | Responsabilidade |
| --- | --- |
| `ScreenContainer` | Base das telas: área segura superior, fundo e rolagem opcional. |
| `AppHeader` | Header azul da Home (logo, título, notificações) com slot para a busca. |
| `ScreenHeader` | Header azul das demais telas, com título, subtítulo e botão voltar opcional. |
| `SearchBar` | Campo de busca controlado. |
| `AlertCard` | Card de aviso/comunicado oficial. |
| `Section` / `SectionHeader` | Espaçamento de seção e título com ação ("Ver todos"). |
| `UtilityItem` | Atalho quadrado da grade de serviços. |
| `NewsCard` | Card de notícia (imagem, tag, título, tempo). |
| `ListItem` | Linha de lista com ícone e seta (Serviços, Perfil). |
| `Tag` | Rótulo de categoria colorido. |
| `Icon` | Renderiza ícones de várias famílias a partir de `{ family, name }` (usado nos dados). |
| `EmptyState` | Mensagem para listas vazias / não encontrado. |
| `CityMap` / `CityMap.web` | Mapa nativo com marcadores / fallback para web. |

## Fluxo de navegação

```
NavigationContainer
└── RootNavigator (Native Stack, header oculto)
    ├── MainTabs (Bottom Tabs)
    │   ├── Início ──────┬─► Enquetes
    │   │                ├─► Eventos
    │   │                ├─► Mapa
    │   │                ├─► Detalhe da notícia
    │   │                ├─ "Ver todos" → aba Serviços
    │   │                └─ "Ver mais"  → aba Notícias
    │   ├── Serviços ────► Enquetes / Eventos / Mapa
    │   ├── Notícias ────► Detalhe da notícia
    │   └── Perfil
    ├── NewsDetail   (params: { newsId })
    ├── Events
    ├── Poll
    └── Map
```

As telas empilhadas ficam **acima** das abas, então a barra inferior some nelas e o botão voltar do `ScreenHeader` (ou o gesto/botão nativo) retorna à tela anterior. Os nomes de rota estão em `src/navigation/routes.js`.

## Próximos passos

- Integrar com a API da prefeitura (substituir `src/data/` por serviços/hooks de busca de dados, com loading e erro).
- Autenticação do cidadão e persistência de perfil.
- Implementar as telas de Enquetes e Eventos (hoje só com o header).
- Notificações push (`expo-notifications`) ligadas ao botão do header.
- Ajustar as coordenadas do mapa para o município real e usar a localização do usuário.
- Implementar a Ouvidoria (hoje exibe "em breve").
- Migrar para TypeScript e adicionar ESLint/Prettier e testes (Jest + React Native Testing Library).
- Acessibilidade: revisar contraste, rótulos e tamanhos de fonte dinâmicos.
