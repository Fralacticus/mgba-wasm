export interface Module {
  _mute(): void;
  _unMute(): void;
  _setVolume(volume: number): void;

  _setSpeed(speed: number): void;
  _setScale(scale: number): string;
  _getPlatform(): string;

  getKeyForward(): string;
  setKeyForward(key: string): void;
  _pressForward(): void;
  _releaseForward(): void;

  setKeyA(key: string): void;
  getKeyA(): string;
  _pressKeyA(): void;
  _releaseKeyA(): void;

  setKeyB(key: string): void;
  getKeyB(): string;
  _pressKeyB(): void;
  _releaseKeyB(): void;

  setKeyL(key: string): void;
  getKeyL(): string;
  _pressKeyL(): void;
  _releaseKeyL(): void;

  setKeyR(key: string): void;
  getKeyR(): string;
  _pressKeyR(): void;
  _releaseKeyR(): void;

  setKeyStart(key: string): void;
  getKeyStart(): string;
  _pressKeyStart(): void;
  _releaseKeyStart(): void;

  setKeySelect(key: string): void;
  getKeySelect(): string;
  _pressKeySelect(): void;
  _releaseKeySelect(): void;

  setKeyUp(key: string): void;
  getKeyUp(): string;
  _pressKeyUp(): void;
  _releaseKeyUp(): void;

  setKeyDown(key: string): void;
  getKeyDown(): string;
  _pressKeyDown(): void;
  _releaseKeyDown(): void;

  setKeyLeft(key: string): void;
  getKeyLeft(): string;
  _pressKeyLeft(): void;
  _releaseKeyLeft(): void;

  setKeyRight(key: string): void;
  getKeyRight(): string;
  _pressKeyRight(): void;
  _releaseKeyRight(): void;

  _setSize(width: number, height: number): void;

  loadFile(name: string): void;
  getSave(): string;

  canvas: HTMLElement;
  FS: any;
  saveName: string;
  version: {
    gitCommit: string;
    gitShort: string;
    gitBranch: string;
    gitRevision: number;
    binaryName: string;
    projectName: string;
    projectVersion: string;
  };
}
