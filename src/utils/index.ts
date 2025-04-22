export const fetchToJsonReturn = async (res: Response) => {
  const data = await res.json()
  return data.data
}

export type MarkItem = {
  id: string
  title: string
  url: string
  createdAt: string
  desc: null
  favicon: null
  group: null
  uid: string
  updatedAt: string
}
