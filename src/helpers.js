export function stepKey(pattern, instrument, part, variation, step) {
  return `PATTERN_${pattern}-INSTRUMENT_${instrument}-${part}-${variation}-STEP_${step}`;
}

export function patternLengthKey(pattern, part) {
  return `PATTERN_${pattern}-${part}-LENGTH`;
}

export function snap(number, increment, offset) {
  return Math.round(number / increment ) * increment + offset;
}

// taken from http://raganwald.com/2015/06/26/decorators-in-es7.html
export function mixin (behaviour, sharedBehaviour = {}) {
  const instanceKeys = Reflect.ownKeys(behaviour);
  const sharedKeys = Reflect.ownKeys(sharedBehaviour);
  const typeTag = Symbol('isa');

  function _mixin (clazz) {
    for (let property of instanceKeys)
      Object.defineProperty(clazz.prototype, property, {
        value: behaviour[property],
        writable: true
      });
    Object.defineProperty(clazz.prototype, typeTag, { value: true });
    return clazz;
  }
  for (let property of sharedKeys)
    Object.defineProperty(_mixin, property, {
      value: sharedBehaviour[property],
      enumerable: sharedBehaviour.propertyIsEnumerable(property)
    });
  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: (i) => !!i[typeTag]
  });
  return _mixin;
}

// input should be a value 0 to 100, outputs 0.0 to 1.0
export function equalPower(input) {
  const output = Math.cos((1.0 - (input / 100)) * 0.5 * Math.PI);
  return Math.round(output * 100) / 100;
}