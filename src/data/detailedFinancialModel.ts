// Detailed financial model for driving school scenarios

export interface DetailedFinancialParams {
  // Basic parameters
  totalPotentialStudents: number;
  percentageRegisteredStudents: number;
  lessonsPerStudentPerMonth: number;
  lessonsPerDayPerInstructor: number;
  lessonIncome: number;
  
  // Instructor costs
  instructorCostPercentage: number;
  
  // Per-lesson costs
  insuranceCostPerLesson: number;
  
  // Daily technology costs
  googleMapsPerUserPerDay: number;
  authenticationPerUserPerDay: number;
  websiteCostPerDay: number;
  databaseCostPerDay: number;
  backendCostPerDay: number;
  
  // Customer service parameters
  ticketsPerStudentPerWeek: number;
  ticketsPerInstructorPerWeek: number;
  avgHandlingTimeMinutes: number;
  customerServiceHourlyCost: number;
  
  // Other operational costs
  accountingPerDay: number;
  marketingPerDay: number;
  
  // Monthly costs per instructor
  cellPhonePlanPerMonth: number;
  healthPerDriverPerMonth: number;
}

export interface DetailedFinancialResult {
  // Student and lesson metrics
  registeredStudents: number;
  totalInstructors: number;
  lessonsPerDay: number;
  lessonIncome: number;
  
  // Daily instructor costs
  instructorCostPerLesson: number;
  instructorCostPerDay: number;
  
  // Daily technology costs
  googleMapsCostPerDay: number;
  authenticationCostPerDay: number;
  websiteCostPerDay: number;
  databaseCostPerDay: number;
  backendCostPerDay: number;
  totalTechnologyCostPerDay: number;
  
  // Daily operational costs
  insuranceCostPerDay: number;
  customerServiceCostPerDay: number;
  accountingPerDay: number;
  marketingPerDay: number;
  
  // Monthly and yearly costs
  healthCostPerMonth: number;
  cellPhonePlanCostPerMonth: number;
  healthCostPerYear: number;
  cellPhonePlanCostPerYear: number;
  
  // Revenue and profit metrics
  dailyRevenue: number;
  dailyCosts: number;
  netIncomePerDay: number;
  netIncomePerMonth: number;
  netIncomePerYear: number;
  netAfterHealthPerYear: number;
  netAfterCellPhonePerYear: number;
  profitMargin: number;
  
  // Scenario metrics
  scenarioName: string;
  scenarioDescription: string;
  isProfit: boolean;
}

// Default values based on provided data
export const defaultFinancialParams: DetailedFinancialParams = {
  // Basic parameters
  totalPotentialStudents: 1300000,
  percentageRegisteredStudents: 10,
  lessonsPerStudentPerMonth: 10,
  lessonsPerDayPerInstructor: 4,
  lessonIncome: 54,
  
  // Instructor costs
  instructorCostPercentage: -0.60, // 60% of lesson income
  
  // Per-lesson costs
  insuranceCostPerLesson: -4,
  
  // Daily technology costs
  googleMapsPerUserPerDay: -10,
  authenticationPerUserPerDay: -1,
  websiteCostPerDay: -40,
  databaseCostPerDay: -40,
  backendCostPerDay: -40,
  
  // Customer service parameters
  ticketsPerStudentPerWeek: 0.5, // Average student submits a ticket every 2 weeks
  ticketsPerInstructorPerWeek: 1, // Average instructor submits 1 ticket per week
  avgHandlingTimeMinutes: 15, // Average time to handle a ticket
  customerServiceHourlyCost: 20, // Hourly cost for customer service
  
  // Other operational costs
  accountingPerDay: -166.6666667,
  marketingPerDay: -1000,
  
  // Monthly costs per instructor
  cellPhonePlanPerMonth: 70,
  healthPerDriverPerMonth: 500
};

// Predefined scenarios based on provided data
export const predefinedScenarios: DetailedFinancialParams[] = [
  // First set of scenarios - 10% registration rate
  {
    totalPotentialStudents: 1300000,
    percentageRegisteredStudents: 10,
    lessonsPerStudentPerMonth: 10,
    lessonsPerDayPerInstructor: 4,
    lessonIncome: 54,
    instructorCostPercentage: -0.60,
    insuranceCostPerLesson: -4,
    googleMapsPerUserPerDay: -10,
    authenticationPerUserPerDay: -0.333333333,
    websiteCostPerDay: -40,
    databaseCostPerDay: -40,
    backendCostPerDay: -40,
    ticketsPerStudentPerWeek: 0.5,
    ticketsPerInstructorPerWeek: 1,
    avgHandlingTimeMinutes: 15,
    customerServiceHourlyCost: 20,
    accountingPerDay: -166.6666667,
    marketingPerDay: -1000,
    cellPhonePlanPerMonth: 70,
    healthPerDriverPerMonth: 500
  },
  // Second set of scenarios - 15% registration rate
  {
    totalPotentialStudents: 1300000,
    percentageRegisteredStudents: 15,
    lessonsPerStudentPerMonth: 10,
    lessonsPerDayPerInstructor: 4,
    lessonIncome: 54,
    instructorCostPercentage: -0.60,
    insuranceCostPerLesson: -4,
    googleMapsPerUserPerDay: -10,
    authenticationPerUserPerDay: -0.333333333,
    websiteCostPerDay: -40,
    databaseCostPerDay: -40,
    backendCostPerDay: -40,
    ticketsPerStudentPerWeek: 0.5,
    ticketsPerInstructorPerWeek: 1,
    avgHandlingTimeMinutes: 15,
    customerServiceHourlyCost: 20,
    accountingPerDay: -166.6666667,
    marketingPerDay: -1000,
    cellPhonePlanPerMonth: 70,
    healthPerDriverPerMonth: 500
  },
  // Third set of scenarios - 20% registration rate
  {
    totalPotentialStudents: 1300000,
    percentageRegisteredStudents: 20,
    lessonsPerStudentPerMonth: 10,
    lessonsPerDayPerInstructor: 4,
    lessonIncome: 54,
    instructorCostPercentage: -0.60,
    insuranceCostPerLesson: -4,
    googleMapsPerUserPerDay: -10,
    authenticationPerUserPerDay: -0.333333333,
    websiteCostPerDay: -40,
    databaseCostPerDay: -40,
    backendCostPerDay: -40,
    ticketsPerStudentPerWeek: 0.5,
    ticketsPerInstructorPerWeek: 1,
    avgHandlingTimeMinutes: 15,
    customerServiceHourlyCost: 20,
    accountingPerDay: -166.6666667,
    marketingPerDay: -1000,
    cellPhonePlanPerMonth: 70,
    healthPerDriverPerMonth: 500
  }
];

// Helper function to create a scenario with a name and description
export function createScenario(
  baseParams: DetailedFinancialParams,
  scenarioName: string,
  scenarioDescription: string,
  overrides: Partial<DetailedFinancialParams>
): DetailedFinancialResult {
  // Merge base parameters with overrides
  const params: DetailedFinancialParams = { ...baseParams, ...overrides };
  
  // Calculate financial metrics using the merged parameters
  return calculateDetailedFinancials(params, scenarioName, scenarioDescription);
}

// Helper function to calculate financial metrics based on parameters
export function calculateDetailedFinancials(
  params: DetailedFinancialParams,
  scenarioName: string = 'Default Scenario',
  scenarioDescription: string = 'Standard financial projection'
): DetailedFinancialResult {
  // Calculate registered students
  const registeredStudents = Math.round(params.totalPotentialStudents * (params.percentageRegisteredStudents / 100));
  
  // Calculate lessons per day (assuming 30 days in a month for simplicity)
  const lessonsPerDay = Math.round((registeredStudents * params.lessonsPerStudentPerMonth) / 30);
  
  // Calculate number of instructors needed based on lessons per day and instructor capacity
  const totalInstructors = Math.ceil(lessonsPerDay / params.lessonsPerDayPerInstructor);
  
  // Calculate instructor costs
  const instructorCostPerLesson = params.lessonIncome * params.instructorCostPercentage * -1; // Make positive for calculation
  const instructorCostPerDay = lessonsPerDay * instructorCostPerLesson * -1; // Make negative for cost
  
  // Calculate insurance cost per day
  const insuranceCostPerDay = lessonsPerDay * params.insuranceCostPerLesson;
  
  // Calculate technology costs per day
  // Users = registered students + instructors for Google Maps and Authentication
  const totalUsers = registeredStudents + totalInstructors;
  const googleMapsCostPerDay = totalUsers * params.googleMapsPerUserPerDay;
  const authenticationCostPerDay = totalUsers * params.authenticationPerUserPerDay;
  const websiteCostPerDay = params.websiteCostPerDay;
  const databaseCostPerDay = params.databaseCostPerDay;
  const backendCostPerDay = params.backendCostPerDay;
  const totalTechnologyCostPerDay = googleMapsCostPerDay + authenticationCostPerDay + 
                                   websiteCostPerDay + databaseCostPerDay + backendCostPerDay;
  
  // Calculate customer service cost using the formula:
  // ((Students × StudentTickets × HandlingTime) + (Instructors × InstructorTickets × HandlingTime)) / 60 × CostPerHour
  const studentTicketsPerDay = (registeredStudents * params.ticketsPerStudentPerWeek) / 7; // Convert weekly to daily
  const instructorTicketsPerDay = (totalInstructors * params.ticketsPerInstructorPerWeek) / 7; // Convert weekly to daily
  const totalTicketMinutesPerDay = (studentTicketsPerDay * params.avgHandlingTimeMinutes) + 
                                  (instructorTicketsPerDay * params.avgHandlingTimeMinutes);
  const customerServiceHoursPerDay = totalTicketMinutesPerDay / 60;
  const customerServiceCostPerDay = customerServiceHoursPerDay * params.customerServiceHourlyCost * -1; // Make negative for cost
  
  // Other operational costs per day
  const accountingPerDay = params.accountingPerDay;
  const marketingPerDay = params.marketingPerDay;
  
  // Calculate monthly costs
  const cellPhonePlanCostPerMonth = totalInstructors * params.cellPhonePlanPerMonth * -1; // Make negative for cost
  const healthCostPerMonth = totalInstructors * params.healthPerDriverPerMonth * -1; // Make negative for cost
  
  // Calculate yearly costs
  const healthCostPerYear = healthCostPerMonth * 12;
  const cellPhonePlanCostPerYear = cellPhonePlanCostPerMonth * 12;
  
  // Calculate revenue and costs
  const dailyRevenue = lessonsPerDay * params.lessonIncome;
  const dailyCosts = instructorCostPerDay + totalTechnologyCostPerDay + insuranceCostPerDay + 
                    customerServiceCostPerDay + accountingPerDay + marketingPerDay;
  
  // Calculate net income
  const netIncomePerDay = dailyRevenue + dailyCosts; // dailyCosts is already negative
  const netIncomePerMonth = netIncomePerDay * 30; // Assuming 30 days in a month
  const netIncomePerYear = netIncomePerDay * 365; // Assuming 365 days in a year
  
  // Calculate net after health and cell phone costs
  const netAfterHealthPerYear = netIncomePerYear + healthCostPerYear; // healthCostPerYear is already negative
  const netAfterCellPhonePerYear = netAfterHealthPerYear + cellPhonePlanCostPerYear; // cellPhonePlanCostPerYear is already negative
  
  // Calculate profit margin
  const profitMargin = (netAfterCellPhonePerYear / (dailyRevenue * 365)) * 100;
  
  // Determine if the scenario is profitable
  const isProfit = netAfterCellPhonePerYear > 0;
  
  return {
    // Student and lesson metrics
    registeredStudents,
    totalInstructors,
    lessonsPerDay,
    lessonIncome: params.lessonIncome,
    
    // Daily instructor costs
    instructorCostPerLesson,
    instructorCostPerDay,
    
    // Daily technology costs
    googleMapsCostPerDay,
    authenticationCostPerDay,
    websiteCostPerDay,
    databaseCostPerDay,
    backendCostPerDay,
    totalTechnologyCostPerDay,
    
    // Daily operational costs
    insuranceCostPerDay,
    customerServiceCostPerDay,
    accountingPerDay,
    marketingPerDay,
    
    // Monthly and yearly costs
    healthCostPerMonth,
    cellPhonePlanCostPerMonth,
    healthCostPerYear,
    cellPhonePlanCostPerYear,
    
    // Revenue and profit metrics
    dailyRevenue,
    dailyCosts,
    netIncomePerDay,
    netIncomePerMonth,
    netIncomePerYear,
    netAfterHealthPerYear,
    netAfterCellPhonePerYear,
    profitMargin,
    
    // Scenario metrics
    scenarioName,
    scenarioDescription,
    isProfit
  };
}

// Generate a set of scenarios with varying student percentages
export function generateScenariosByStudentPercentage(
  baseParams: DetailedFinancialParams,
  percentages: number[] = [5, 10, 15, 20, 25, 30, 40, 50]
): DetailedFinancialResult[] {
  return percentages.map(percentage => {
    // Create a new scenario with just the percentage changed
    // All other calculations will be handled by the calculateDetailedFinancials function
    const scaledParams: DetailedFinancialParams = {
      ...baseParams,
      percentageRegisteredStudents: percentage
    };
    
    return calculateDetailedFinancials(
      scaledParams,
      `${percentage}% Student Registration`,
      `Financial scenario with ${percentage}% of potential students registered`
    );
  });
}

// Helper function to format currency values
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

// Helper function to format large numbers
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}
