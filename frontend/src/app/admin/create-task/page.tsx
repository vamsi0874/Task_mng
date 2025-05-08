import CreateTask from './_Component/CreateTask'

import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateTask />
    </Suspense>
  )
}
