export type Assessment={id:string;track:string;title:string;level:string;opening:string;rubric:string;scenario:string;scenarioRubric:string};
export const catalogue:Assessment[]=[
  {
    "id": "ai-1",
    "track": "AI",
    "title": "Machine learning foundations",
    "level": "Foundation",
    "opening": "Explain supervised and unsupervised learning, and give one business example of each.",
    "rubric": "Distinguish labelled targets from pattern discovery; use appropriate classification/regression and clustering examples.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "ai-2",
    "track": "AI",
    "title": "Data preparation",
    "level": "Foundation",
    "opening": "Your training data has missing values, duplicate rows and very different feature scales. How would you prepare it without causing data leakage?",
    "rubric": "Discuss train-test splitting before fitted preprocessing, imputation, deduplication, scaling when relevant and a reproducible pipeline.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "ai-3",
    "track": "AI",
    "title": "Model evaluation",
    "level": "Foundation",
    "opening": "A fraud detection model is 99% accurate but misses almost all fraud. What metrics would you use and why?",
    "rubric": "Class imbalance, confusion matrix, recall, precision, PR-AUC, costs of false positives/negatives and threshold tradeoffs.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "ai-4",
    "track": "AI",
    "title": "Neural networks",
    "level": "Applied",
    "opening": "Explain how a neural network learns from an error. What roles do the loss function, backpropagation and learning rate play?",
    "rubric": "Loss measures error, backpropagation computes gradients, optimisation updates parameters; learning rate affects convergence and stability.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "ai-5",
    "track": "AI",
    "title": "Natural language processing",
    "level": "Applied",
    "opening": "How would you build and evaluate a system that classifies customer reviews as positive or negative?",
    "rubric": "Representative labelled data, splits, text representation/tokenisation, baseline, class balance, precision/recall/F1 and error analysis.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "ai-6",
    "track": "AI",
    "title": "Generative AI and RAG",
    "level": "Applied",
    "opening": "A company wants a chatbot that answers from its internal documents. Explain retrieval-augmented generation and how you would reduce incorrect answers.",
    "rubric": "Chunk, embed, retrieve, ground response, cite sources, access controls, abstain with insufficient evidence, evaluate retrieval and answer quality.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "ai-7",
    "track": "AI",
    "title": "Responsible AI",
    "level": "Applied",
    "opening": "A hiring model performs worse for one group of applicants. How would you investigate and address that?",
    "rubric": "Check representative data, label quality, subgroup metrics, unfair proxies, appropriate fairness criteria, human oversight and monitoring.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "ai-8",
    "track": "AI",
    "title": "Model deployment",
    "level": "Interview ready",
    "opening": "You have trained a useful model in a notebook. What must happen before it can be safely used in a production application?",
    "rubric": "Reproducible preprocessing, versioning, serving interface, testing, latency, access protection, monitoring, drift and rollback.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "ai-9",
    "track": "AI",
    "title": "Applied AI case study",
    "level": "Interview ready",
    "opening": "A retailer wants to predict which products will sell next week. How would you frame the problem, choose data and validate a first model?",
    "rubric": "Forecast target and horizon, seasonality, availability at prediction time, time-based validation, simple baseline, suitable metric, stockout caveat.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "ai-10",
    "track": "AI",
    "title": "AI graduate interview",
    "level": "Interview ready",
    "opening": "Describe an AI project you could build as a fresher. Explain its business value, data, baseline, evaluation and one limitation.",
    "rubric": "Clear feasible use case, realistic data plan, appropriate baseline and metric, limitations, responsible deployment; do not require prior employment.",
    "scenario": "You have a model with excellent training accuracy but poor performance on new data. How would you investigate and improve it?",
    "scenarioRubric": "Explain overfitting, leakage, representative splits, cross-validation, regularisation and baseline comparison. Reward practical reasoning and acknowledge tradeoffs."
  },
  {
    "id": "computer-science-1",
    "track": "Computer Science",
    "title": "Programming foundations",
    "level": "Foundation",
    "opening": "Explain the difference between a variable, a data type and a function using a short programming example.",
    "rubric": "Correct concepts, parameter/return behaviour, coherent example; accept any mainstream language.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "computer-science-2",
    "track": "Computer Science",
    "title": "Data structures",
    "level": "Foundation",
    "opening": "When would you use a hash map instead of an array or linked list? Explain the operations and tradeoffs.",
    "rubric": "Expected O(1) hash lookup, keys and values, memory overhead, collision/worst-case nuance; arrays indexed access and lists traversal.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "computer-science-3",
    "track": "Computer Science",
    "title": "Algorithms and complexity",
    "level": "Foundation",
    "opening": "You need to find whether a sorted list contains a number. Explain binary search and its time complexity.",
    "rubric": "Repeated interval halving, midpoint comparison, boundaries, O(log n), sorted input requirement and O(1) iterative extra space.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "computer-science-4",
    "track": "Computer Science",
    "title": "Object-oriented design",
    "level": "Applied",
    "opening": "Explain encapsulation, inheritance and polymorphism with a simple application example.",
    "rubric": "Encapsulation protects implementation, inheritance specialises, polymorphism allows common interface/different behaviour; accept composition tradeoffs.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "computer-science-5",
    "track": "Computer Science",
    "title": "Databases and SQL",
    "level": "Applied",
    "opening": "Explain INNER JOIN and LEFT JOIN. Give an example using customers and orders, including customers with no orders.",
    "rubric": "Inner matching rows; left all customers plus nullable unmatched orders; one-to-many may multiply rows.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "computer-science-6",
    "track": "Computer Science",
    "title": "Operating systems",
    "level": "Applied",
    "opening": "What is the difference between a process and a thread? What problems can shared data introduce?",
    "rubric": "Separate address spaces vs shared process memory, scheduling, race conditions, locks and deadlock tradeoffs.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "computer-science-7",
    "track": "Computer Science",
    "title": "Computer networks",
    "level": "Applied",
    "opening": "What happens when you type a website address in a browser and press Enter?",
    "rubric": "DNS, connection/TLS as applicable, HTTP request-response, resources/rendering; avoid demanding a particular protocol version.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "computer-science-8",
    "track": "Computer Science",
    "title": "Software testing",
    "level": "Interview ready",
    "opening": "How would you test a login form? Describe normal cases, edge cases and security-related checks.",
    "rubric": "Valid/invalid credentials, empty fields, boundaries, safe errors, rate limits, session handling, injection tests and appropriate unit/integration/end-to-end layers.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "computer-science-9",
    "track": "Computer Science",
    "title": "Web development",
    "level": "Interview ready",
    "opening": "Explain the roles of HTML, CSS, JavaScript and a backend in an online shopping application.",
    "rubric": "Structure, styling, behaviour, server-side business logic, persistence, secure payment validation and secret handling.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "computer-science-10",
    "track": "Computer Science",
    "title": "Software engineer interview",
    "level": "Interview ready",
    "opening": "A user says an application sometimes displays the wrong account balance. How would you investigate the issue?",
    "rubric": "Reproduce, gather logs safely, validate data flow and calculations, concurrency/caching, tests, fix and verify without exposing user data.",
    "scenario": "An application becomes slow as its data grows. How would you investigate it and choose a more efficient solution?",
    "scenarioRubric": "Measure first; consider time and space complexity, data structures, query plans, indexing, profiling, bottlenecks and tradeoffs. Accept multiple justified approaches."
  },
  {
    "id": "accounting-1",
    "track": "Accounting",
    "title": "Accounting foundations",
    "level": "Foundation",
    "opening": "Explain the accounting equation and show how purchasing equipment with cash affects it.",
    "rubric": "Assets=liabilities+equity; equipment up cash down; total assets unchanged at initial purchase absent taxes/fees; not immediate full expense.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "accounting-2",
    "track": "Accounting",
    "title": "Journal entries and ledgers",
    "level": "Foundation",
    "opening": "A business makes a credit sale of \u20b910,000 and receives payment next month. Explain the journal entries, ignoring tax.",
    "rubric": "At sale debit receivable 10000 credit sales 10000; at collection debit bank credit receivable; accrual timing.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "accounting-3",
    "track": "Accounting",
    "title": "Financial statements",
    "level": "Foundation",
    "opening": "How do the income statement, balance sheet and cash flow statement connect?",
    "rubric": "Profit into retained earnings subject to distributions, cash flow reconciles cash, balance sheet point in time vs period flows.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "accounting-4",
    "track": "Accounting",
    "title": "Bank reconciliation",
    "level": "Applied",
    "opening": "The cash book and bank statement show different balances. How would you prepare a bank reconciliation?",
    "rubric": "Compare transactions, timing differences, unpresented cheques, deposits in transit, bank charges and errors; update book for applicable missing items.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "accounting-5",
    "track": "Accounting",
    "title": "Cost accounting",
    "level": "Applied",
    "opening": "Explain fixed and variable costs and calculate break-even units when fixed costs are \u20b960,000, price \u20b9500 and variable cost \u20b9300 per unit.",
    "rubric": "Contribution 200 per unit; break-even 300 units; fixed costs constant in relevant range; total variable costs change with volume.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "accounting-6",
    "track": "Accounting",
    "title": "Working capital",
    "level": "Applied",
    "opening": "A profitable company struggles to pay suppliers. How can that happen, and what working-capital measures would you review?",
    "rubric": "Profit differs from cash, receivables, inventory, payables, operating cycle and cash planning; avoid assuming profit means available cash.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "accounting-7",
    "track": "Accounting",
    "title": "Audit foundations",
    "level": "Applied",
    "opening": "What is audit evidence, and how would you verify the existence and valuation of inventory?",
    "rubric": "Sufficient appropriate evidence, observation/counts, reconciliation, ownership/cutoff, cost and net realisable value as applicable; existence vs valuation.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "accounting-8",
    "track": "Accounting",
    "title": "Internal controls",
    "level": "Interview ready",
    "opening": "A single employee creates vendors, approves invoices and releases payments. What risks arise and what controls would you propose?",
    "rubric": "Fraud/error risk from conflicting duties, separation, independent approvals, vendor checks, access controls and review/audit trails.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "accounting-9",
    "track": "Accounting",
    "title": "Financial analysis",
    "level": "Interview ready",
    "opening": "Revenue increased but operating profit fell. How would you analyse the reasons?",
    "rubric": "Compare margins, mix/volume/price, variable and fixed costs, one-offs, period comparability; evidence before conclusions.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "accounting-10",
    "track": "Accounting",
    "title": "Graduate accountant interview",
    "level": "Interview ready",
    "opening": "You discover an expense posted to the wrong accounting period shortly before reporting. How would you handle it?",
    "rubric": "Validate supporting evidence and materiality, communicate, correct via authorised process, accrual/cutoff, maintain audit trail; no concealment.",
    "scenario": "A business records a credit sale and receives payment next month. Explain the journal entries and effects on the financial statements.",
    "scenarioRubric": "Credit sale: debit receivable, credit revenue; collection: debit bank, credit receivable. Distinguish accrual profit from cash. Ignore tax unless specified."
  },
  {
    "id": "banking-1",
    "track": "Banking",
    "title": "Banking foundations",
    "level": "Foundation",
    "opening": "Explain how a bank earns income and the difference between a deposit and a loan from the bank\u2019s perspective.",
    "rubric": "Deposits generally liabilities; loans assets; interest spread, fees, credit costs, liquidity and operating costs.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  },
  {
    "id": "banking-2",
    "track": "Banking",
    "title": "Customer service",
    "level": "Foundation",
    "opening": "A customer reports an unauthorised digital payment. How would you respond and escalate the complaint?",
    "rubric": "Empathy, identity checks, secure channels, immediate reporting/blocking options, evidence and escalation; never ask PIN/OTP or promise reimbursement.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  },
  {
    "id": "banking-3",
    "track": "Banking",
    "title": "Credit appraisal",
    "level": "Foundation",
    "opening": "A small business requests a working-capital loan. What information would you review before recommending approval?",
    "rubric": "Cash generation, working-capital cycle, repayment ability, business and credit history, obligations, security and documents; justified decision.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  },
  {
    "id": "banking-4",
    "track": "Banking",
    "title": "Deposits and lending",
    "level": "Applied",
    "opening": "How do savings deposits, current accounts and fixed deposits serve different customer needs?",
    "rubric": "Savings personal liquidity/interest, current transactional business usage, term deposit tenure/interest and early withdrawal conditions; avoid universal rates.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  },
  {
    "id": "banking-5",
    "track": "Banking",
    "title": "Payments and digital banking",
    "level": "Applied",
    "opening": "Explain UPI, NEFT and RTGS at a conceptual level. How would you guide a customer choosing a payment method?",
    "rubric": "Payment characteristics and use case, beneficiary verification, fraud awareness; do not invent current limits, timings or fees.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  },
  {
    "id": "banking-6",
    "track": "Banking",
    "title": "Risk management",
    "level": "Applied",
    "opening": "Explain credit risk, liquidity risk and operational risk with one example of each in banking.",
    "rubric": "Borrower default, inability to meet obligations when due, process/people/system/external failure; distinguish risks and basic mitigation.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  },
  {
    "id": "banking-7",
    "track": "Banking",
    "title": "Financial inclusion",
    "level": "Applied",
    "opening": "How would you help a first-time banking customer choose and safely use a basic bank account?",
    "rubric": "Understand needs, explain features and applicable charges, documentation through authorised channels, accessible language, digital safety without promises.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  },
  {
    "id": "banking-8",
    "track": "Banking",
    "title": "Bank reconciliation",
    "level": "Interview ready",
    "opening": "A bank reconciliation contains an unidentified credit and an unpresented cheque. How would you investigate and account for them?",
    "rubric": "Verify sources/supporting records, timing treatment for cheque, do not guess unidentified credit, follow suspense/escalation policy with audit trail.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  },
  {
    "id": "banking-9",
    "track": "Banking",
    "title": "Ethics and fraud prevention",
    "level": "Interview ready",
    "opening": "A caller claiming to be a senior manager asks you to bypass verification and urgently transfer funds. What would you do?",
    "rubric": "Refuse bypass, independently verify through trusted channels, preserve evidence, report/escalate and protect confidential information.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  },
  {
    "id": "banking-10",
    "track": "Banking",
    "title": "Banking graduate interview",
    "level": "Interview ready",
    "opening": "A customer wants a loan larger than their apparent repayment capacity. How would you explain your assessment and discuss alternatives?",
    "rubric": "Evidence-based affordability, respectful explanation, avoid mis-selling, realistic alternatives/tenure subject to policy, escalation and no guaranteed approval.",
    "scenario": "A small business requests a working-capital loan. What would you examine before recommending approval?",
    "scenarioRubric": "Assess cash flow, working-capital cycle, repayment ability, existing obligations, credit history, business risk, documentation, security and appropriate conditions. Avoid guarantees."
  }
];