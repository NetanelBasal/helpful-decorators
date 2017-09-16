/**
 *
 * @export
 * @param {number} [milliseconds=0]
 * @param {any} [options={}]
 * @returns
 */
export declare function debounce(milliseconds?: number, options?: {}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
