"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PersonnelCostTable from '@/components/finance/PersonnelCostTable';

const FinancialModelPage = () => {
  return (
    <DashboardLayout currentPage="financial-model">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Personnel-based Financial Model</h1>
      <p className="text-gray-600 mb-6">
        Adjust the parameters below to dynamically recalculate costs for N = 10,000, 50,000, and 100,000 students.
      </p>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Parameters & Descriptions</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li><strong>N</strong> – Total number of students/customers enrolled in the platform.</li>
          <li><strong>L</strong> – Average number of lessons taken per student.</li>
          <li><strong>LD</strong> – Maximum lessons taught by an instructor per day.</li>
          <li><strong>D_work</strong> – Total working days per instructor per year (e.g., 250).</li>
          <li><strong>commission_per_student</strong> – Payment to instructors per student, based on a per-student commission rate.</li>
          <li><strong>payment_cost_factor</strong> – Average cost per customer for payment processing (e.g., Stripe fees).</li>
          <li><strong>msg_per_lesson</strong> – Average number of SMS or push notifications sent per lesson.</li>
          <li><strong>cost_per_msg</strong> – Unit cost of sending an SMS or notification.</li>
          <li><strong>Tech_base</strong> – Fixed annual technology infrastructure cost (e.g., base hosting, servers, licenses).</li>
          <li><strong>tech_per_customer</strong> – Variable technology cost per customer (e.g., additional hosting/API usage).</li>
          <li><strong>support_customers_per_staff</strong> – Number of customers supported by each call center or support agent.</li>
          <li><strong>support_salary</strong> – Annual salary per customer support agent.</li>
          <li><strong>Exec_base / Exec_k</strong> – Base cost of executive/admin salaries and scaling factor as customer count grows.</li>
          <li><strong>Finance_base / Finance_k</strong> – Base cost of finance/accounting salaries and scaling factor.</li>
          <li><strong>Marketing_base / Marketing_k</strong> – Base cost of marketing team salaries and scaling factor.</li>
          <li><strong>Operations_base / Operations_k</strong> – Base cost of non-call center operations salaries and scaling factor.</li>
          <li><strong>Tech_fixed_base / Tech_k</strong> – Base cost of tech/development salaries and scaling factor.</li>
          <li><strong>Office_base / Office_k</strong> – Base cost of office/legal/miscellaneous overhead and scaling factor.</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Cost Categories & Descriptions</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li><strong>Instructors Needed</strong> – The number of instructors required to deliver all lessons based on load capacity.</li>
          <li><strong>Instructor Commission</strong> – Total commission payout to instructors based on the per-student rate.</li>
          <li><strong>Payment Processing</strong> – Cost of processing student payments (e.g., Stripe 2.9% + $0.30).</li>
          <li><strong>SMS / Notifications</strong> – Cost of sending notifications to students for lessons, reminders, etc.</li>
          <li><strong>Technology (Variable)</strong> – Hosting, APIs, and other tech costs that scale with customer count.</li>
          <li><strong>Customer Support</strong> – Salaries for call center/support staff, scaled by customer volume.</li>
          <li><strong>Executive/Admin Salaries</strong> – Leadership and admin team costs, scaling moderately with size.</li>
          <li><strong>Finance/Accounting Salaries</strong> – Financial and accounting personnel salaries.</li>
          <li><strong>Marketing Team Salaries</strong> – Marketing department salaries, scaling with growth.</li>
          <li><strong>Operations Salaries</strong> – Non-customer-service operational staff salaries.</li>
          <li><strong>Tech/Development Salaries</strong> – Software development and IT team salaries.</li>
          <li><strong>Office/Legal/Misc</strong> – General office, legal, and miscellaneous expenses.</li>
        </ul>
      </div>

      <PersonnelCostTable />
    </DashboardLayout>
  );
};

export default FinancialModelPage;
