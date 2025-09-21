import { Class, getClassOfInstance, InstanceOf } from "@/types/class";

export type InstanceStorageMapType<C extends Class = Class> = Map<C, InstanceOf<C>>;

export default class InstanceStorage {
    public constructor() {}

    private readonly instances: InstanceStorageMapType = new Map();

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
}
