import { fetchToJsonReturn } from '..'
import { ApiList } from './api-list'

// get mark list
// queryKey:fetchMarkList
export const fetchMarkList = async () => {
    const res = await fetch(ApiList.markListApi, {
      method: 'GET',
      cache: 'no-store',
    })
    return await fetchToJsonReturn(res);
}

// add
// queryKey:fetchAddMark
export const fetchAddMark = async (params: object) => {
    const res = await fetch(ApiList.markListApi, {
      method: 'POST',
      body: JSON.stringify(params),
    })
    return await fetchToJsonReturn(res);
}

// update
// queryKey:fetchUpdateMark
export const fetchUpdateMark = async (id: string, params: object) => {
    const res = await fetch(ApiList.markIdApi(id), {
      method: 'PUT',
      body: JSON.stringify(params),
    })
    return await fetchToJsonReturn(res);
}

// delete
// queryKey:fetchDeleteMark
export const fetchDeleteMark = async (id: string) => {
    const res = await fetch(ApiList.markIdApi(id), {
      method: 'DELETE',
    })
    return await fetchToJsonReturn(res);
}
