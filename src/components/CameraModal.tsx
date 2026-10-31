'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null);
      setCameraError(null);
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access webcam. Please verify camera permissions or test with our curated sample personas.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const triggerCountdown = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          takeSnapshot();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally for natural mirror feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-rose-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-rose-950/50">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-rose-400" />
            <h3 className="font-serif text-lg font-bold text-slate-100">Live AI Clinical Facial Scan</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Camera / Preview Viewport */}
        <div className="relative aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
          {cameraError ? (
            <div className="p-8 text-center max-w-md">
              <AlertCircle className="h-12 w-12 text-rose-400 mx-auto mb-3" />
              <p className="text-sm text-slate-300 font-medium mb-4">{cameraError}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Retry Camera
              </button>
            </div>
          ) : capturedImage ? (
            <img src={capturedImage} alt="Captured scan" className="w-full h-full object-cover" />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover -scale-x-100"
              />
              {/* Facial Alignment Oval Guide */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <div className="w-56 h-72 border-2 border-dashed border-rose-400/60 rounded-[50%] shadow-[0_0_30px_rgba(244,63,94,0.3)] animate-pulse-subtle flex items-center justify-center">
                  <div className="w-full text-center text-xs text-rose-200/80 font-mono tracking-wider drop-shadow-md">
                    Align Face Here
                  </div>
                </div>
                <p className="mt-4 text-xs font-mono text-slate-300 bg-slate-950/70 px-3 py-1 rounded-full border border-slate-700">
                  Ensure even lighting & neutral expression
                </p>
              </div>

              {/* Countdown overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center">
                  <span className="text-7xl font-bold font-serif text-rose-400 animate-ping">
                    {countdown}
                  </span>
                </div>
              )}
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
          {capturedImage ? (
            <>
              <button
                onClick={handleRetake}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retake</span>
              </button>
              <button
                onClick={handleConfirm}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Run Clinical Scan</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!!cameraError || countdown !== null}
                onClick={triggerCountdown}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all"
              >
                <Camera className="h-4 w-4" />
                <span>Capture Scan</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
