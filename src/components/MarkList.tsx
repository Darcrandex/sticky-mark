/**
 * @name MarkList
 * @description
 * @author beiysd
 */

'use client'

import { MarkItem } from '@/utils'
import { fetchAddMark, fetchDeleteMark, fetchMarkList } from '@/utils/serves/home-api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import SortableGrid from './dndkitSort/SortableGrid'
// import { CustomInput } from './selfInput/input'
// import { MarkPopupManager } from './selfModal/modal'

export default function MarkList() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['fetchMarkList'],
    queryFn: fetchMarkList,
  })
  const [markList, setMarkList] = useState([])

  const deleteMutation = useMutation({ mutationFn: fetchDeleteMark })
  const addMutation = useMutation({ mutationFn: fetchAddMark })

  useEffect(() => {
    if (data){
      console.log("MMMMMMM=marklit=",data)
      setMarkList(data)
    }
    return ()=>{}
  }, [data])

  const deleteClick = async (id: string) => {
    await deleteMutation.mutate(id, {
      onSuccess: () => {
        refetch()
      },
    })
  }
  const addClick = async () => {
    const title = `test ${Math.random()}`
    const url = `https://www.baidu.com/${Math.random()}`
    await addMutation.mutate(
      { title, url },
      {
        onSuccess: () => {
          refetch()
        },
      },
    )
  }

  const markItemContent = () => {
    return (
      <div>
        <h3>Add</h3>
        <CustomInput />
      </div>
    )
  }

  const addMark = async () => {
    // const res = await MarkPopupManager.confirm({ Component: markItemContent })
  }
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  return (
    <div className=''>
      <div className='flex py-[20px]'>
        <button className='mr-[20px] rounded-lg bg-sky-500/100 px-[4px]' onClick={() => refetch()}>
          Get All
        </button>
        <button className='mr-[20px] rounded-lg bg-sky-500/100 px-[4px]' onClick={() => addClick()}>
          Add Mark
        </button>
        <button className='mr-[20px] rounded-lg bg-sky-500/100 px-[4px]' onClick={() => addMark()}>
          showModal
        </button>
      </div>
      <SortableGrid
        initData={markList}
        renderItem={(item: MarkItem) => (
          <div className='mb-[20px] rounded-lg bg-sky-500/100 p-[10px] break-all'>
            <p>{item?.id}</p>
            <p>title: {item?.title}</p>
            <p>url: {item?.url}</p>
            <button className='rounded-lg bg-pink-500 px-[4px]' onClick={() => deleteClick(item?.id)}>
              delete
            </button>
          </div>
        )}
      />
      
    </div>
  )
}
