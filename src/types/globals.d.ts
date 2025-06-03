declare interface Window {
    ethereum?: {
        isMetaMask?: boolean;
        request: (args: { method: string; params: string[] }) => Promise<string[]>;
        on: (event: string, callback: (...args: any[]) => void) => void;
        removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
}