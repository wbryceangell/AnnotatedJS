import { container as defaultContainer } from "../../container/container";
import { keys } from "../../container/keys";
import { validateContainer } from "../../container/utils/validateContainer";
import { AnnotatedDatastore } from "../../interfaces/annotatedDatastore";
import { Class, ClassDecorator } from "../types";
import { addClassToContainer } from "../utils/addClassToContainer";
import { getStandardInitializer } from "../utils/getStandardInitializer";
import { validateKind } from "../utils/validateKind";
import { validateName } from "../utils/validateName";

/**
 * A class decorator that defines an injectable datastore
 *
 * @see
 *
 * {@link AnnotatedDatastore} for interface definition
 *
 * @example
 * ```ts
 * import { AnnotatedDatastore, Datastore } from "@fork-git-it/annotatedjs";
 *
 * @Datastore()
 * class TestDatastore implements AnnotatedDatastore<string> {
 *   private map = new Map<string, string>();
 *
 *   length: number = 0;
 *
 *   async clear(): Promise<undefined> {
 *     this.map.clear();
 *     this.length = 0;
 *   }
 *
 *   async getItem(keyName: string): Promise<string | null> {
 *     return this.map.get(keyName) || null;
 *   }
 *
 *   async key(index: number): Promise<string | null> {
 *     return [...this.map.keys()].at(index) || null;
 *   }
 *
 *   async removeItem(keyName: string): Promise<undefined> {
 *     const keyExisted = this.map.has(keyName);
 *
 *     this.map.delete(keyName);
 *
 *     if (!keyExisted) {
 *       this.length--;
 *     }
 *   }
 *
 *   async setItem(keyName: string, value: string): Promise<undefined> {
 *     const keyExisted = this.map.has(keyName);
 *
 *     this.map.set(keyName, value);
 *
 *     if (!keyExisted) {
 *       this.length++;
 *     }
 *   }
 * }
 * ```
 *
 * @typeParam T - Type of the datastore values
 *
 * @param container - Object that stores injectables
 */
export const Datastore = <T>(container = defaultContainer) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = Datastore.name;
    validateKind(annotationName, context, "class");
    validateName(annotationName, context);

    context.addInitializer(
      getStandardInitializer(annotationName, context, container),
    );

    addClassToContainer(container, keys.datastoreClasses, constructor);
  }) as ClassDecorator<Class<AnnotatedDatastore<T>>>;
