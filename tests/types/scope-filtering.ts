import nock from '../../index.ts'

const scope = nock('https://example.test')

scope.filteringPath((path: string) => path)
scope.filteringPath(/id=\d+/, 'id=1')
scope.filteringRequestBody(
  (body: string, recordedBody: string) => body + recordedBody,
)
scope.filteringRequestBody(/secret/, 'redacted')

// @ts-expect-error A regular expression requires a replacement string.
scope.filteringPath(/id=\d+/)
// @ts-expect-error A regular expression requires a replacement string.
scope.filteringRequestBody(/secret/)
// @ts-expect-error A path filter must be a function or a regular expression.
scope.filteringPath('invalid')
// @ts-expect-error A body filter must be a function or a regular expression.
scope.filteringRequestBody('invalid')
