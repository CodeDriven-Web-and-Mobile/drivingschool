// Profit calculation parameters
export interface ProfitCalculationParams {
  lessonsPerStudentPerMonth: number;
  percentageRegisteredStudents: number;
  lessonsPerDayPerInstructor: number;
  lessonIncome: number;
  instructorCostPercentage: number;
  insurancePerLesson: number;
  googleMapsPerUserPerDay: number;
  authenticationPerUserPerDay: number;
  websiteCostPerDay: number;
  postgresCostPerDay: number;
  customerServiceCostPerDay: number;
  accountingCostPerDay: number;
  marketingCostPerDay: number;
  cellphonePlanCost: number;
  healthPerDriverPerMonth: number;
}

// Default values based on provided data
export const defaultProfitParams: ProfitCalculationParams = {
  lessonsPerStudentPerMonth: 10,
  percentageRegisteredStudents: 10,
  lessonsPerDayPerInstructor: 4,
  lessonIncome: 60,
  instructorCostPercentage: 60,
  insurancePerLesson: -4,
  googleMapsPerUserPerDay: -2, // Updated to 2 as requested
  authenticationPerUserPerDay: -1,
  websiteCostPerDay: -40,
  postgresCostPerDay: -40,
  customerServiceCostPerDay: -50, // 100000/365/5 = ~54.8 per day
  accountingCostPerDay: -1000,
  marketingCostPerDay: -1000,
  cellphonePlanCost: 70,
  healthPerDriverPerMonth: 500
};

// Profit calculation result interface
export interface ProfitCalculationResult {
  totalRevenue: number;
  totalCosts: number;
  netProfit: number;
  profitMargin: number;
  breakdownByCategory: {
    lessonRevenue: number;
    instructorCosts: number;
    insuranceCosts: number;
    techInfrastructureCosts: number;
    operationalCosts: number;
    additionalRevenue: number;
  };
  // Detailed sub-cost breakdowns for UI
  techBreakdown: {
    googleMaps: number;
    authentication: number;
    website: number;
    database: number;
  };
  operationalBreakdown: {
    customerService: number;
    accounting: number;
    marketing: number;
    healthBenefits: number;
    cellphonePlan: number;
  };
  profitByStudentPercentage: Array<{
    percentage: number;
    profit: number;
    revenue: number;
  }>;
}

// Helper function to calculate profit based on parameters and student count
export function calculateProfit(
  params: ProfitCalculationParams,
  totalPotentialStudents: number
): ProfitCalculationResult {
  // Calculate number of registered students
  const registeredStudents = totalPotentialStudents * (params.percentageRegisteredStudents / 100);
  
  // Calculate number of instructors needed
  const totalLessonsPerMonth = registeredStudents * params.lessonsPerStudentPerMonth;
  const lessonsPerInstructorPerMonth = params.lessonsPerDayPerInstructor * 22; // Assuming 22 working days per month
  const instructorsNeeded = Math.ceil(totalLessonsPerMonth / lessonsPerInstructorPerMonth);
  
  // Calculate revenue
  const lessonRevenue = totalLessonsPerMonth * params.lessonIncome;
  const totalRevenue = lessonRevenue;
  
  // Cellphone plan is a cost, not revenue
  const cellphonePlanCost = registeredStudents * Math.abs(params.cellphonePlanCost);
  
  // Calculate costs
  // Calculate instructor cost per lesson from lesson income and instructor percentage
  const instructorCostPerLesson = params.lessonIncome * (params.instructorCostPercentage / 100);
  const instructorCosts = instructorsNeeded * instructorCostPerLesson * lessonsPerInstructorPerMonth;
  const insuranceCosts = totalLessonsPerMonth * Math.abs(params.insurancePerLesson);
  
  // Tech infrastructure costs (monthly)
  const tech_googleMaps = registeredStudents * Math.abs(params.googleMapsPerUserPerDay) * 30;
  const tech_authentication = registeredStudents * Math.abs(params.authenticationPerUserPerDay) * 30;
  const tech_website = Math.abs(params.websiteCostPerDay) * 30;
  const tech_database = Math.abs(params.postgresCostPerDay) * 30;
  const techInfrastructureCosts = tech_googleMaps + tech_authentication + tech_website + tech_database;
  
  // Operational costs (monthly)
  const op_customerService = Math.abs(params.customerServiceCostPerDay) * 30;
  const op_accounting = Math.abs(params.accountingCostPerDay) * 30;
  const op_marketing = Math.abs(params.marketingCostPerDay) * 30;
  const op_healthBenefits = instructorsNeeded * Math.abs(params.healthPerDriverPerMonth);
  const op_cellphonePlan = cellphonePlanCost;
  const operationalCosts = op_customerService + op_accounting + op_marketing + op_healthBenefits + op_cellphonePlan;
  
  // Calculate total costs and profit
  const totalCosts = instructorCosts + insuranceCosts + techInfrastructureCosts + operationalCosts;
  const netProfit = totalRevenue - totalCosts;
  const profitMargin = (netProfit / totalRevenue) * 100;
  
  // Calculate profit by different student percentages
  const profitByStudentPercentage = [5, 10, 15, 20, 25, 30, 40, 50].map(percentage => {
    // Avoid infinite recursion by calculating directly instead of calling calculateProfit again
    const studentsAtPercentage = totalPotentialStudents * (percentage / 100);
    const lessonsAtPercentage = studentsAtPercentage * params.lessonsPerStudentPerMonth;
    const instructorsNeededAtPercentage = Math.ceil(lessonsAtPercentage / lessonsPerInstructorPerMonth);
    
    // Revenue calculations
    const lessonRevenueAtPercentage = lessonsAtPercentage * params.lessonIncome;
    // Cellphone plan is a cost, not revenue
    const totalRevenueAtPercentage = lessonRevenueAtPercentage;
    
    // Cost calculations - calculate instructor cost from lesson income and percentage
    const instructorCostPerLesson = params.lessonIncome * (params.instructorCostPercentage / 100);
    const instructorCostsAtPercentage = instructorsNeededAtPercentage * instructorCostPerLesson * lessonsPerInstructorPerMonth;
    const insuranceCostsAtPercentage = lessonsAtPercentage * Math.abs(params.insurancePerLesson);
    
    // Tech costs
    const techCostsAtPercentage = (
      (studentsAtPercentage * Math.abs(params.googleMapsPerUserPerDay) * 30) +
      (studentsAtPercentage * Math.abs(params.authenticationPerUserPerDay) * 30) +
      (Math.abs(params.websiteCostPerDay) * 30) +
      (Math.abs(params.postgresCostPerDay) * 30)
    );
    
    // Operational costs
    const cellphonePlanCostAtPercentage = studentsAtPercentage * Math.abs(params.cellphonePlanCost);
    const operationalCostsAtPercentage = (
      (Math.abs(params.customerServiceCostPerDay) * 30) +
      (Math.abs(params.accountingCostPerDay) * 30) +
      (Math.abs(params.marketingCostPerDay) * 30) +
      (instructorsNeededAtPercentage * Math.abs(params.healthPerDriverPerMonth)) +
      cellphonePlanCostAtPercentage // Add cellphone plan cost
    );
    
    const totalCostsAtPercentage = instructorCostsAtPercentage + insuranceCostsAtPercentage + 
                                  techCostsAtPercentage + operationalCostsAtPercentage;
    const profitAtPercentage = totalRevenueAtPercentage - totalCostsAtPercentage;
    
    return {
      percentage,
      profit: profitAtPercentage,
      revenue: totalRevenueAtPercentage
    };
  });
  
  return {
    totalRevenue,
    totalCosts,
    netProfit,
    profitMargin,
    breakdownByCategory: {
      lessonRevenue,
      instructorCosts,
      insuranceCosts,
      techInfrastructureCosts,
      operationalCosts,
      additionalRevenue: 0 // Cellphone plan is now a cost, not revenue
    },
    techBreakdown: {
      googleMaps: tech_googleMaps,
      authentication: tech_authentication,
      website: tech_website,
      database: tech_database
    },
    operationalBreakdown: {
      customerService: op_customerService,
      accounting: op_accounting,
      marketing: op_marketing,
      healthBenefits: op_healthBenefits,
      cellphonePlan: op_cellphonePlan
    },
    profitByStudentPercentage
  };
}
