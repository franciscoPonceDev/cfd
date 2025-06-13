# Lista de Requisitos Funcionais Mínimos para MVP

Com base na análise da Inco.vc e nos requisitos regulatórios da CVM (Resolução 88/2022), a seguir são listados os requisitos funcionais mínimos para o desenvolvimento de um Produto Viável Mínimo (MVP) de uma plataforma de investimento participativo com marca própria:

**Módulo de Cadastro e Autenticação (Comum a Investidores e Empresas):**

*   **Cadastro de Usuário (Investidor):** Permitir que pessoas físicas se cadastrem fornecendo dados básicos (nome, CPF, e-mail, telefone, endereço), com validação de formato e unicidade (CPF, e-mail).
*   **Cadastro de Usuário (Empresa Captadora):** Permitir que representantes legais de empresas se cadastrem fornecendo dados da empresa (CNPJ, razão social, endereço) e do representante (nome, CPF, e-mail, cargo).
*   **Processo KYC/PLD (Investidor):** Implementar fluxo de verificação de identidade (envio de documento de identidade, possivelmente selfie), consulta a bases de dados restritivas e aplicação de políticas de Prevenção à Lavagem de Dinheiro, conforme Resolução CVM 50/2021.
*   **Processo Due Diligence (Empresa Captadora):** Implementar fluxo de análise documental da empresa (contrato social, certidões negativas, dados financeiros básicos) e de seus sócios/administradores.
*   **Autenticação Segura:** Login com e-mail/CPF/CNPJ e senha, com mecanismos de recuperação de senha e preferencialmente autenticação de dois fatores (2FA).
*   **Gestão de Perfil:** Permitir que usuários (investidores e empresas) visualizem e editem seus dados cadastrais básicos (exceto CPF/CNPJ).

**Módulo do Investidor:**

*   **Listagem de Ofertas:** Apresentar as ofertas de investimento ativas, exibindo informações essenciais resumidas (nome da empresa, setor, rentabilidade projetada, prazo, valor mínimo, status da captação).
*   **Detalhes da Oferta:** Exibir página detalhada para cada oferta, contendo todas as informações essenciais exigidas pela CVM (Anexo E da Res. 88), incluindo descrição do projeto, riscos, garantias, condições financeiras, documentos relevantes (contrato, estatuto, demonstrações financeiras quando aplicável).
*   **Simulação de Investimento (Opcional no MVP, mas recomendado):** Ferramenta simples para simular retorno com base no valor investido.
*   **Processo de Investimento:** Permitir ao investidor indicar o valor que deseja investir (respeitando mínimo da oferta e limites da CVM), confirmar leitura e aceite do termo de ciência de risco e contrato de investimento.
*   **Gestão de Limites de Investimento:** Controlar o limite anual de investimento (R$ 20.000 ou 10% da renda/patrimônio para perfis específicos), exigindo e armazenando as declarações necessárias (Anexos A, B, C da Res. 88).
*   **Integração de Pagamento (Entrada):** Mecanismo para o investidor aportar recursos na plataforma (ex: geração de boleto, dados para TED/PIX para conta segregada – **nunca** conta da plataforma).
*   **Carteira/Portfólio:** Visualização simplificada dos investimentos realizados, status e valores aplicados.
*   **Extrato Financeiro:** Histórico básico de aportes, rendimentos recebidos e retiradas.
*   **Notificações:** Envio de notificações básicas (confirmação de investimento, recebimento de rendimentos, encerramento de oferta).
*   **Período de Desistência:** Funcionalidade para permitir ao investidor desistir do investimento dentro do prazo legal (mínimo 5 dias) sem penalidades.

**Módulo da Empresa Captadora:**

*   **Submissão de Projeto:** Formulário para a empresa enviar informações iniciais sobre o projeto e a necessidade de captação.
*   **Acompanhamento da Análise:** Interface simples para a empresa visualizar o status da análise de seu projeto pela equipe da plataforma.
*   **Visualização da Oferta:** Acesso à página da sua oferta publicada para acompanhamento do progresso da captação.
*   **Relatórios Pós-Captação:** Acesso a informações básicas sobre o resultado da captação (valor total, número de investidores).

**Módulo de Backoffice/Administração da Plataforma:**

*   **Gestão de Usuários:** Ferramentas para visualizar e gerenciar cadastros de investidores e empresas (aprovação/reprovação KYC/Due Diligence, bloqueio).
*   **Gestão de Ofertas:** Ferramentas para cadastrar novas ofertas (com todos os dados e documentos exigidos pela CVM), definir parâmetros (valores, prazos), publicar, monitorar, encerrar (com sucesso ou falha) e gerenciar lotes adicionais/secundários (se aplicável no futuro).
*   **Controle de Fluxo Financeiro:** Sistema para conciliar aportes dos investidores, controlar a conta segregada, liberar recursos para a SEPP em caso de sucesso, e processar devoluções em caso de falha ou desistência.
*   **Gestão de Pagamentos (Rendimentos):** Interface para registrar os pagamentos recebidos das SEPPs e orquestrar a distribuição aos investidores (MVP pode ter processo manual/semi-manual).
*   **Geração de Relatórios Regulatórios:** Capacidade de extrair dados básicos para cumprimento de obrigações informacionais à CVM.
*   **Gestão de Conteúdo:** Ferramentas básicas para atualizar informações institucionais, FAQs, etc.

**Requisitos Não-Funcionais Essenciais para o MVP:**

*   **Segurança:** Aplicação de boas práticas de segurança no desenvolvimento (OWASP), proteção contra ataques comuns, HTTPS em todas as comunicações, armazenamento seguro de senhas e dados sensíveis.
*   **Conformidade Regulatória:** Arquitetura e fluxos desenhados para atender estritamente à Resolução CVM 88 e Resolução CVM 50 (KYC/PLD).
*   **Usabilidade:** Interface limpa e intuitiva, especialmente nos fluxos de cadastro e investimento.
*   **Escalabilidade Básica:** Arquitetura que permita crescimento futuro, mesmo que o MVP inicial não precise suportar altíssimo volume.
*   **Logs e Auditoria:** Registro detalhado de ações críticas na plataforma para fins de auditoria e segurança.
