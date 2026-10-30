export interface ImageEnhancementProvider {
  enhance(
    file: Blob,
    options: { action: "lighting" | "background" | "cleanup" },
  ): Promise<Blob>;
}
export class NoOpImageEnhancementProvider implements ImageEnhancementProvider {
  async enhance(file: Blob): Promise<Blob> {
    return file;
  }
}
