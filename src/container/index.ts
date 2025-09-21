import { Class, InstanceOf } from "@/types/class";
import InstanceStorage from "@/instanceStorage";

export const REGISTERED_CLASS_METADATA = Symbol("di-registered:metadata");

export interface RegisteredClassMetadata {
    dependencies: Class[];
}

export default class Container {
    public constructor() {}

    private readonly instanceStorage: InstanceStorage = new InstanceStorage();

    public resolve(cls: Class) {
        const meta: RegisteredClassMetadata | undefined = Reflect.getOwnMetadata(REGISTERED_CLASS_METADATA, cls);
        if (!meta) throw new Error(`Class ${cls} is not registered in container`);

        const depsInstances = meta.dependencies.map(v => this.resolve(v));
        let instance: InstanceOf<typeof cls>;
        if (this.instanceStorage.hasInstance(cls)) instance = this.instanceStorage.getInstance(cls);
        else {
            instance = new cls(...depsInstances);
            this.instanceStorage.registerInstance(instance);
        }
        return instance;
    }
}
