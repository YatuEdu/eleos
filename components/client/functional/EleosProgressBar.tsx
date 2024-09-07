import { useWizard, WizardStep, WizardStepToProgressStep } 
        from '@/lib/providers/WizardProvider';
import React, { useEffect, useRef, useState } 
        from 'react';

type ProgressBarCanvasProps = {
  steps: string[];
}

const EleosProgressBar: React.FC<ProgressBarCanvasProps> = ({ steps }) => {
  const {currentStep, setHelpTextIds} = useWizard()
  const [currentProgress, setCurrentProgress] = useState(0)

  /**
   * Update the current progress based on the current step in wizard
   */
  useEffect(() => {
    const stepToProgree = WizardStepToProgressStep.find(step => step.wizardStep === currentStep)
    if (!stepToProgree) {
      throw Error('Invalid step')
    }
    setCurrentProgress(stepToProgree.progressInx)
      
  }, [currentStep]) 

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(800); // Default width
  const canvasHeight = 150; // Fixed height

  const drawProgress = (ctx: CanvasRenderingContext2D, width: number) => {
    const radius = 15;
    const padding = 54;
    const totalWidth = width - 2 * padding;
    const stepGap = totalWidth / (steps.length - 1) - 2;

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, width, canvasHeight);

    // Draw lines connecting the steps
    for (let i = 0; i < steps.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(padding + i * stepGap, canvasHeight / 2);
      ctx.lineTo(padding + (i + 1) * stepGap, canvasHeight / 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = i < currentProgress ? 'green' : '#e0e0e0'; // Green for completed steps, gray for future steps
      ctx.stroke();
    }

    // Draw step circles and labels
    steps.forEach((step, index) => {
      const x = padding + index * stepGap;
      const y = canvasHeight / 2;

      // Draw step circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = index < currentProgress ? 'green' : index === currentProgress ? 'gray' : 'white';
      ctx.fill();

      // Draw circle border for future steps
      if (index > currentProgress) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw step number or check mark
      ctx.fillStyle = index <= currentProgress ? 'white' : 'black';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(index < currentProgress ? '✓' : (index + 1).toString(), x, y);

      // Draw step description below the circle
      ctx.fillStyle = 'black';
      ctx.font = '12px Arial';
      ctx.textBaseline = 'top'; // Align the text below the circle
      ctx.fillText(step, x, y + radius + 10); // Adjust position to draw text below the circle
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawProgress(ctx, canvasWidth);
      }
    }
  }, [steps, currentProgress, canvasWidth]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parentWidth = canvasRef.current.parentElement?.clientWidth;
        if (parentWidth) {
          setCanvasWidth(parentWidth);
        }
      }
    };

    // Set initial width
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ width: '100%' }} />
    </div>
  );
};

export default EleosProgressBar;
