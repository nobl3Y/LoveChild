'use client';

import React from 'react';
import { X, Printer, ShieldAlert, FileText, CheckCircle, Calendar, AlertTriangle } from 'lucide-react';
import { PatientPersona } from '@/lib/types';
import { walrusService } from '@/lib/walrusClient';

interface ClinicalBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientPersona;
}

export const ClinicalBriefingModal: React.FC<ClinicalBriefingModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  if (!isOpen) return null;

  const report = walrusService.generateClinicalReport(patient);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden print:border-none print:shadow-none print:max-w-none">
        
        {/* Modal Action Bar (hidden in print) */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Antenatal Clinical Briefing (OB-GYN Intake)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Clinical Document */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 font-sans print:p-6">
          
          {/* Header & Hospital Scribe Banner */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-rose-700">
                Clinical Incident Report
              </span>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                NatalRecall Antenatal Briefing
              </h1>
              <p className="text-xs text-slate-500 mt-1 tracking-tight leading-relaxed">
                Complete Health Summary • Giving the doctor the full picture so nothing gets missed
              </p>
            </div>
            <div className="text-right font-mono text-xs text-slate-500">
              <div>Date: <span className="text-slate-800 font-semibold">{report.generatedAt}</span></div>
              <div>Source: <span className="text-rose-900 font-bold">{report.totalBlobsAnalyzed} Verified Records</span></div>
            </div>
          </div>

          {/* Patient Obstetric Demographics Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">Patient Name</span>
              <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">Gestational Age</span>
              <span className="font-bold text-slate-900 text-sm">Week {patient.gestationalWeek} ({patient.trimester})</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">Obstetric Formula</span>
              <span className="font-semibold text-slate-800">{patient.gravidaPara}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">Est. Due Date (EDD)</span>
              <span className="font-semibold text-slate-800">{patient.estimatedDueDate}</span>
            </div>
          </div>

          {/* Critical Triage & Surveillance Alerts */}
          {report.surveillanceAlerts.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-xs text-rose-950 space-y-2">
              <div className="flex items-center font-bold text-rose-800 text-sm">
                <AlertTriangle className="w-4 h-4 mr-2 text-rose-600 animate-pulse" />
                TRIAGE SURVEILLANCE FLAGS (FOR ATTENDING PHYSICIAN)
              </div>
              <ul className="list-disc pl-5 space-y-1 font-medium leading-relaxed">
                {report.surveillanceAlerts.map((alert, i) => (
                  <li key={i}>{alert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 1: Longitudinal Symptom Timeline */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2.5 flex items-center">
              <span className="w-2 h-2 rounded-full bg-rose-700 mr-2"></span>
              1. Chronological Symptom & Milestone Timeline ({report.totalBlobsAnalyzed} Recorded Sessions)
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2 px-3 w-20">Timeline</th>
                    <th className="py-2 px-3">Clinical Narrative & Reported Symptoms</th>
                    <th className="py-2 px-3 w-28 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.subjectiveTimeline.map((item, index) => (
                    <tr
                      key={index}
                      className={item.isRedFlag ? 'bg-rose-50/40 font-medium' : 'hover:bg-slate-50/50'}
                    >
                      <td className="py-2 px-3 font-mono font-semibold text-slate-700 whitespace-nowrap">
                        Week {item.week}
                        <span className="block text-[10px] text-slate-400 font-normal">{item.date}</span>
                      </td>
                      <td className="py-2 px-3 text-slate-800 leading-relaxed">
                        {item.notes}
                      </td>
                      <td className="py-2 px-3 text-right">
                        {item.isRedFlag ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            Pre-Eclampsia Risk
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                            Logged
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Fetal Wellness & Objective Baseline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                Fetal Movement & Kick Trends
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {report.fetalMovementAssessment}
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                Maternal Baseline Hemodynamics
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Early pregnancy BP baseline documented at 110/72 mmHg. No chronic hypertension prior to gestation reported.
              </p>
            </div>
          </div>

          {/* Section 3: Prepared Physician Discussion Checklist */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-rose-600 mr-2"></span>
              2. Target Discussion Points for Attending OB-GYN / Midwife
            </h3>
            <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1 leading-relaxed">
              {report.doctorDiscussionPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Footer & Disclaimer */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-400 text-center leading-relaxed">
            {report.disclaimer}
          </div>

        </div>

      </div>
    </div>
  );
};
