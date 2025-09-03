import { logger } from './logger';
import { EffectType,  EffectTypeMetadata, ReadonlySignal } from './types';

let effectContext: EffectType | null = null;
const effectContextInfo = new Map<EffectType, EffectTypeMetadata>()

class EffectRunner {
  private asyncEffects = new Set<EffectType>();
  hasAsyncEffectRunner = false;
  addASAPEffect(effect: EffectType) {
    effect();
  }
  addAsyncEffect(effect: EffectType) {
    this.asyncEffects.add(effect)
    if (!this.hasAsyncEffectRunner) {
      this.hasAsyncEffectRunner = true;
      queueMicrotask(this.executeAsyncEffects);
    }
  }
  private executeAsyncEffects = () => {
    this.hasAsyncEffectRunner = false;
    for (const effect of this.asyncEffects) {
      effect();
    }
  };
}
const effectRunner = new EffectRunner()
export class Signal<T> {
  private _value: T;
  private effects = new Set<EffectType>();

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  public get value(): T {
    this.track();
    return this._value;
  }
  public set value(next: T) {
    this._value = next;
    this.trigger();
  }

  private track() {
    if (!effectContext) {
      return;
    }
    this.effects.add(effectContext);
  }

  private trigger() {
    for (const effect of this.effects) {
      try {
        const effectMetadata = effectContextInfo.get(effect)
        if (effectMetadata?.type === 'asap') {
            effectRunner.addASAPEffect(effect)
        } else {
            effectRunner.addAsyncEffect(effect)
        }
      } catch (err) {
        logger.error('Run effect callback in signal panic', {
          err,
          value: this._value,
          effect,
        });
      }
    }
  }
}
export function signal<T>(initialValue: T) {
  return new Signal(initialValue);
}
export function effect(fn: EffectType, type: EffectTypeMetadata['type'] = 'async') {
  effectContext = fn;
  effectContextInfo.set(fn, { type })
  fn();
  effectContext = null;
}

export function computed<T>(fn: () => T): ReadonlySignal<T> {
  const result = signal(fn());
  effect(() => (result.value = fn()), 'asap');
  return result;
}

export function isSignal(input: unknown): input is typeof Signal {
  return input instanceof Signal;
}
