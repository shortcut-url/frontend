import { createStore, createEvent, createEffect, combine } from 'effector';

import { trimEvent } from 'lib/utils';
import { urlValidator } from 'lib/validators';
import { requestAPI, createFetching } from 'lib/request';

/*
 * Create new url
 */
export let urlFieldChange = createEvent();
export let urlFieldClear = createEvent();
export let addUrlCreated = createEvent();

export let createUrlProcessing = createEffect();
export let createUrlFetching = createFetching(createUrlProcessing);

export let $urlField = createStore('');
export let $urlFieldError = $urlField.map(url => {
  if (urlValidator(url)) return false;

  return 'Url must be in the format: example.com, https://example.com';
});

$urlField
  .on(urlFieldChange.map(trimEvent), (_, url) => url)
  .reset(urlFieldClear);

createUrlProcessing.use(() => requestAPI('POST', 'url'));

createUrlProcessing.done.watch(({ result }) => {
  if (!result.ok) return;

  addUrlCreated({ id: result.data, originalUrl: $urlField.getState() });

  urlFieldClear();
});

/*
 * Form
 */

export let formSubmitted = createEvent();

formSubmitted.watch(() => {
  let originalUrl = $urlField.getState();

  createUrlProcessing(originalUrl);
});

export let $isFormLoading = createUrlFetching.isLoading;

/*
 * List created Urls
 */
export let clearListCreatedUrls = createEvent();

export let $listCreatedUrls = createStore([]);

$listCreatedUrls
  .on(addUrlCreated, (urls, newUrl) => [newUrl, ...urls])
  .reset(clearListCreatedUrls);

export let $isSubmitEnabled = combine(
  $urlFieldError,
  $isFormLoading,
  (urlFieldError, isFormLoading) => !urlFieldError && !isFormLoading
);
