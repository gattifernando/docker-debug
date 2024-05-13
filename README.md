<!-- ![TimelineDevix](https://github.com/devix-tecnologia/timeline-vue/blob/044648477f0b124c6968d4e84de6781d7633b984/docs/timeline_topo.png)
 -->

# Aplicação com debug em imagem do Docker Compose

Este é um projeto modelo para depuração em imagem Docker. 
Abaixo segue passo a passo de como foi montado cada arquivo e serve como tutorial caso não queira utilizar esta instalação ou apenas implementar este uso em um projeto já existente:

- Para começar, inicie o projeto com `yarn install` para instalar todas as dependências (estamos utilizando typescript, nodemon e ts-node, por exemplo).

- Por utilizar o nodemon para monitorar e atualizar nosso servidor em caso de alterações, é preciso configurar o arquivo package.json para tal, inserindo o seguinte código ao final:
```
"nodemonConfig": {
    "watch": [
      "main.ts"
    ],
    "ext": "ts",
    "execMap": {
      "ts": "node --require ts-node/register"
    }
  }
```

- O arquivo main.ts é um exemplo de implementação e roda um servidor HTTP na porta 3000 e retorna uma página HTML simples.

- No arquivo docker-compose.yml montamos nossa imagem com o main.ts; definimos as portas usadas (3000 para o serviço e 9229 para depuração); e habilitamos o modo de depuração remota do Node.js na porta 9229 inserindo o código `--inspect=0.0.0.0:9229` junto do comando que inicia o servidor.:
``` 
services:
  main:
    image: node:16
    volumes:
      - ./node_modules:/node_modules
      - ./package.json:/package.json
      - ./tsconfig.json:/tsconfig.json
      - ./main.ts:/main.ts
    ports:
      - 3000:3000
      - 9229:9229
    command: yarn nodemon --inspect=0.0.0.0:9229 --signal SIGINT --nolazy main.ts
```
 
- Para depurar usando o vs code, precisamos configurar o depurador. Isso é feito indo até o menu de depuração, clicando em "criar um arquivo launch.json" e selecionando Node.js entre as opções. Assim será criada uma pasta .vscode em nosso projeto e nela o arquivo launch.json. Para o nosso contexto de uso, ao invés da configuração padrão, este arquivo deverá conter o seguinte código:

```
{
    "version": "0.2.0",
    "configurations": [
      {
        "name": "main",
        "type": "node",
        "request": "attach",
        "port": 9229,
        "restart": true,
        "localRoot": "${workspaceFolder}",
        "remoteRoot": "/"
      }
    ]
  }
  ```

- A porta utilizada deve ser a mesma especificada na configuração do docker compose.

- Após estas configurações, inicie o docker compose utilizando neste projeto `bash run.sh` ou diretamente com o código `docker compose up --build`.

- Inicie o modo de depuração (clicando no play na área de depuração ou usando F5); coloque seus pontos de interrupção na aplicação e acesse o serviço (neste caso, no endereço http://localhost:3000).


## 🚀  Contribuindo
---

Faça um fork do projeto, crie uma nova branch e faça seus commits. Seguem passos para bons commits:

1) **Criar um Fork:** Acesse o repositório de origem no GitHub e clique em "Fork". Isso criará uma cópia do projeto na sua conta pessoal do GitHub.
2) **Clonar ou Atualizar o Seu Fork:** Se ainda não clonou o seu fork para a máquina local, faça-o com `git clone [URL_DO_SEU_FORK]`. Se já possui o projeto clonado, certifique-se de que seu fork esteja atualizado em relação ao projeto de origem usando os comandos:
   ```
   git remote add upstream [URL_DO_REPOSITORIO_ORIGEM]
   git fetch upstream
   git merge upstream/branch_de_referencia
   ```
3) **Atualizar Referências Remotas:** O comando `git remote update` atualiza as referências locais em relação aos repositórios remotos.
4) **Selecionar o Branch de Partida:** Em geral, utiliza-se o `develop` como branch base, mas verifique sempre no git graph ou em instruções específicas da tarefa qual branch deve ser utilizado.
5) **Sincronizar Mudanças Remotas:** Antes de iniciar as modificações, é uma boa prática sincronizar o branch local com o remoto usando `git pull origin branch_de_referencia`.
6) **Criar um Novo Branch:** Ao trabalhar em uma nova funcionalidade ou correção, crie um novo branch com um nome descritivo, como `feature-relatorio-cliente`, usando o comando `git checkout -b nome_do_branch`.
7) **Fazer Alterações e Commit:** Realize as alterações necessárias no código. Ao terminar, faça um commit seguindo um padrão de mensagens semânticas e imperativas. Lembre-se de criar e/ou executar testes automatizados para garantir que nada foi quebrado.
8) **Enviar Alterações para o GitHub:** Envie as alterações para o seu fork com o comando `git push origin nome_do_branch`.
9) **Abrir um Pull Request:** Acesse seu fork no GitHub e clique em "New Pull Request". Escolha os branches de origem e destino corretos e envie sua solicitação. O desenvolvedor ou equipe responsável pelo projeto de origem revisará suas alterações e, se aprovadas, fará o merge no projeto principal.

---

Código-fonte bom é código compartilhado! Contribua melhorando esse importante projeto. 😉
