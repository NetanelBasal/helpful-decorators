/**
 *
 * @param milliseconds
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor)=>PropertyDescriptor}
 */
export declare function timeout(milliseconds?: number): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
