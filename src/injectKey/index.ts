export const INJECT_KEY_METADATA = Symbol("di-registered:inject-key");

export default function InjectKey(key: string): ParameterDecorator {
    return function (target, propertyKey, parameterIndex) {
        const obj = (Reflect.getOwnMetadata(INJECT_KEY_METADATA, target) as Record<number, string>) ?? {};
        obj[parameterIndex] = key;
        Reflect.defineMetadata(INJECT_KEY_METADATA, obj, target);
    };
}
