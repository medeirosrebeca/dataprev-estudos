# DATAPREV 2026 | Monitor de Estudos

Aplicação simples em HTML, CSS e JavaScript.

## O que já faz

- Dashboard com horas, questões, acertos e progresso
- Cronograma com status por assunto
- Registro de sessões de estudo
- Registro de questões e aproveitamento
- Identificação automática de assuntos abaixo de 70%
- Histórico
- Exportação CSV
- Modo local sem configuração
- Sincronização entre computadores com Supabase
- Publicação gratuita via GitHub Pages

## 1. Testar primeiro no computador

Abra `index.html` no navegador. Sem configurar o Supabase, o sistema funciona em modo local.

Atenção: no modo local, os dados ficam apenas naquele navegador.

## 2. Criar o banco no Supabase

1. Crie um projeto em https://supabase.com
2. Abra o SQL Editor
3. Cole todo o conteúdo de `setup.sql`
4. Execute
5. Vá às configurações/API do projeto e copie:
   - Project URL
   - chave pública anon/publishable
6. Abra `config.js` e preencha:

```js
window.APP_CONFIG = {
  SUPABASE_URL: "SUA_URL",
  SUPABASE_ANON_KEY: "SUA_CHAVE_PUBLICA"
};
```

Nunca coloque a `service_role` key no frontend.

## 3. Login

O sistema usa e-mail + senha. Dependendo da configuração padrão do Supabase, a criação da conta pode exigir confirmação por e-mail.

## 4. Publicar no GitHub Pages

1. Crie um repositório, por exemplo `dataprev-estudos`
2. Envie os arquivos da pasta para a raiz do repositório
3. Em Settings > Pages
4. Em Source, escolha `Deploy from a branch`
5. Selecione a branch `main` e a pasta `/ (root)`
6. Salve
7. O GitHub informará o endereço público

## 5. Segurança

As tabelas usam Row Level Security. Cada usuário autenticado só pode consultar e alterar linhas cujo `user_id` seja o seu próprio ID.

A chave anon/publishable do Supabase é própria para uso no navegador quando RLS está corretamente configurado.

## Observação sobre o edital

A base inicial traz os tópicos gerais do Anexo I do edital DATAPREV 2026 e um item genérico de Conhecimentos Específicos. O conteúdo específico completo deve ser carregado conforme o perfil escolhido.


## Versão 2

- Perfil fixado em 4. Inteligência da Informação
- Todo o conteúdo do Perfil 4 do edital foi incluído no checklist
- Cronograma transformado em checklist com quadrados de conclusão
- Cada disciplina possui uma cor própria
- Progresso calculado automaticamente por bloco e no total
- A versão 2 preserva os registros já feitos na versão 1 e adiciona os novos tópicos
