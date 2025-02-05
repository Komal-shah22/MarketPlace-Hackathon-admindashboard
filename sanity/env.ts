export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-03'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  // process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "skRuHKSJEtvoFK3lF8wBDwuQQxS6JWbfyD92XrbaSbXpgt0nPX7KnWx3BUx4eKzlYAl76MNe9BCXB6FDXaZERzWxkgUiEH2SezQ5S8Lcvo1A2GpWpRYQrX8ha2E7yAo5aFF2uiSmnAD1N4GkinLdxQ5C6FxT1V5wlUB2XuC7vKDwO8v7P7sj",


  'Missing environment variable: NEXT_API_TOKEN'
)


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
