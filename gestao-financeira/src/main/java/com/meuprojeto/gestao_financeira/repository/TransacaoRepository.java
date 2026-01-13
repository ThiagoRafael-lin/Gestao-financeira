package com.meuprojeto.gestao_financeira.repository;

import com.meuprojeto.gestao_financeira.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

}
