import { useDeleteRaport, useUpdateStatusRaport } from "common/hooks/status"
import { ApproveAction, RestoreAction, TrashAction } from "components/ui/Dialog/ActionDialog"
import { TagVriantType } from "components/ui/Tag/Tag.type"
import { useCallback } from "react"
import { ActionContainer } from "./ManagementListRow.styled"

interface ManagementActionCellProps {
  id: string
  status: string
  mutate: () => void
}

export const ManagementActionCell: React.FC<ManagementActionCellProps> = ({ id, status, mutate }) => {
  const { trigger: triggerUpdate } = useUpdateStatusRaport(id)
  const { trigger: triggerDelete } = useDeleteRaport(id)

  const isApproved = status === TagVriantType.APPROVED
  const isCollected = status === TagVriantType.COLLECTED

  const handleApproveEntry = useCallback(async () => {
    await triggerUpdate()
    mutate()
  }, [triggerUpdate, mutate])

  const handleRestoreEntry = useCallback(async () => {
    await triggerUpdate()
    mutate()
  }, [triggerUpdate, mutate])

  const handleDeleteEntry = useCallback(async () => {
    await triggerDelete()
    mutate()
  }, [triggerDelete, mutate])

  if (isCollected) return null

  if (isApproved)
    return (
      <ActionContainer>
        <RestoreAction onConfirm={handleRestoreEntry} />
      </ActionContainer>
    )

  return (
    <ActionContainer>
      <ApproveAction onConfirm={handleApproveEntry} />
      <TrashAction onConfirm={handleDeleteEntry} />
    </ActionContainer>
  )
}
