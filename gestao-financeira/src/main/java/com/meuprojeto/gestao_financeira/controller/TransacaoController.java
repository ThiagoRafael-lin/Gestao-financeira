package com.meuprojeto.gestao_financeira.controller;

import com.meuprojeto.gestao_financeira.model.Transacao;
import com.meuprojeto.gestao_financeira.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin(origins = "https://gestao-financeira-pink.vercel.app/")
public class TransacaoController {
    @Autowired
    private TransacaoRepository repository;

@GetMapping
    public List<Transacao> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Transacao salvar(@RequestBody Transacao transacao){
    return repository.save(transacao);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Transacao editar(@PathVariable Long id, @RequestBody Transacao transacaoAtualizada) {
        return repository.findById(id)
                .map(transacao -> {
                    transacao.setDescricao(transacaoAtualizada.getDescricao());
                    transacao.setValor(transacaoAtualizada.getValor());
                    transacao.setData(transacaoAtualizada.getData());
                    transacao.setTipo(transacaoAtualizada.getTipo());
                    return repository.save(transacao);
                }).orElseThrow(() -> new RuntimeException("Transação não encontrada com o id" + id));
    }

    @GetMapping("/saldo")
    public BigDecimal calcularSaldo() {
    List<Transacao> todas = repository.findAll();
    BigDecimal receitas = todas.stream()
            .filter(t -> "RECEITA".equals(t.getTipo()))
            .map(Transacao::getValor)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal despesas = todas.stream()
                .filter(t -> "DESPESA".equals(t.getTipo()))
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return receitas.subtract(despesas);
    }
}
