import { cn } from "@/lib/utils";
import type { TokenType } from "@shared/schema";

interface TokenSelectorProps {
  value: TokenType;
  onChange: (token: TokenType) => void;
}

export function TokenSelector({ value, onChange }: TokenSelectorProps) {
  return (
    <div className="flex rounded-lg border p-1">
      <button
        type="button"
        onClick={() => onChange("CELO")}
        className={cn(
          "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          value === "CELO"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover-elevate"
        )}
        data-testid="button-token-celo"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <circle cx="12" cy="12" r="12" fill={value === "CELO" ? "white" : "url(#celoGradient)"} />
          <path
            d="M12 5C8.13 5 5 8.13 5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12"
            stroke={value === "CELO" ? "hsl(var(--primary))" : "white"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="celoGradient" x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#FCFF52" />
              <stop offset="1" stopColor="#35D07F" />
            </linearGradient>
          </defs>
        </svg>
        CELO
      </button>
      <button
        type="button"
        onClick={() => onChange("cUSD")}
        className={cn(
          "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          value === "cUSD"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover-elevate"
        )}
        data-testid="button-token-cusd"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <circle cx="12" cy="12" r="12" fill={value === "cUSD" ? "white" : "#45CD85"} />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill={value === "cUSD" ? "hsl(var(--primary))" : "white"}
            fontSize="12"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            $
          </text>
        </svg>
        cUSD
      </button>
    </div>
  );
}
