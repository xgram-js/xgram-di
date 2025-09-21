import { Class, InstanceOf } from "@/types/class";
import InstanceStorage from "@/instanceStorage";
import Injectable from "@/injectable";

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
