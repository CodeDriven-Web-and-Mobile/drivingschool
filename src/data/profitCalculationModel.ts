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
  customerServiceCostPerDay: -54.8, // 100000/365/5 = ~54.8 per day
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
  const cellphonePlanRevenue = registeredStudents * params.cellphonePlanCost;
  const totalRevenue = lessonRevenue + cellphonePlanRevenue;
  
  // Calculate costs
  // Calculate instructor cost per lesson from lesson income and instructor percentage
  const instructorCostPerLesson = params.lessonIncome * (params.instructorCostPercentage / 100);
  const instructorCosts = instructorsNeeded * instructorCostPerLesson * lessonsPerInstructorPerMonth;
  const insuranceCosts = totalLessonsPerMonth * Math.abs(params.insurancePerLesson);
  
  // Tech infrastructure costs (monthly)
  const techInfrastructureCosts = (
    (registeredStudents * Math.abs(params.googleMapsPerUserPerDay) * 30) + // Google Maps
    (registeredStudents * Math.abs(params.authenticationPerUserPerDay) * 30) + // Authentication
    (Math.abs(params.websiteCostPerDay) * 30) + // Website
    (Math.abs(params.postgresCostPerDay) * 30) // Postgres
  );
  
  // Operational costs (monthly)
  const operationalCosts = (
    (Math.abs(params.customerServiceCostPerDay) * 30) + // Customer Service
    (Math.abs(params.accountingCostPerDay) * 30) + // Accounting
    (Math.abs(params.marketingCostPerDay) * 30) + // Marketing
    (instructorsNeeded * Math.abs(params.healthPerDriverPerMonth)) // Health benefits
  );
  
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
    const cellphonePlanRevenueAtPercentage = studentsAtPercentage * params.cellphonePlanCost;
    const totalRevenueAtPercentage = lessonRevenueAtPercentage + cellphonePlanRevenueAtPercentage;
    
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
    const operationalCostsAtPercentage = (
      (Math.abs(params.customerServiceCostPerDay) * 30) +
      (Math.abs(params.accountingCostPerDay) * 30) +
      (Math.abs(params.marketingCostPerDay) * 30) +
      (instructorsNeededAtPercentage * Math.abs(params.healthPerDriverPerMonth))
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
      additionalRevenue: cellphonePlanRevenue
    },
    profitByStudentPercentage
  };
}
