import "reflect-metadata";
import { Class } from "@xgram/types";
import { REGISTERED_CLASS_METADATA, RegisteredClassMetadata } from "@/container";

export default function Injectable() {
    return function (cls: Class) {
        const deps = (Reflect.getOwnMetadata("design:paramtypes", cls) as any[]) ?? [];

        const metadata: RegisteredClassMetadata = {
            dependencies: deps
        };

        Reflect.defineMetadata(REGISTERED_CLASS_METADATA, metadata, cls);
    };
}
