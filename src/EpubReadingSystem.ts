export interface EpubReadingSystemObject {
  readonly name: string;
  readonly version: string;
}

export interface EpubReadingSystem extends Navigator {
  epubReadingSystem: EpubReadingSystemObject;
}
