import { useEffect, useRef } from "react";

import { useRerender } from "utils/hooks/useRerender";

import { isEqual } from "./utils";

import { FormStore, GenericFormValues } from "./types";

interface StateItem<V> {
  value: V;
  subscribed: boolean;
  getter: () => V;
}
interface State<T = GenericFormValues> {
  values: StateItem<T>;
  errors: StateItem<Record<string, unknown>>;
  touched: StateItem<Record<string, unknown>>;
}

/**
 * A helper hook, that adds "smart" getters for the `values`, `errors`
 * and `tocuhed` properties to the `useForm` hook.
 * Here "smart" means that if property is accessed in the react component,
 * then the `useForm` hook will subscribe to this property changes and
 * will cause rerender component when property has changed.
 *
 * For example, if we access the `value` property of the `useForm` hook:
 * const { Form, values } = useForm({ ... })
 * then, our component will be rerendered whenever the values changes.
 *
 * But if we don't access this property:
 * const { Form } = useForm({ ... })
 * then, if values are chnaged, the component will not be rerendered.
 *
 * This hook is not meant to be used as a standalone, but rather to
 * enhance the `useForm` hook. Making it a a separate hook, makes it
 * easier to test.
 */
export function useValueGetters<
  V = GenericFormValues,
  T = Record<string, unknown>
>(
  target: T,
  store: FormStore
): T & {
  values: V;
  errors: Record<string, unknown>;
  touched: Record<string, unknown>;
} {
  const rerender = useRerender(),
    stateRef = useRef<State<V>>();
  if (!stateRef.current!) {
    stateRef.current! = {
      values: {
        value: store.getState().values as V,
        subscribed: false,
        getter() {
          stateRef.current!.values.subscribed = true;
          return stateRef.current!.values.value;
        },
      },
      errors: {
        value: store.getState().errors,
        subscribed: false,
        getter() {
          stateRef.current!.errors.subscribed = true;
          return stateRef.current!.errors.value;
        },
      },
      touched: {
        value: store.getState().touched,
        subscribed: false,
        getter() {
          stateRef.current!.touched.subscribed = true;
          return stateRef.current!.touched.value;
        },
      },
    };
  }

  useEffect(
    () =>
      store.subscribeToValue("", ([values, errors, touched]) => {
        const shouldRerender =
          (stateRef.current!.values.subscribed &&
            !isEqual(stateRef.current!.values.value, values)) ||
          (stateRef.current!.errors.subscribed &&
            !isEqual(stateRef.current!.errors.value, errors)) ||
          (stateRef.current!.touched.subscribed &&
            !isEqual(stateRef.current!.touched.value, touched));

        stateRef.current!.values.value = values as unknown as V;
        stateRef.current!.errors.value = errors as unknown as Record<
          string,
          string
        >;
        stateRef.current!.touched.value = touched as unknown as Record<
          string,
          string
        >;
        shouldRerender && rerender();
      }),
    [store, rerender]
  );

  for (const key in stateRef.current!) {
    Object.defineProperty(target, key, {
      get: stateRef.current![key as keyof typeof stateRef.current].getter,
      enumerable: true,
    });
  }

  return target as T & {
    values: V;
    errors: Record<string, unknown>;
    touched: Record<string, unknown>;
  };
}
