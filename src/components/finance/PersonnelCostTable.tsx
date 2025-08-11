"use client";

import React, { useMemo, useState } from "react";
import {
  PersonnelCostParams,
  defaultPersonnelParams,
  computePersonnelScenarioTable,
  computePersonnelCosts,
} from "@/data/personnelCostModel";

const currency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(n));

const numberFmt = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));

export default function PersonnelCostTable() {
  const [params, setParams] = useState<PersonnelCostParams>({ ...defaultPersonnelParams });
  
  // Fixed scenarios for table
  const Ns = [10000, 50000, 100000];
  const scenarios = useMemo(() => computePersonnelScenarioTable(params), [params]);

  // Build unified rows by category across scenarios using 10k as reference
  const categories = useMemo(() => {
    const base = computePersonnelCosts(Ns[0], params).categories;
    return base.map((row) => {
      const values = scenarios.map((s) => {
        const match = s.categories.find((c) => c.category === row.category);
        return match ? match.value : 0;
      });
      return { category: row.category, formula: row.formula, values };
    });
  }, [params, scenarios, Ns]);

  const totals = scenarios.map((s) => s.totalCost);
  const perStudent = scenarios.map((s) => s.costPerStudent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Personnel-based Cost Model</h2>

      {/* Parameters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs text-gray-600">L (lessons/student)</label>
          <input type="number" name="L" value={params.L} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">LD (lessons/instructor/day)</label>
          <input type="number" name="LD" value={params.LD} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">D_work (days/year)</label>
          <input type="number" name="D_work" value={params.D_work} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">commission_per_student ($)</label>
          <input type="number" name="commission_per_student" value={params.commission_per_student} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">payment_cost_factor ($/student)</label>
          <input type="number" step="0.1" name="payment_cost_factor" value={params.payment_cost_factor} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">msg_per_lesson</label>
          <input type="number" name="msg_per_lesson" value={params.msg_per_lesson} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">cost_per_msg ($)</label>
          <input type="number" step="0.01" name="cost_per_msg" value={params.cost_per_msg} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Tech_base ($)</label>
          <input type="number" name="Tech_base" value={params.Tech_base} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">tech_per_customer ($)</label>
          <input type="number" name="tech_per_customer" value={params.tech_per_customer} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">support_customers_per_staff</label>
          <input type="number" name="support_customers_per_staff" value={params.support_customers_per_staff} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">support_salary ($)</label>
          <input type="number" name="support_salary" value={params.support_salary} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Exec_base ($)</label>
          <input type="number" name="Exec_base" value={params.Exec_base} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Exec_k</label>
          <input type="number" step="0.01" name="Exec_k" value={params.Exec_k} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Finance_base ($)</label>
          <input type="number" name="Finance_base" value={params.Finance_base} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Finance_k</label>
          <input type="number" step="0.01" name="Finance_k" value={params.Finance_k} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Marketing_base ($)</label>
          <input type="number" name="Marketing_base" value={params.Marketing_base} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Marketing_k</label>
          <input type="number" step="0.01" name="Marketing_k" value={params.Marketing_k} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Operations_base ($)</label>
          <input type="number" name="Operations_base" value={params.Operations_base} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Operations_k</label>
          <input type="number" step="0.01" name="Operations_k" value={params.Operations_k} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Tech_fixed_base ($)</label>
          <input type="number" name="Tech_fixed_base" value={params.Tech_fixed_base} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Tech_k</label>
          <input type="number" step="0.01" name="Tech_k" value={params.Tech_k} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Office_base ($)</label>
          <input type="number" name="Office_base" value={params.Office_base} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Office_k</label>
          <input type="number" step="0.01" name="Office_k" value={params.Office_k} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Formula</th>
              <th className="py-2 pr-4">N = 10,000</th>
              <th className="py-2 pr-4">N = 50,000</th>
              <th className="py-2 pr-0">N = 100,000</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((row) => (
              <tr key={row.category} className="border-b">
                <td className="py-2 pr-4 whitespace-nowrap">{row.category}</td>
                <td className="py-2 pr-4 text-gray-600">{row.formula}</td>
                {row.values.map((v, i) => (
                  <td key={i} className="py-2 pr-4 text-right">
                    {row.category.includes("count") || row.category.includes("Lessons")
                      ? numberFmt(v)
                      : currency(v)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t-2">
              <td className="py-2 font-semibold">Total Cost</td>
              <td></td>
              {totals.map((t, i) => (
                <td key={i} className="py-2 pr-4 text-right font-semibold">{currency(t)}</td>
              ))}
            </tr>
            <tr className="border-b-0">
              <td className="py-2 font-semibold">Cost / Student</td>
              <td></td>
              {perStudent.map((c, i) => (
                <td key={i} className="py-2 pr-4 text-right font-semibold">{currency(c)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
