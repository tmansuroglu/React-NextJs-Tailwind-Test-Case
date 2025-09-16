export type RenderErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
