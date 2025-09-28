import express from 'express';
import cors from 'cors';
import routes from './app/routes/router'; // CORREÇÃO: Usando './routes/index'

const app = express();

// MIDDLEWARES GLOBAIS
app.use(cors()); // Permite requisições de outras origens
app.use(express.json()); // Habilita o Express a receber e parsear corpos JSON (req.body)

// ROTAS
// Define o prefixo global da API
app.use('/api', routes); 

// Rota de saúde (Health Check)
app.get('/', (req, res) => {
    res.json({ status: 'Online', service: 'Sheet API' });
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`URL: http://localhost:${PORT}/`);
});