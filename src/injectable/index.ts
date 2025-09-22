import "reflect-metadata";
import { Class } from "@/types/class";
import { REGISTERED_CLASS_METADATA, RegisteredClassMetadata } from "@/container";

export default function Injectable() {
    return function (cls: Class) {
        const deps = Reflect.getOwnMetadata("design:paramtypes", cls) ?? [];

        const metadata: RegisteredClassMetadata = {
            dependencies: deps satisfies Class[]
        };

        Reflect.defineMetadata(REGISTERED_CLASS_METADATA, metadata, cls);
    };
}
