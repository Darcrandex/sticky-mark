import MyButton from '@/components/btn'
import MarkManage from '@/components/MarkManage'

import MarkList from "@/components/MarkList";

export default function Home() {
  return (
    <>
      <section className='m-20'>
        <MyButton />

        <MarkManage />
        <MarkList/>
      </section>
    </>
  )
}