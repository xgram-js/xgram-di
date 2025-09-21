export type Class = { new (...args: any[]): any };
export type InstanceOf<C extends Class = Class> = C extends { new (...args: any[]): infer R } ? R : never;

export function getClassOfInstance(instance: InstanceOf) {
    return instance.constructor as Class;
}
