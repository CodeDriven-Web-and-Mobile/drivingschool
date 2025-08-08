"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  ProfitCalculationParams, 
  defaultProfitParams, 
  calculateProfit 
} from '@/data/profitCalculationModel';
import { registrationData } from '@/data/registrationData';
import dynamic from 'next/dynamic';

// Dynamically import chart components to avoid SSR issues
const BarChart = dynamic(() => import('@/components/charts/BarChart'), { ssr: false });
const PieChart = dynamic(() => import('@/components/charts/PieChart'), { ssr: false });

const ProfitCalculator = () => {
  const [params, setParams] = useState<ProfitCalculationParams>(defaultProfitParams);
  const [totalPotentialStudents, setTotalPotentialStudents] = useState(10706382); // Default to total from registration data
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("Total");
  const [selectedRegistrationType, setSelectedRegistrationType] = useState<string>("totalTotal");
  const [profitResult, setProfitResult] = useState<ReturnType<typeof calculateProfit> | null>(null);
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);

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

  // Calculate profit when parameters change
  useEffect(() => {
    const result = calculateProfit(params, totalPotentialStudents);
    setProfitResult(result);
  }, [params, totalPotentialStudents]);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  // Total students is now set based on registration data selection
  
  // Handle age group selection change
  const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAgeGroup = e.target.value;
    setSelectedAgeGroup(newAgeGroup);
    
    // Find the selected data and update total potential students
    const selectedData = registrationData.find(data => data.ageGroup === newAgeGroup);
    if (selectedData) {
      // Use the appropriate registration type count
      if (selectedRegistrationType === 'regularTotal') {
        setTotalPotentialStudents(selectedData.regularTotal);
      } else if (selectedRegistrationType === 'noviceTotal') {
        setTotalPotentialStudents(selectedData.noviceTotal);
      } else {
        setTotalPotentialStudents(selectedData.totalTotal);
      }
    }
  };
  
  // Handle registration type selection change
  const handleRegistrationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setSelectedRegistrationType(newType);
    
    // Find the selected data and update total potential students
    const selectedData = registrationData.find(data => data.ageGroup === selectedAgeGroup);
    if (selectedData) {
      if (newType === 'regularTotal') {
        setTotalPotentialStudents(selectedData.regularTotal);
      } else if (newType === 'noviceTotal') {
        setTotalPotentialStudents(selectedData.noviceTotal);
      } else {
        setTotalPotentialStudents(selectedData.totalTotal);
      }
    }
  };

  return (
    <DashboardLayout currentPage="profit-calculator">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profit Estimation Calculator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Parameters Form */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Parameters</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age Group
            </label>
            <select
              value={selectedAgeGroup}
              onChange={handleAgeGroupChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {registrationData.map((data) => (
                <option key={data.ageGroup} value={data.ageGroup}>
                  {data.ageGroup === 'Total' ? 'All Ages' : data.ageGroup}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              License Type
            </label>
            <select
              value={selectedRegistrationType}
              onChange={handleRegistrationTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="totalTotal">All Licenses</option>
              <option value="regularTotal">Regular Licenses</option>
              <option value="noviceTotal">Novice Licenses</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Potential Students
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-medium">
              {formatNumber(totalPotentialStudents)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on official registration data</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              % Registered Students
            </label>
            <input
              type="number"
              name="percentageRegisteredStudents"
              value={params.percentageRegisteredStudents}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance/Lesson ($)
              </label>
              <input
                type="number"
                name="insurancePerLesson"
                value={params.insurancePerLesson}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maps/User/Day ($)
              </label>
              <input
                type="number"
                name="googleMapsPerUserPerDay"
                value={params.googleMapsPerUserPerDay}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Auth/User/Day ($)
              </label>
              <input
                type="number"
                name="authenticationPerUserPerDay"
                value={params.authenticationPerUserPerDay}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website/Day ($)
              </label>
              <input
                type="number"
                name="websiteCostPerDay"
                value={params.websiteCostPerDay}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postgres/Day ($)
              </label>
              <input
                type="number"
                name="postgresCostPerDay"
                value={params.postgresCostPerDay}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Service/Day ($)
              </label>
              <input
                type="number"
                name="customerServiceCostPerDay"
                value={params.customerServiceCostPerDay}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Accounting/Day ($)
              </label>
              <input
                type="number"
                name="accountingCostPerDay"
                value={params.accountingCostPerDay}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marketing/Day ($)
              </label>
              <input
                type="number"
                name="marketingCostPerDay"
                value={params.marketingCostPerDay}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cellphone Plan ($)
              </label>
              <input
                type="number"
                name="cellphonePlanCost"
                value={params.cellphonePlanCost}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Health/Driver/Month ($)
              </label>
              <input
                type="number"
                name="healthPerDriverPerMonth"
                value={params.healthPerDriverPerMonth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Profit Estimation Results</h2>
          
          {profitResult && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${profitResult.netProfit >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  <h3 className="text-lg font-semibold text-gray-700">Monthly Profit</h3>
                  <p className={`text-2xl font-bold ${profitResult.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(profitResult.netProfit)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Margin: {profitResult.profitMargin.toFixed(1)}%
                  </p>
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700">Monthly Revenue</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(profitResult.totalRevenue)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Registered Students: {formatNumber(totalPotentialStudents * (params.percentageRegisteredStudents / 100))}
                  </p>
                </div>
                
                <div className="bg-orange-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700">Monthly Costs</h3>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(profitResult.totalCosts)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Instructors: {formatNumber(Math.ceil(
                      (totalPotentialStudents * (params.percentageRegisteredStudents / 100) * params.lessonsPerStudentPerMonth) / 
                      (params.lessonsPerDayPerInstructor * 22)
                    ))}
                  </p>
                </div>
              </div>
              
              {/* Profit by Student Percentage Chart */}
              {isClient && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Profit by Student Registration Percentage</h3>
                  <div className="h-64">
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
                  </div>
                </div>
              )}
              
              {/* Cost Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isClient && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Cost Breakdown</h3>
                    <div className="h-64">
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
                )}
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Detailed Breakdown</h3>
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
                      <tr>
                        <td className="py-2 text-gray-700">Operational Costs</td>
                        <td className="py-2 text-right font-medium text-red-600">
                          -{formatCurrency(Math.abs(profitResult.breakdownByCategory.operationalCosts))}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-2 font-bold text-gray-800">Net Profit</td>
                        <td className={`py-2 text-right font-bold ${profitResult.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(profitResult.netProfit)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfitCalculator;
