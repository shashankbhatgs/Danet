import { Reflect } from 'https://deno.land/x/reflect_metadata@v0.1.12-2/mod.ts';
import { HttpContext } from '../../router.ts';
import { ControllerConstructor } from '../constructor.ts';

export type Resolver = (context: HttpContext) => unknown | Promise<unknown>;

export const argumentResolverFunctionsMetadataKey = 'argumentResolverFunctions';
export const createParamDecorator = (resolver: Resolver) => () => (target: ControllerConstructor, propertyKey: string | symbol, parameterIndex: number) => {
  const argumentsResolverMap: Map<number, Resolver> = Reflect.getOwnMetadata(argumentResolverFunctionsMetadataKey, target, propertyKey) || new Map<number, Resolver>();
  argumentsResolverMap.set(parameterIndex, resolver);
  Reflect.defineMetadata(argumentResolverFunctionsMetadataKey, argumentsResolverMap, target, propertyKey);
}


export const Req = createParamDecorator((context: HttpContext) => {
  return context.request;
})


export const Res = createParamDecorator((context: HttpContext) => {
  return context.response;
})