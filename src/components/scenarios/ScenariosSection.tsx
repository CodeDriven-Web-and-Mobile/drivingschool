import React from 'react';
import ScenarioCard from './ScenarioCard';
import { RegistrationData } from '@/data/registrationData';

interface ScenariosSectionProps {
  data: RegistrationData[];
}

const ScenariosSection: React.FC<ScenariosSectionProps> = ({ data }) => {
  // Helper function to format large numbers
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  // Helper function to calculate percentage
  const calculatePercentage = (part: number, total: number): string => {
    return ((part / total) * 100).toFixed(1) + '%';
  };

  // Get total data
  const totalData = data.find(item => item.ageGroup === 'Total');
  const totalStudents = totalData?.totalTotal || 0;
  const totalRegular = totalData?.regularTotal || 0;
  const totalNovice = totalData?.noviceTotal || 0;
  
  // Get data for specific age groups
  const youngDrivers = data.filter(item => 
    ['16-17', '18-20', '21-24'].includes(item.ageGroup)
  );
  
  const seniorDrivers = data.filter(item => 
    ['65-69', '70-79', '80-89', '90-99', 'OVER100'].includes(item.ageGroup)
  );
  
  // Calculate totals for specific groups
  const youngTotal = youngDrivers.reduce((sum, item) => sum + item.totalTotal, 0);
  const seniorTotal = seniorDrivers.reduce((sum, item) => sum + item.totalTotal, 0);
  
  // Calculate gender distributions
  const femaleTotal = totalData?.totalFemale || 0;
  const maleTotal = totalData?.totalMale || 0;
  const femalePercentage = calculatePercentage(femaleTotal, totalStudents);
  const malePercentage = calculatePercentage(maleTotal, totalStudents);

  // Calculate peak age group
  const peakAgeGroup = data
    .filter(item => item.ageGroup !== 'Total')
    .reduce((max, item) => 
      item.totalTotal > max.totalTotal ? item : max, 
      { ageGroup: '', totalTotal: 0 } as RegistrationData
    );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Registration Scenarios</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Scenario 1: Young Drivers */}
        <ScenarioCard
          title="Young Drivers Program"
          description="Targeting new drivers aged 16-24 with specialized training programs."
          stats={[
            { 
              label: 'Total Young Drivers', 
              value: formatNumber(youngTotal),
              change: calculatePercentage(youngTotal, totalStudents),
              trend: 'up' 
            },
            { 
              label: 'New Drivers', 
              value: formatNumber(youngDrivers.reduce((sum, item) => sum + item.noviceTotal, 0)),
              change: calculatePercentage(
                youngDrivers.reduce((sum, item) => sum + item.noviceTotal, 0),
                youngTotal
              ),
              trend: 'up' 
            }
          ]}
        />
        
        {/* Scenario 2: Senior Refresher Courses */}
        <ScenarioCard
          title="Senior Refresher Courses"
          description="Specialized refresher courses for drivers aged 65 and above."
          stats={[
            { 
              label: 'Total Senior Drivers', 
              value: formatNumber(seniorTotal),
              change: calculatePercentage(seniorTotal, totalStudents),
              trend: 'neutral' 
            },
            { 
              label: 'Regular Seniors', 
              value: formatNumber(seniorDrivers.reduce((sum, item) => sum + item.regularTotal, 0)),
              change: calculatePercentage(
                seniorDrivers.reduce((sum, item) => sum + item.regularTotal, 0),
                seniorTotal
              ),
              trend: 'up' 
            }
          ]}
        />
        
        {/* Scenario 3: Gender-Balanced Initiatives */}
        <ScenarioCard
          title="Gender-Balanced Initiatives"
          description="Programs designed to ensure equal opportunities for all genders."
          stats={[
            { 
              label: 'Female Drivers', 
              value: formatNumber(femaleTotal),
              change: femalePercentage,
              trend: femaleTotal >= maleTotal ? 'up' : 'neutral' 
            },
            { 
              label: 'Male Drivers', 
              value: formatNumber(maleTotal),
              change: malePercentage,
              trend: maleTotal >= femaleTotal ? 'up' : 'neutral' 
            }
          ]}
        />
        
        {/* Scenario 4: Peak Age Group Focus */}
        <ScenarioCard
          title="Peak Age Group Focus"
          description={`Specialized programs for the ${peakAgeGroup.ageGroup} age group, our largest demographic.`}
          stats={[
            { 
              label: 'Total Drivers', 
              value: formatNumber(peakAgeGroup.totalTotal),
              change: calculatePercentage(peakAgeGroup.totalTotal, totalStudents),
              trend: 'up' 
            },
            { 
              label: 'Regular vs Novice', 
              value: `${formatNumber(peakAgeGroup.regularTotal)} / ${formatNumber(peakAgeGroup.noviceTotal)}`,
              change: `${calculatePercentage(peakAgeGroup.regularTotal, peakAgeGroup.totalTotal)} regular`,
              trend: 'neutral' 
            }
          ]}
        />
        
        {/* Scenario 5: Novice Driver Focus */}
        <ScenarioCard
          title="Novice Driver Program"
          description="Comprehensive training program for all new drivers regardless of age."
          stats={[
            { 
              label: 'Total Novice Drivers', 
              value: formatNumber(totalNovice),
              change: calculatePercentage(totalNovice, totalStudents),
              trend: 'up' 
            },
            { 
              label: 'Female/Male Ratio', 
              value: `${formatNumber(totalData?.noviceFemale || 0)} / ${formatNumber(totalData?.noviceMale || 0)}`,
              change: calculatePercentage(totalData?.noviceFemale || 0, totalNovice),
              trend: 'neutral' 
            }
          ]}
        />
        
        {/* Scenario 6: Regular Driver Refreshers */}
        <ScenarioCard
          title="Regular Driver Refreshers"
          description="Refresher courses for experienced drivers to update their skills."
          stats={[
            { 
              label: 'Total Regular Drivers', 
              value: formatNumber(totalRegular),
              change: calculatePercentage(totalRegular, totalStudents),
              trend: 'up' 
            },
            { 
              label: 'Female/Male Ratio', 
              value: `${formatNumber(totalData?.regularFemale || 0)} / ${formatNumber(totalData?.regularMale || 0)}`,
              change: calculatePercentage(totalData?.regularFemale || 0, totalRegular),
              trend: 'neutral' 
            }
          ]}
        />
      </div>
    </div>
  );
};

export default ScenariosSection;
