import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function playSound(character: string) {
  // Create a text-to-speech utterance
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(character);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.volume = 0.9;
    speechSynthesis.speak(utterance);
  } else {
    // Fallback for browsers without speech synthesis
    console.log(`Playing sound for: ${character}`);
  }
}

export function showAlert(title: string, message: string) {
  const alertBox = document.getElementById('successAlert');
  const alertTitle = document.getElementById('alertTitle');
  const alertMessage = document.getElementById('alertMessage');
  
  if (alertBox && alertTitle && alertMessage) {
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertBox.classList.add('show');
    setTimeout(() => {
      alertBox.classList.remove('show');
    }, 3000);
  }
}

export function formatPercent(value: number, total: number): number {
  return Math.round((value / total) * 100);
}