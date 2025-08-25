
'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera as CameraIcon, Zap, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function CameraPage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support the camera API.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        // The alert below provides a better user experience, so the toast is not needed.
        // toast({
        //   variant: 'destructive',
        //   title: 'Camera Access Denied',
        //   description: 'Please enable camera permissions in your browser settings to use this feature.',
        // });
      }
    };

    getCameraPermission();
    
    return () => {
      // Stop camera stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  const handleCapture = () => {
    // Placeholder for capture logic
    toast({
        title: "Photo Captured!",
        description: "Your photo has been saved (placeholder).",
    });
  }

  return (
    <div className="relative flex flex-col h-screen bg-black text-white">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline />
      <div className="absolute inset-0 bg-black/20" />
      
      {hasCameraPermission === false && (
         <div className="absolute inset-0 flex items-center justify-center p-4 z-20">
            <Alert variant="destructive" className="bg-black/80 border-destructive/50 text-white">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                    ZikarX needs access to your camera. Please allow camera access in your browser settings and refresh the page.
                </AlertDescription>
            </Alert>
        </div>
      )}

      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white">
          <Zap />
        </Button>
      </header>

      <footer className="absolute bottom-0 left-0 right-0 p-8 flex justify-center items-center z-10">
        <div className="flex items-center gap-12">
            <Button variant="ghost" className="text-white hover:text-white/80">Gallery</Button>
            <Button 
                size="icon" 
                className="w-20 h-20 rounded-full border-4 border-white bg-transparent hover:bg-white/20"
                onClick={handleCapture}
                disabled={!hasCameraPermission}
            >
                <span className="sr-only">Take Photo</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-black/50 hover:bg-black/70 text-white">
                <RefreshCw />
            </Button>
        </div>
      </footer>
    </div>
  );
}
