import GroupEditWorker from './GroupEditWorker'
import { useState } from 'react'
import GroupViewWorker from './GroupViewWorker'

const GroupWorker = () => {
  const [isEditMode, setIsEditMode] = useState(true)

  const setViewMode = () => setIsEditMode(false)
  const setEditMode = () => setIsEditMode(true)
  return (
    <>
      {isEditMode ? (
        <GroupEditWorker setViewMode={setViewMode} />
      ) : (
        <GroupViewWorker setEditMode={setEditMode} />
      )}
    </>
  )
}
export default GroupWorker
