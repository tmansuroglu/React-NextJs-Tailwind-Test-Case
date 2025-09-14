type LoadingIndicatorProps = {
  ariaLabel?: string;
};

export function LoadingIndicator({
  ariaLabel = "Loading...",
}: LoadingIndicatorProps) {
  return (
    <div
      className="flex justify-center items-center"
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-hidden
      data-testid="loading-indicator"
    >
      <div className="w-4 h-4 border-2 border-t-blue-500 border-gray-200 rounded-full animate-spin" />
    </div>
  );
}
