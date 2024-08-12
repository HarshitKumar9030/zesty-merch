import Image from 'next/image';
import type { ButtonHTMLAttributes, ReactNode } from 'react';


type CanvaButtonVariant = "primary" | "secondary" | "destructive";

interface CanvaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  canvaVariant: CanvaButtonVariant;
  loading?: boolean;
  // Add more project-specific props here if needed
}

const CANVA_BUTTON_COLORS: Record<CanvaButtonVariant, string> = {
  primary: "from-cyan-400 hover:from-cyan-500 hover:via-blue-700 hover:to-purple-700 via-blue-600 to-purple-600 ",
  secondary: "bg-blue-600 hover:bg-blue-700",
  destructive: "from-gray-500 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 via-gray-600 to-gray-700",
};

/**
 * CanvaButton - Custom button for consistent theming across the project.
 * @param props - Includes all native button props plus project-specific props like canvaVariant.
 * @returns The JSX element styled with project-specific styles.
 */


export const CanvaButton = ({
  canvaVariant,
  loading,
  disabled,
  children,
  ...remainingProps
}: CanvaButtonProps): JSX.Element => {
  return (    /*
    <div className="bg-gradient-to-r flex w-[50%] items-center rounded-lg p-1.5 justify-center from-cyan-400 hover:from-cyan-500 hover:via-blue-700 hover:to-purple-700 duration-300 transition-all via-blue-600 to-purple-600 ">
            <button
              onClick={handleCanvaIntegration}
              className="flex flex-row items-center  justify-center gap-8 w-[100%] py-4 px-8 text-black bg-zinc-700 rounded-lg transition duration-300"
            >
              <Image
                alt="Canva Logo"
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Canva_Logo.svg/2560px-Canva_Logo.svg.png"
                }
                width={100}
                height={50}
              />
            </button>
          </div>
    */
    <button
      className={`flex items-center justify-center border gap-4 w-[50%] flex-col py-3 px-8 border-neutral-700 text-white rounded-lg transition duration-300 ${CANVA_BUTTON_COLORS[canvaVariant]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || loading}
      {...remainingProps}
    >
      {loading ? (
        <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin"></div>
      ) : (
        <>
          <Image
            alt="Canva Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Canva_Logo.svg/2560px-Canva_Logo.svg.png"
            width={100}
            height={50}
          />
          {children}
        </>
      )}
    </button>
  );
};
