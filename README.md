# Minha Prefeitura

Aplicativo mobile da prefeitura, desenvolvido em **React Native com Expo**. Ele reúne notícias oficiais, agenda de eventos, enquetes públicas, mapa de unidades de atendimento e acesso rápido aos serviços municipais.

<!-- 
## Funcionalidades

| Tela | Objetivo |
| --- | --- |
| **Início** | Header com busca, aviso de utilidade pública, atalhos (Enquetes, Eventos, Mapa) e últimas notícias (mock, depois API). A busca filtra atalhos e notícias, sem diferenciar acentos. |
| **Serviços** | Lista de serviços (Enquetes, Eventos, Mapa). Os que já têm tela abrem a navegação; os demais exibem "em breve". |
| **Notícias** | Lista completa de notícias → **Detalhe da notícia**. |
| **Perfil** | Dados do cidadão (mock) e menu da conta. |
| **Eventos** | Tela base (apenas header), a ser implementada. |
| **Enquetes** | Tela base (apenas header), a ser implementada. |
| **Mapa** | Tela base (apenas header), a ser implementada. |
 -->


## Como instalar e rodar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npx expo start
```

> **Windows / PowerShell:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

## Próximos passos

- Integrar com a API da prefeitura (substituir `src/data/` por API do professor).
- Implementar as telas de Enquetes, Eventos e Mapa.

- Mapa
    - Adicionar mapa que funciona para web e android/ios
    - Ajustar as coordenadas do mapa para o município real (vila velha?) e usar a localização do usuário (bairro).
    - Adicionar opção de 'procurar' estabelecimento mais próximo (ex: farmácia, mercado, academia, etc).

https://prod.liveshare.vsengsaas.visualstudio.com/join?3723EBAAF5C2EBF5171FCD8392FFB849B385
