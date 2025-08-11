export interface PersonnelCostParams {
  L: number; // lessons per student
  LD: number; // lessons per instructor per day
  D_work: number; // instructor working days/year
  commission_per_student: number;
  payment_cost_factor: number; // per student
  msg_per_lesson: number;
  cost_per_msg: number;
  Tech_base: number;
  tech_per_customer: number;
  support_customers_per_staff: number;
  support_salary: number;
  Exec_base: number; Exec_k: number;
  Finance_base: number; Finance_k: number;
  Marketing_base: number; Marketing_k: number;
  Operations_base: number; Operations_k: number;
  Tech_fixed_base: number; Tech_k: number;
  Office_base: number; Office_k: number;
}

export const defaultPersonnelParams: PersonnelCostParams = {
  L: 10,
  LD: 6,
  D_work: 250,
  commission_per_student: 350,
  payment_cost_factor: 14.8,
  msg_per_lesson: 10,
  cost_per_msg: 0.10,
  Tech_base: 20000,
  tech_per_customer: 2,
  support_customers_per_staff: 5000,
  support_salary: 55000,
  Exec_base: 100000, Exec_k: 0.2,
  Finance_base: 60000, Finance_k: 0.2,
  Marketing_base: 100000, Marketing_k: 0.3,
  Operations_base: 150000, Operations_k: 0.3,
  Tech_fixed_base: 300000, Tech_k: 0.3,
  Office_base: 60000, Office_k: 0.3
};

export interface PersonnelCategoryCosts {
  category: string;
  formula: string;
  value: number;
}

export interface PersonnelCostResult {
  N: number;
  categories: PersonnelCategoryCosts[];
  totalCost: number;
  costPerStudent: number;
}

const log10 = (x: number) => Math.log10(x);

export function computePersonnelCosts(N: number, p: PersonnelCostParams): PersonnelCostResult {
  // Derived values
  const Total_Lessons = N * p.L;
  const L_per_instr = p.LD * p.D_work;
  const Instructors = Math.ceil(Total_Lessons / L_per_instr);

  const Instructor_Comm = p.commission_per_student * N;
  const Payment_Cost = p.payment_cost_factor * N;
  const Messages = N * p.L * p.msg_per_lesson;
  const SMS_Cost = Messages * p.cost_per_msg;
  const Tech_Cost = p.Tech_base + p.tech_per_customer * N;
  const Support_Staff = Math.ceil(N / p.support_customers_per_staff);
  const Support_Cost = Support_Staff * p.support_salary;
  const Exec_Cost = p.Exec_base * (1 + p.Exec_k * log10(N));
  const Finance_Cost = p.Finance_base * (1 + p.Finance_k * log10(N));
  const Marketing_Cost = p.Marketing_base * (1 + p.Marketing_k * log10(N));
  const Operations_Cost = p.Operations_base * (1 + p.Operations_k * log10(N));
  const Tech_fixed = p.Tech_fixed_base * (1 + p.Tech_k * log10(N));
  const Office_Cost = p.Office_base * (1 + p.Office_k * log10(N));

  const categories: PersonnelCategoryCosts[] = [
    { category: 'Total Lessons', formula: `N × L = ${N} × ${p.L}`, value: Total_Lessons },
    { category: 'Lessons per Instructor/year', formula: `LD × D_work = ${p.LD} × ${p.D_work}`, value: L_per_instr },
    { category: 'Instructors (count)', formula: `CEILING(Total_Lessons / L_per_instr)`, value: Instructors },

    { category: 'Instructor Commission', formula: `commission_per_student × N = ${p.commission_per_student} × ${N}` , value: Instructor_Comm },
    { category: 'Payment Cost', formula: `payment_cost_factor × N = ${p.payment_cost_factor} × ${N}`, value: Payment_Cost },
    { category: 'Messages (count)', formula: `N × L × msg_per_lesson = ${N} × ${p.L} × ${p.msg_per_lesson}`, value: Messages },
    { category: 'SMS Cost', formula: `Messages × cost_per_msg = Messages × ${p.cost_per_msg}`, value: SMS_Cost },
    { category: 'Tech Cost', formula: `Tech_base + tech_per_customer × N = ${p.Tech_base} + ${p.tech_per_customer} × ${N}`, value: Tech_Cost },
    { category: 'Support Staff (count)', formula: `CEILING(N / support_customers_per_staff)`, value: Support_Staff },
    { category: 'Support Cost', formula: `Support_Staff × support_salary = Support_Staff × ${p.support_salary}`, value: Support_Cost },
    { category: 'Executive Cost', formula: `Exec_base × (1 + Exec_k × LOG10(N))`, value: Exec_Cost },
    { category: 'Finance Cost', formula: `Finance_base × (1 + Finance_k × LOG10(N))`, value: Finance_Cost },
    { category: 'Marketing Cost', formula: `Marketing_base × (1 + Marketing_k × LOG10(N))`, value: Marketing_Cost },
    { category: 'Operations Cost', formula: `Operations_base × (1 + Operations_k × LOG10(N))`, value: Operations_Cost },
    { category: 'Tech Fixed', formula: `Tech_fixed_base × (1 + Tech_k × LOG10(N))`, value: Tech_fixed },
    { category: 'Office Cost', formula: `Office_base × (1 + Office_k × LOG10(N))`, value: Office_Cost },
  ];

  // Sum only monetary cost categories (exclude counts)
  const monetary = categories.filter(c => !c.category.includes('(count)') && !c.category.includes('Total Lessons') && !c.category.includes('Lessons per Instructor'));
  const totalCost = monetary.reduce((sum, c) => sum + c.value, 0);
  const costPerStudent = totalCost / N;

  return { N, categories, totalCost, costPerStudent };
}

export function computePersonnelScenarioTable(p: PersonnelCostParams) {
  const Ns = [10000, 50000, 100000];
  return Ns.map(N => computePersonnelCosts(N, p));
}
