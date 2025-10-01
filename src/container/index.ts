import { Class, InstanceOf } from "@xgram/types";
import InstanceStorage from "@/instanceStorage";
import Injectable from "@/injectable";
import { INJECT_KEY_METADATA } from "@/injectKey";

export const REGISTERED_CLASS_METADATA = Symbol("di-registered:metadata");

export interface RegisteredClassMetadata {
    dependencies: Class[];
}

@Injectable()
export default class Container {
    public constructor() {
        this.instanceStorage = new InstanceStorage();
        this.instanceStorage.registerInstance(this);
    }

    private readonly instanceStorage: InstanceStorage;

    public resolve<C extends Class = Class>(cls: C): InstanceOf<C> {
        const meta: RegisteredClassMetadata | undefined = Reflect.getOwnMetadata(REGISTERED_CLASS_METADATA, cls);
        const injectAsMeta: Record<number, string> = Reflect.getOwnMetadata(INJECT_KEY_METADATA, cls) ?? {};
        if (!meta) throw new Error(`Class ${cls.name} is not registered in DI`);

        const depsInstances = meta.dependencies.map((v, index) => {
            if (injectAsMeta[index]) return this.instanceStorage.getCustomKeyInstance(injectAsMeta[index]);
            return this.resolve(v);
        });
        let instance: InstanceOf<typeof cls>;
        if (this.instanceStorage.hasInstance(cls)) instance = this.instanceStorage.getInstance(cls);
        else {
            instance = new cls(...depsInstances);
            this.instanceStorage.registerInstance(instance);
        }
        return instance;
    }

    public registerCustomKeyInstance(instance: InstanceOf, key: string) {
        this.instanceStorage.registerCustomKeyInstance(instance, key);
    }
}
