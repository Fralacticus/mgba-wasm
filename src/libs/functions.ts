import type { Module } from "src/types/Module";

export function setUpInputMap(Module: Module) {
  let currentKeys: any = {};
  currentKeys.A = Module.getKeyA();
  currentKeys.B = Module.getKeyB();
  currentKeys.Start = Module.getKeyStart();
  currentKeys.Select = Module.getKeySelect();
  currentKeys.R = Module.getKeyR();
  currentKeys.L = Module.getKeyL();
  currentKeys.Up = Module.getKeyUp();
  currentKeys.Down = Module.getKeyDown();
  currentKeys.Left = Module.getKeyLeft();
  currentKeys.Right = Module.getKeyRight();
  currentKeys.Forward = Module.getKeyForward();
  return currentKeys;
}
