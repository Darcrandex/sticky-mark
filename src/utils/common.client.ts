'use client'

export function getValuesFromFormData(formData: FormData): Record<string, any> {
  const values: Record<string, any> = {}
  for (const [key, value] of formData.entries()) {
    values[key] = value
  }
  return values
}
