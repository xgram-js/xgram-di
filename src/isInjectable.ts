import { Class } from "@/types/class";
import { REGISTERED_CLASS_METADATA } from "@/container";

export default function isInjectable(cls: Class) {
    return Reflect.getOwnMetadata(REGISTERED_CLASS_METADATA, cls) !== undefined;
}
