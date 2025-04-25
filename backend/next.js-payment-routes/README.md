
# Next.js API Routes para Integração de Pagamento

Este código fornece implementação de rotas API em Next.js para integração com o gateway de pagamento EMIS. Substitui completamente a versão PHP anterior.

## Arquivos Principais

1. `pages/api/pagar.js` - API que recebe os dados de pagamento, gera um token de compra e redireciona para o frame de pagamento.
2. `pages/api/gpo-callback.js` - Endpoint que recebe callbacks do gateway após processamento do pagamento.
3. `pages/api/gpo-frame.js` - Renderiza o iframe da página de pagamento usando o token gerado.
4. `utils/payment-utils.js` - Contém funções auxiliares para interação com a API do gateway.

## Instruções para Deployment no Vercel

### 1. Estrutura de Arquivos

Certifique-se que os seguintes arquivos estão na pasta correta no seu projeto Next.js:

```
└── pages/
    └── api/
        ├── pagar.js
        ├── gpo-callback.js
        └── gpo-frame.js
└── utils/
    └── payment-utils.js
```

### 2. Deploy na Vercel

1. Faça login no [dashboard da Vercel](https://vercel.com)
2. Importe seu projeto do repositório Git
3. Na configuração do projeto, defina as variáveis de ambiente:
   - `GPO_FRAME_TOKEN` - (Opcional, está hardcoded no arquivo de utilidades)
   - `GPO_API_URL` - (Opcional, está hardcoded no arquivo de utilidades)
   - `CALLBACK_URL` - URL completa do seu endpoint de callback

4. Clique em "Deploy" para iniciar o deployment

### 3. Verificação

Após o deployment, verifique se todas as rotas estão funcionando:

- `/api/pagar` - Deve aceitar requisições POST
- `/api/gpo-callback` - Deve estar acessível para o gateway
- `/api/gpo-frame` - Deve renderizar um iframe quando acessado com um token

## Integração com o Frontend React

O componente PaymentPage.tsx do frontend React já está configurado para enviar os dados para `/api/pagar`, que abrirá em uma nova aba.

## Solução de Problemas

Se a integração não estiver funcionando, verifique:

1. Logs da Vercel para erros de API
2. Se o token GPO_FRAME_TOKEN está correto
3. Se a URL de callback está corretamente configurada 
4. Se as requisições estão sendo enviadas corretamente do frontend

## Segurança

- Todo o processamento de pagamento ocorre no lado do servidor
- As credenciais não são expostas no frontend
- A comunicação com o gateway usa HTTPS
