'use client';

import { useState } from 'react';
import { CASE_STUDIES } from '@/data/caseStudies';
import { CaseStudy } from '@/types';

export default function CaseStudiesSection() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Case Studies</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="text-xl font-bold text-gray-900">{study.clientName}</div>
              <span className="inline-block self-start bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {study.industry}
              </span>
              <p className="text-sm text-gray-600 flex-1">
                {study.challenge.slice(0, 100)}…
              </p>
              <button
                onClick={() => setSelectedStudy(study)}
                aria-label={`Xem chi tiết ${study.clientName}`}
                className="mt-auto text-sm font-medium text-blue-600 hover:text-blue-800 underline text-left"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedStudy(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedStudy.clientName}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStudy(null)}
              aria-label="Đóng"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none"
            >
              ✕
            </button>

            <div className="mb-2 text-2xl font-bold text-gray-900">{selectedStudy.clientName}</div>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full mb-6">
              {selectedStudy.industry}
            </span>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Thách thức</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedStudy.challenge}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Giải pháp</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedStudy.solution}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Kết quả</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedStudy.result}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
