"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  ProfitCalculationParams, 
  defaultProfitParams, 
  calculateProfit 
} from '@/data/profitCalculationModel';
import { 
  populationData, 
  getUniqueLocations, 
  getUniqueGenders, 
  getUniqueAgeGroups,
  getFilteredPopulationCount,
  defaultLocation,
  defaultGender,
  defaultAgeGroup
} from '@/data/populationData';
import dynamic from 'next/dynamic';

// Dynamically import chart components to avoid SSR issues
const BarChart = dynamic(() => import('@/components/charts/BarChart'), { ssr: false });
const PieChart = dynamic(() => import('@/components/charts/PieChart'), { ssr: false });

const PopulationProfitCalculator = () => {
  const [params, setParams] = useState<ProfitCalculationParams>(defaultProfitParams);
  const [selectedLocation, setSelectedLocation] = useState<string>(defaultLocation);
  const [selectedGender, setSelectedGender] = useState<string>(defaultGender);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>(defaultAgeGroup);
  const [totalPotentialStudents, setTotalPotentialStudents] = useState<number>(0);
  const [profitResult, setProfitResult] = useState<ReturnType<typeof calculateProfit> | null>(null);
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Get unique filter values
  const locations = getUniqueLocations();
  const genders = getUniqueGenders();
  const ageGroups = getUniqueAgeGroups();

  // Helper function to format large numbers
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(Math.round(num));
  };

  // Helper function to format currency
  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  // Update potential students when filters change
  useEffect(() => {
    const count = getFilteredPopulationCount(selectedLocation, selectedGender, selectedAgeGroup);
    setTotalPotentialStudents(count);
  }, [selectedLocation, selectedGender, selectedAgeGroup]);

  // Calculate profit when parameters change
  useEffect(() => {
    if (totalPotentialStudents > 0) {
      const result = calculateProfit(params, totalPotentialStudents);
      setProfitResult(result);
    }
  }, [params, totalPotentialStudents]);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle parameter changes
  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  return (
    <DashboardLayout currentPage="population-profit-calculator">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profit Estimator (Canada Population)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Parameters Form */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Parameters</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Genders</option>
              <option value="Men+">Men</option>
              <option value="Women+">Women</option>
              <option value="Total - gender">Total</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age Group
            </label>
            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Total">All Age Groups</option>
              {ageGroups.filter(age => age !== "Total").map((ageGroup) => (
                <option key={ageGroup} value={ageGroup}>
                  {ageGroup}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Potential Students
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-medium">
              {formatNumber(totalPotentialStudents)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on population data filters</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              % Registered Students
            </label>
            <input
              type="number"
              name="percentageRegisteredStudents"
              value={params.percentageRegisteredStudents}
              onChange={handleParamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="100"
              step="1"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lessons/Student/Month
            </label>
            <input
              type="number"
              name="lessonsPerStudentPerMonth"
              value={params.lessonsPerStudentPerMonth}
              onChange={handleParamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              step="1"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lessons/Day/Instructor
            </label>
            <input
              type="number"
              name="lessonsPerDayPerInstructor"
              value={params.lessonsPerDayPerInstructor}
              onChange={handleParamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              step="1"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Income ($)
            </label>
            <input
              type="number"
              name="lessonIncome"
              value={params.lessonIncome}
              onChange={handleParamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="1"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor Cost (%)
            </label>
            <input
              type="number"
              name="instructorCostPercentage"
              value={params.instructorCostPercentage}
              onChange={handleParamChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              step="1"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructor Cost ($)
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
              ${(params.lessonIncome * (params.instructorCostPercentage / 100)).toFixed(2)}
              <span className="text-xs text-gray-500 ml-2">(lesson income × instructor %)</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-6">Costs & Additional Revenue</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Insurance Per Lesson */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance/Lesson ($)
              </label>
              <input
                type="number"
                name="insurancePerLesson"
                value={params.insurancePerLesson}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Google Maps Per User Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maps/User/Day ($)
              </label>
              <input
                type="number"
                name="googleMapsPerUserPerDay"
                value={params.googleMapsPerUserPerDay}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Authentication Per User Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Auth/User/Day ($)
              </label>
              <input
                type="number"
                name="authenticationPerUserPerDay"
                value={params.authenticationPerUserPerDay}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Website Cost Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website/Day ($)
              </label>
              <input
                type="number"
                name="websiteCostPerDay"
                value={params.websiteCostPerDay}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Postgres Cost Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Database/Day ($)
              </label>
              <input
                type="number"
                name="postgresCostPerDay"
                value={params.postgresCostPerDay}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Customer Service Cost Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Service/Day ($)
              </label>
              <input
                type="number"
                name="customerServiceCostPerDay"
                value={params.customerServiceCostPerDay}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Accounting Cost Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Accounting/Day ($)
              </label>
              <input
                type="number"
                name="accountingCostPerDay"
                value={params.accountingCostPerDay}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Marketing Cost Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marketing/Day ($)
              </label>
              <input
                type="number"
                name="marketingCostPerDay"
                value={params.marketingCostPerDay}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Cellphone Plan Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cellphone Plan ($)
              </label>
              <input
                type="number"
                name="cellphonePlanCost"
                value={params.cellphonePlanCost}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            
            {/* Health Per Driver Per Month */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Health/Driver/Month ($)
              </label>
              <input
                type="number"
                name="healthPerDriverPerMonth"
                value={params.healthPerDriverPerMonth}
                onChange={handleParamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>
        
        {/* Results and Charts Section */}
        {profitResult && isClient && (
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Profit Calculator Results</h2>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-blue-800">Total Revenue</h3>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(profitResult.totalRevenue)}</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-red-800">Total Costs</h3>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(profitResult.totalCosts)}</p>
              </div>
              
              <div className={`${profitResult.netProfit >= 0 ? 'bg-green-50' : 'bg-red-50'} p-4 rounded-md shadow-sm`}>
                <h3 className={`text-lg font-semibold ${profitResult.netProfit >= 0 ? 'text-green-800' : 'text-red-800'}`}>Net Profit</h3>
                <p className={`text-2xl font-bold ${profitResult.netProfit >= 0 ? 'text-green-900' : 'text-red-900'}`}>{formatCurrency(profitResult.netProfit)}</p>
              </div>
              
              <div className={`${profitResult.profitMargin >= 0 ? 'bg-purple-50' : 'bg-red-50'} p-4 rounded-md shadow-sm`}>
                <h3 className={`text-lg font-semibold ${profitResult.profitMargin >= 0 ? 'text-purple-800' : 'text-red-800'}`}>Profit Margin</h3>
                <p className={`text-2xl font-bold ${profitResult.profitMargin >= 0 ? 'text-purple-900' : 'text-red-900'}`}>{profitResult.profitMargin.toFixed(2)}%</p>
              </div>
            </div>
            
            {/* Information Section */}
            <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">How Calculations Work</h3>
              <div className="text-sm text-blue-700 space-y-2">
                <p><strong>Revenue:</strong> Calculated as (Registered Students × Lessons per Month × Lesson Income)</p>
                <p><strong>Registered Students:</strong> Calculated as Total Potential Students × (Percentage Registered Students ÷ 100)</p>
                <p><strong>Instructor Costs:</strong> Calculated as (Lesson Income × Instructor Percentage) × Total Lessons</p>
                <p><strong>Instructors Needed:</strong> Calculated as Total Lessons per Month ÷ (Lessons per Day per Instructor × 22 working days)</p>
                <p><strong>Tech Infrastructure Costs:</strong> Sum of Google Maps, Authentication, Website, and Database costs per month</p>
                <p><strong>Operational Costs:</strong> Sum of Operation costs, Accounting costs, Marketing costs, Health Benefits, and Cellphone Plan costs</p>
                <p><strong>Net Profit:</strong> Total Revenue - Total Costs</p>
                <p><strong>Profit Margin:</strong> (Net Profit ÷ Total Revenue) × 100%</p>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Profit by Student Percentage Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Profit by Student Registration %</h3>
                <div className="h-64 border border-gray-100 rounded-md p-2">
                  {profitResult.profitByStudentPercentage && (
                    <BarChart 
                      labels={profitResult.profitByStudentPercentage.map((item) => `${item.percentage}%`)}
                      datasets={[
                        {
                          label: 'Monthly Profit',
                          data: profitResult.profitByStudentPercentage.map((item) => item.profit),
                          backgroundColor: profitResult.profitByStudentPercentage.map((item) => 
                            item.profit >= 0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)'
                          )
                        }
                      ]}
                    />
                  )}
                </div>
              </div>
              
              {/* Cost Breakdown Pie Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Cost Breakdown</h3>
                <div className="h-64 border border-gray-100 rounded-md p-2">
                  <PieChart 
                    labels={[
                      'Instructor Costs', 
                      'Insurance', 
                      'Tech Infrastructure', 
                      'Operational Costs'
                    ]}
                    data={[
                      Math.abs(profitResult.breakdownByCategory.instructorCosts),
                      Math.abs(profitResult.breakdownByCategory.insuranceCosts),
                      Math.abs(profitResult.breakdownByCategory.techInfrastructureCosts),
                      Math.abs(profitResult.breakdownByCategory.operationalCosts)
                    ]}
                    backgroundColor={[
                      'rgba(59, 130, 246, 0.6)', 
                      'rgba(16, 185, 129, 0.6)',
                      'rgba(245, 158, 11, 0.6)',
                      'rgba(239, 68, 68, 0.6)'
                    ]}
                  />
                </div>
              </div>
            </div>
            
            {/* Detailed Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Total Potential Students:</span>
                    <span className="font-semibold">{formatNumber(totalPotentialStudents)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Registered Students:</span>
                    <span className="font-semibold">{formatNumber(totalPotentialStudents * params.percentageRegisteredStudents / 100)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Total Lessons per Month:</span>
                    <span className="font-semibold">{formatNumber(totalPotentialStudents * params.percentageRegisteredStudents / 100 * params.lessonsPerStudentPerMonth)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Instructors Needed:</span>
                    <span className="font-semibold">{Math.ceil((totalPotentialStudents * params.percentageRegisteredStudents / 100 * params.lessonsPerStudentPerMonth) / (params.lessonsPerDayPerInstructor * 22))}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-4">Financial Breakdown</h3>
                <table className="min-w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 text-gray-700">Lesson Revenue</td>
                      <td className="py-2 text-right font-medium text-green-600">
                        {formatCurrency(profitResult.breakdownByCategory.lessonRevenue)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700">Additional Revenue</td>
                      <td className="py-2 text-right font-medium text-green-600">
                        {formatCurrency(profitResult.breakdownByCategory.additionalRevenue)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700">Instructor Costs</td>
                      <td className="py-2 text-right font-medium text-red-600">
                        -{formatCurrency(Math.abs(profitResult.breakdownByCategory.instructorCosts))}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700">Insurance Costs</td>
                      <td className="py-2 text-right font-medium text-red-600">
                        -{formatCurrency(Math.abs(profitResult.breakdownByCategory.insuranceCosts))}
                      </td>
                    </tr>
                     <tr>
                       <td className="py-2 text-gray-700">Tech Infrastructure</td>
                       <td className="py-2 text-right font-medium text-red-600">
                         -{formatCurrency(Math.abs(profitResult.breakdownByCategory.techInfrastructureCosts))}
                       </td>
                     </tr>
                     {/* Tech Infrastructure breakdown */}
                     <tr>
                       <td className="py-1 pl-6 text-sm text-gray-500">- Maps</td>
                       <td className="py-1 text-right text-sm text-red-600">-{formatCurrency(Math.abs(profitResult.techBreakdown.googleMaps))}</td>
                     </tr>
                     <tr>
                       <td className="py-1 pl-6 text-sm text-gray-500">- Authentication</td>
                       <td className="py-1 text-right text-sm text-red-600">-{formatCurrency(Math.abs(profitResult.techBreakdown.authentication))}</td>
                     </tr>
                     <tr>
                       <td className="py-1 pl-6 text-sm text-gray-500">- Website</td>
                       <td className="py-1 text-right text-sm text-red-600">-{formatCurrency(Math.abs(profitResult.techBreakdown.website))}</td>
                     </tr>
                     <tr>
                       <td className="py-1 pl-6 text-sm text-gray-500">- Database</td>
                       <td className="py-1 text-right text-sm text-red-600">-{formatCurrency(Math.abs(profitResult.techBreakdown.database))}</td>
                     </tr>
                     <tr>
                       <td className="py-2 text-gray-700">Operational Costs</td>
                       <td className="py-2 text-right font-medium text-red-600">
                         -{formatCurrency(Math.abs(profitResult.breakdownByCategory.operationalCosts))}
                       </td>
                     </tr>
                     {/* Operational breakdown */}
                     <tr>
                       <td className="py-1 pl-6 text-sm text-gray-500">- Customer Service</td>
                       <td className="py-1 text-right text-sm text-red-600">-{formatCurrency(Math.abs(profitResult.operationalBreakdown.customerService))}</td>
                     </tr>
                     <tr>
                       <td className="py-1 pl-6 text-sm text-gray-500">- Accounting</td>
                       <td className="py-1 text-right text-sm text-red-600">-{formatCurrency(Math.abs(profitResult.operationalBreakdown.accounting))}</td>
                     </tr>
                     <tr>
                       <td className="py-1 pl-6 text-sm text-gray-500">- Marketing</td>
                       <td className="py-1 text-right text-sm text-red-600">-{formatCurrency(Math.abs(profitResult.operationalBreakdown.marketing))}</td>
                     </tr>
                     <tr>
                       <td className="py-1 pl-6 text-sm text-gray-500">- Health Benefits</td>
                       <td className="py-1 text-right text-sm text-red-600">-{formatCurrency(Math.abs(profitResult.operationalBreakdown.healthBenefits))}</td>
                     </tr>
                     <tr>
                       <td className="py-1 pl-6 text-sm text-gray-500">- Cellphone Plan</td>
                       <td className="py-1 text-right text-sm text-red-600">-{formatCurrency(Math.abs(profitResult.operationalBreakdown.cellphonePlan))}</td>
                     </tr>
                    <tr className="border-t border-gray-300">
                      <td className="py-2 font-bold text-gray-800">Net Profit</td>
                      <td className={`py-2 text-right font-bold ${profitResult.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(profitResult.netProfit)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PopulationProfitCalculator;
