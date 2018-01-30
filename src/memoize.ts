import memoizeFn from 'lodash.memoize';

export interface Resolver {
  (...args: any[]): any;
}

export default (resolver?: Resolver) => (
  target: any,
  key: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  descriptor.value = memoizeFn(descriptor.value, resolver);
  return descriptor;
};