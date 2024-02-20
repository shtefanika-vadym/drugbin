export const usePercentageCalculator = (approved: number, pending: number, recycled: number) => {
  const total = approved + pending + recycled

  const percentageApproved = (approved / total) * 100
  const percentagePending = (pending / total) * 100
  const percentageRecycled = (recycled / total) * 100

  return {
    percentageApproved,
    percentagePending,
    percentageRecycled,
  }
}
