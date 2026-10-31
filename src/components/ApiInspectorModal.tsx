'use client';

import React, { useState } from 'react';
import { X, Code, Key, Copy, Check, Terminal, ExternalLink, ShieldAlert } from 'lucide-react';

interface ApiInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (newKey: string) => void;
  lastTelemetry: {
    endpoint: string;
    method: string;
    status: number;
    latencyMs: number;
    requestBody: any;
    responseBody: any;
  } | null;
}

export const ApiInspectorModal: React.FC<ApiInspectorModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  lastTelemetry,
}) => {
  const [tempKey, setTempKey] = useState(apiKey);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'keys'>('telemetry');

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveApiKey(tempKey.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <Terminal className="h-4 w-4 text-rose-400" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-100">
                YouCam API Telemetry & Developer Console
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Inspect raw S2S payloads, latency & configure live credentials
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 space-x-4">
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'telemetry'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Request Telemetry
          </button>
          <button
            onClick={() => setActiveTab('keys')}
            className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'keys'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            API Credentials & Settings
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'telemetry' ? (
            lastTelemetry ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-rose-400">{lastTelemetry.method}</span>
                    <span className="text-slate-300">{lastTelemetry.endpoint}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`font-bold ${lastTelemetry.status === 200 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      HTTP {lastTelemetry.status}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{lastTelemetry.latencyMs}ms</span>
                  </div>
                </div>

                {/* Request Payload */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>Sent Payload</span>
                    <button
                      onClick={() => handleCopy(JSON.stringify(lastTelemetry.requestBody, null, 2))}
                      className="flex items-center space-x-1 hover:text-slate-200"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
                    {JSON.stringify(lastTelemetry.requestBody, null, 2)}
                  </pre>
                </div>

                {/* Response Payload */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>Parsed YouCam Response</span>
                    <button
                      onClick={() => handleCopy(JSON.stringify(lastTelemetry.responseBody, null, 2))}
                      className="flex items-center space-x-1 hover:text-slate-200"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-56 leading-relaxed">
                    {JSON.stringify(lastTelemetry.responseBody, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 font-mono text-xs">
                Run an analysis or virtual try-on above to inspect live request & response telemetry.
              </div>
            )
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  YouCam API Bearer Key Override
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    placeholder="Enter your YouCam API Key (optional)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Leave blank to use our automatic zero-friction Demo Mode. If provided, requests will hit YouCam’s live production servers directly via secure server-side proxying.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-slate-200">How to get a YouCam Key:</div>
                <p className="text-slate-400 leading-relaxed">
                  Register at <a href="https://docs.perfectcorp.com/" target="_blank" rel="noreferrer" className="text-rose-400 underline inline-flex items-center">Perfect Corp Developer Portal <ExternalLink className="h-3 w-3 ml-0.5" /></a> to obtain free trial units for the Hackathon.
                </p>
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
