import React, { useEffect, useState } from "react";
import { Wallet, PlusCircle, Trash2 } from "lucide-react";
import './App.css'
import api from './services/api';

function App() {
  const [transacoes, setTransacoes] = useState([]);

  // Estado para os campos do formulário
  const [novaTransacao, setNovaTransacao] = useState({
    descricao: "",
    valor: "",
    tipo: "RECEITA",
    data: new Date().toISOString().split("T")[0], // Data de hoje por padrão
  });

  const carregarTransacoes = async () => {
    try {
      const response = await api.get("/api/transacoes");
      setTransacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // Função para salvar no Banco de Dados
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede a página de recarregar
    try {
      await api.post("/api/transacoes", novaTransacao);
      setNovaTransacao({
        descricao: "",
        valor: "",
        tipo: "RECEITA",
        data: novaTransacao.data,
      }); // Limpa campos
      carregarTransacoes(); // Atualiza a lista na tela
    } catch (error) {
      alert("Erro ao salvar transação!");
    }
  };

  const excluirTransacao = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      try {
        await api.delete(`/api/transacoes/${id}`);
        // Após excluir no banco, atualizamos a lista na tela
        carregarTransacoes();
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Não foi possível excluir a transação.");
      }
    }
  };

  const entradas = transacoes
    .filter((t) => t.tipo === "RECEITA")
    .reduce((acc, t) => acc + parseFloat(t.valor), 0);

  const saídas = transacoes
    .filter((t) => t.tipo === "DESPESA")
    .reduce((acc, t) => acc + parseFloat(t.valor), 0);

  const saldoTotal = entradas - saídas;

  useEffect(() => {
    carregarTransacoes();
  }, []);

  return (
    <div className="container">
    <header className="header">
      <Wallet size={32} color="#2ecc71" />
      <h1>Controle Financeiro</h1>
    </header>

    <div className="card-container">
      <div className="card" style={{ borderLeft: '5px solid #2ecc71' }}>
        <small style={{ color: '#666' }}>Entradas</small>
        <h2 style={{ color: '#2ecc71' }}>R$ {entradas.toFixed(2)}</h2>
      </div>
      <div className="card" style={{ borderLeft: '5px solid #e74c3c' }}>
        <small style={{ color: '#666' }}>Saídas</small>
        <h2 style={{ color: '#e74c3c' }}>R$ {saídas.toFixed(2)}</h2>
      </div>
      <div className="card" style={{ borderLeft: `5px solid ${saldoTotal >= 0 ? '#3498db' : '#e74c3c'}` }}>
        <small style={{ color: '#666' }}>Saldo Atual</small>
        <h2 style={{ color: saldoTotal >= 0 ? '#3498db' : '#e74c3c' }}>R$ {saldoTotal.toFixed(2)}</h2>
      </div>
    </div>

    <form className="form-group" onSubmit={handleSubmit}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <label><small>Descrição</small></label>
        <input value={novaTransacao.descricao} onChange={(e) => setNovaTransacao({...novaTransacao, descricao: e.target.value})} required />
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <label><small>Valor</small></label>
        <input type="number" value={novaTransacao.valor} onChange={(e) => setNovaTransacao({...novaTransacao, valor: e.target.value})} required />
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <label><small>Tipo</small></label>
        <select value={novaTransacao.tipo} onChange={(e) => setNovaTransacao({...novaTransacao, tipo: e.target.value})}>
          <option value="RECEITA">Receita</option>
          <option value="DESPESA">Despesa</option>
        </select>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <label><small>Data</small></label>
        <input type="date" value={novaTransacao.data} onChange={(e) => setNovaTransacao({...novaTransacao, data: e.target.value})} />
      </div>
      <button type="submit"><PlusCircle size={18} /></button>
    </form>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map(t => (
            <tr key={t.id}>
              <td>{t.descricao}</td>
              <td style={{ fontWeight: '600', color: t.tipo === 'RECEITA' ? '#2ecc71' : '#e74c3c' }}>
                {t.tipo === 'RECEITA' ? '+' : '-'} R$ {parseFloat(t.valor).toFixed(2)}
              </td>
              <td>{new Date(t.data).toLocaleDateString('pt-BR')}</td>
              <td><Trash2 className="trash-icon" size={20} onClick={() => excluirTransacao(t.id)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default App;
