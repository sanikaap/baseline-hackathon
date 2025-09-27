import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md p-6 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl dark:bg-gray-900/80 dark:border-gray-700 transition-all duration-300">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-gray-800 flex justify-between items-center dark:text-gray-100">
            Hackathon Project Disclaimer
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={onClose}
            >
              <X className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            </Button>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base space-y-4 mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              This is a mock demo prototype created for the Baseline Hackathon.
              The project demonstrates potential features using the Baseline API
              and is not a production application.
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100 px-1 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
              All data and functionality shown are simulated for demonstration
              purposes only.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DisclaimerModal;