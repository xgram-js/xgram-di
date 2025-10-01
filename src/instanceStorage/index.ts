import { Class, getClassOfInstance, InstanceOf } from "@xgram/types";

export type InstanceStorageMapType<C extends Class = Class> = Map<C, InstanceOf<C>>;

export default class InstanceStorage {
    public constructor() {}

    private readonly instances: InstanceStorageMapType = new Map();
    private readonly customKeysInstances: Record<string, InstanceOf> = {};

    public hasInstance(cls: Class): boolean {
        return this.instances.has(cls);
    }

    public getInstance<C extends Class>(cls: C): InstanceOf<C> {
        if (!this.hasInstance(cls)) throw new Error(`Class ${cls} is not registered in instance storage`);
        return this.instances.get(cls);
    }

    public registerInstance(instance: InstanceOf) {
        const cls = getClassOfInstance(instance);
        if (this.hasInstance(instance))
            throw new Error(`Trying to reassign already registered in instance storage class ${cls}`);
        this.instances.set(cls, instance);
    }

    public registerCustomKeyInstance(instance: InstanceOf, key: string) {
        if (this.customKeysInstances[key])
            throw new Error(`Trying to reassign already registered in instance storage key ${key}`);
        this.customKeysInstances[key] = instance;
    }

    public getCustomKeyInstance(key: string) {
        if (!this.customKeysInstances[key]) throw new Error(`Key ${key} is not registered in instance storage`);
        return this.customKeysInstances[key];
    }

    public hasCustomKeyInstance(key: string) {
        return !!this.customKeysInstances[key];
    }
}
