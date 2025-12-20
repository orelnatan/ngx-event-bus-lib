
export function wait(ms: number): Promise<void> {
  return new Promise(
    (resolve: (value: PromiseLike<void>) => void) => setTimeout(resolve, ms)
  );
}