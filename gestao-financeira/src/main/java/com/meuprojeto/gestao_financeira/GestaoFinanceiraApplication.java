package com.meuprojeto.gestao_financeira;

import com.meuprojeto.gestao_financeira.model.Transacao;
import com.meuprojeto.gestao_financeira.repository.TransacaoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.time.LocalDate;
@SpringBootApplication
public class GestaoFinanceiraApplication {

    public static void main(String[] args) {

        SpringApplication.run(GestaoFinanceiraApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(TransacaoRepository repository) {
        return args -> {
            Transacao t1 = new Transacao();
            t1.setDescricao("Salário Mensal");
            t1.setValor(new BigDecimal("5000.00"));
            t1.setData(LocalDate.now());
            t1.setTipo("RECEITA");

            Transacao t2 = new Transacao();
            t2.setDescricao("Aluguel");
            t2.setValor(new BigDecimal("1200.00"));
            t2.setData(LocalDate.now());
            t2.setTipo("DESPESA");

            repository.save(t1);
            repository.save(t2);

            System.out.println("--- DADOS DE TESTE CRIADOS! ---");
        };
    }
}
