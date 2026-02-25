'use client';

import React from 'react';

interface TableColumn {
  key: string;
  header: string;
  highlight?: boolean; // Use copper accent for this column
  className?: string;
}

interface BrandTableProps {
  columns: TableColumn[];
  data: Record<string, React.ReactNode>[];
  caption?: string;
  className?: string;
}

/**
 * Brand-compliant table component
 * - Teal gradient header
 * - Copper accents for highlighted columns
 * - Sand beige alternating rows
 * - Mobile: stacks vertically as cards
 */
export default function BrandTable({ columns, data, caption, className = '' }: BrandTableProps) {
  return (
    <div className={`w-full ${className}`}>
      {caption && (
        <p className="text-sm text-[#1A2332]/70 mb-3 font-medium">{caption}</p>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-[#F0E7E0] shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-[#0E5A61] to-[#197A83]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-sm font-bold text-white ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`
                  border-b border-[#F0E7E0] last:border-b-0
                  ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#F0E7E0]/30'}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`
                      px-4 py-3 text-sm
                      ${col.highlight ? 'text-[#D97D42] font-semibold' : 'text-[#1A2332]'}
                      ${col.className || ''}
                    `}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack */}
      <div className="md:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-white rounded-lg border border-[#F0E7E0] shadow-sm overflow-hidden"
          >
            {/* Card header - first column value */}
            <div className="bg-gradient-to-r from-[#0E5A61] to-[#197A83] px-4 py-2">
              <span className="text-white font-bold text-sm">
                {row[columns[0].key]}
              </span>
            </div>

            {/* Card body - remaining columns */}
            <div className="p-4 space-y-2">
              {columns.slice(1).map((col) => (
                <div key={col.key} className="flex justify-between items-start">
                  <span className="text-xs text-[#1A2332]/60 font-medium uppercase tracking-wide">
                    {col.header}
                  </span>
                  <span
                    className={`
                      text-sm text-right max-w-[60%]
                      ${col.highlight ? 'text-[#D97D42] font-semibold' : 'text-[#1A2332]'}
                    `}
                  >
                    {row[col.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
