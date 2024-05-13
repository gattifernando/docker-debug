import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const span = `<span style="text-decoration: underline;">main.ts<span/>`;
    const titulo = `<h1>Teste de debug no docker do arquivo ${span}</h1>`;
    res.end(titulo);
  }
);

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
