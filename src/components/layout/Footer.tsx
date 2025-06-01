import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <ChessPieceIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white">ChessMaster Kids</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              © {year} ChessMaster Kids. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
            <FooterLink label="Parent Resources" />
            <FooterLink label="Contact Support" />
            <FooterLink label="Privacy Policy" />
            <FooterLink label="Terms of Use" />
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>ChessMaster Kids is designed to be safe for children of all ages.</p>
          <p>COPPA Compliant • Ad-Free • Child-Safe Environment</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ label: string }> = ({ label }) => (
  <button className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm transition-colors">
    {label}
  </button>
);

// Custom chess piece icon component
const ChessPieceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L8 6H16L12 2Z" fill="currentColor" />
    <path d="M12 6V10M12 10L9 13M12 10L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 17.5C8 16.1193 9.11929 15 10.5 15H13.5C14.8807 15 16 16.1193 16 17.5V18H8V17.5Z" fill="currentColor" />
    <path d="M5 21V19H19V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21Z" fill="currentColor" />
  </svg>
);

export default Footer;