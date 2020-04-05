import { createStore, createEvent } from 'effector';

export function createFetching(effect, initialStatus = 'initial', params = {}) {
  let customReset = params.reset || createEvent();

  let result = createStore(params.data || null)
    .reset(effect)
    .reset(effect.fail)
    .reset(customReset)
    .on(effect.done, (_, { result: value }) => value);

  let error = createStore(params.error || null)
    .reset(effect)
    .reset(effect.done)
    .reset(customReset)
    .on(effect.done, (_, { result }) => {
      if (result.ok) return null;

      return result.data?.errors || result.data;
    });

  let status = createStore(initialStatus)
    .on(effect, () => 'loading')
    .on(effect.done, (_, { result }) => (result.ok ? 'done' : 'fail'))
    .on(effect.fail, () => 'fail')
    .on(customReset, () => 'initial');

  let isDone = status.map((state) => state === 'done');
  let isFailed = status.map((state) => state === 'fail');
  let isLoading = status.map((state) => state === 'loading');

  return { result, error, status, isDone, isFailed, isLoading };
}
